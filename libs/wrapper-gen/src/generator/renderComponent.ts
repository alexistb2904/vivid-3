import { ComponentDef } from './ComponentDef';
import { kebabToCamel, kebabToPascal } from './utils/casing';
import {
	isBooleanLiteral,
	isNumberLiteral,
	isStringLiteral,
	TypeUnion,
	withImportsResolved,
} from './types';
import { getImportPath } from './vividPackage';

type Import = {
	name: string;
	fromModule: string;
};

const renderImports = (imports: Import[], typeImport = false) => {
	const importsFromModule = new Map<string, string[]>();
	for (const { name, fromModule } of imports) {
		if (!importsFromModule.has(fromModule)) {
			importsFromModule.set(fromModule, []);
		}
		importsFromModule.get(fromModule)!.push(name);
	}
	return Array.from(importsFromModule.entries())
		.map(
			([fromModule, names]) =>
				`import ${typeImport ? 'type ' : ''}{ ${names.join(
					', '
				)} } from '${fromModule}';`
		)
		.join('\n');
};

const renderJsDoc = (description?: string, type?: TypeUnion) => {
	if (!description && !type) return '';

	const renderedDescription = description
		? `\n${description
				.split('\n')
				.map((line) => ` * ${line}`)
				.join('\n')}`
		: '';

	const renderedType = type
		? `\n * @type {${type.map((t) => t.text).join(' | ')}}`
		: '';

	return `/**${renderedDescription}${renderedType}
 */`;
};

export const renderComponent = (
	componentDef: ComponentDef,
	isVue3Stub = false
) => {
	const vueModule = isVue3Stub ? 'vue3' : 'vue';

	const imports: Import[] = [
		{ name: 'defineComponent', fromModule: vueModule },
		{ name: 'ref', fromModule: vueModule },
		{ name: 'h', fromModule: vueModule },
		{ name: 'isVue2', fromModule: '../../utils/vue' },
		{ name: 'VNodeData', fromModule: vueModule },
		{ name: componentDef.registerFunctionName, fromModule: '@vonage/vivid' },
		{ name: 'registerComponent', fromModule: '../../utils/register' },
	];

	// Filter out attributes that are overshadowed by v-model name
	// E.g. start model mapping to current-start attribute will overshadow start attribute (initial value)
	const attributes = componentDef.attributes.filter(
		({ name }) =>
			!componentDef.vueModels.some(
				(model) => model.name === name && model.attributeName !== name
			)
	);

	const declaredEvents = [...componentDef.events];

	// Find v-models and their corresponding attribute and event
	const vueModels = componentDef.vueModels.map((model) => {
		const attribute = componentDef.attributes.find(
			(attr) => attr.name === model.attributeName
		);
		const event = componentDef.events.find((e) => e.name === model.eventName);
		if (!attribute) throw new Error('v-model attribute not found');
		if (!event) throw new Error('v-model event not found');

		return {
			...model,
			attribute,
			event,
		};
	});

	for (const vueModel of vueModels) {
		declaredEvents.push({
			name: `update:${vueModel.name}`,
			description: vueModel.event.description,
			type: vueModel.attribute.type,
		});
	}

	if (attributes.length > 0) {
		imports.push({ name: 'PropType', fromModule: vueModule });
	}

	const typeImports: Import[] = [
		{
			name: componentDef.className,
			fromModule: getImportPath(componentDef.vividModulePath),
		},
	];

	// Import referenced types
	const referencedTypes = [
		...attributes.map((prop) => prop.type),
		...componentDef.events.map((event) => event.type),
		...componentDef.methods.flatMap((method) =>
			method.args.map((arg) => arg.type)
		),
	].flat();
	for (const type of referencedTypes) {
		if (type.importFromModule) {
			imports.push({ name: type.text, fromModule: type.importFromModule });
		}
	}

	if (isVue3Stub) {
		typeImports.push({ name: 'SlotsType', fromModule: vueModule });
	}

	/**
	 * All props should be forwarded.
	 * Vue requires us to filter out undefined properties
	 * before passing them into the h function
	 */
	const renderProps = (
		attributes: ComponentDef['attributes'],
		asV2DomProps: boolean
	) =>
		attributes
			.map(({ name, forceDomProp }) => {
				const vueModel = componentDef.vueModels.find(
					(model) => model.attributeName === name
				);

				let valueToUse = `this.${kebabToCamel(name)}`;
				if (vueModel && vueModel.name !== kebabToCamel(name)) {
					// If there is a v-model, we will prefer the v-model value
					valueToUse = `this.${vueModel.name} ?? ${valueToUse}`;
				}

				const passedAsDomProp = asV2DomProps || forceDomProp;
				const nameToUse = passedAsDomProp ? `${kebabToCamel(name)}` : `${name}`;
				const prefix = forceDomProp && !asV2DomProps ? '.' : '';

				return `...(${valueToUse} !== undefined ? {'${prefix}${nameToUse}': ${valueToUse} } : {})`;
			})
			.join(',');
	const propsV3Src = renderProps(attributes, false);

	/**
	 * DOM attributes can only be strings, therefore complex data (e.g. HTMLElement) needs to be passed as props.
	 * While Vue 3 handles this for us, in Vue 2 we need to figure out which attributes should be passed as props.
	 */
	const shouldBePassedAsAttribute = (
		attribute: ComponentDef['attributes'][number]
	) =>
		!attribute.forceDomProp &&
		withImportsResolved(attribute.type).every(
			(t) =>
				t.text === 'string' ||
				t.text === 'number' ||
				t.text === 'boolean' ||
				isStringLiteral(t.text) ||
				isNumberLiteral(t.text) ||
				isBooleanLiteral(t.text) ||
				// If unknown, default to attribute
				t.text === 'any' ||
				t.text === 'unknown'
		);
	const propsV2Src = renderProps(
		attributes.filter(shouldBePassedAsAttribute),
		false
	);
	const domPropsV2Src = renderProps(
		attributes.filter((prop) => !shouldBePassedAsAttribute(prop)),
		true
	);

	/**
	 * All events should be forwarded
	 */
	const eventsSrc = componentDef.events
		.map(({ name }) => {
			const vueModel = vueModels.find((model) => model.eventName === name);
			return vueModel
				? `'${name}': (event: Event) => {
          this.$emit('update:${vueModel.name}', ${vueModel.valueMapping});
          this.$emit('${name}', event);
        }`
				: `'${name}': (event: Event) => this.$emit('${name}', event)`;
		})
		.join(',');

	const eventsV3Src = componentDef.events
		.map(({ name }) => {
			const vueModel = vueModels.find((model) => model.eventName === name);
			return vueModel
				? `'on${kebabToPascal(name)}': (event: Event) => {
          this.$emit('update:${vueModel.name}', ${vueModel.valueMapping});
          this.$emit('${name}', event);
        }`
				: `'on${kebabToPascal(
						name
				  )}': (event: Event) => this.$emit('${name}', event)`;
		})
		.join(',');

	const namedSlotsSource = componentDef.slots
		.filter((slot) => slot.name !== 'default')
		.map(
			(slot) => `// @slot ${slot.name} ${slot.description ?? ''}
      handleNamedSlot('${slot.name}', this.$slots['${slot.name}'])`
		)
		.join(',');

	const slotsSrc = isVue3Stub
		? `slots: Object as SlotsType<${
				componentDef.slots.length
					? `{
		${componentDef.slots
			.map(
				(slot) => `
		${renderJsDoc(slot.description)}
		"${slot.name}": Record<string, never>`
			)
			.join('\n')}
	}`
					: 'Record<string, never>'
		  }>,`
		: '';

	if (namedSlotsSource)
		imports.push({ name: 'handleNamedSlot', fromModule: '../../utils/slots' });

	const renderAttributeType = (type: TypeUnion): string => {
		const values = Array.from(new Set(type.map((t) => t.vuePropType)).values());
		return values.length > 1 ? `[${values.join(', ')}]` : (values[0] as string);
	};

	/**
	 * Declare props.
	 * Note: All props are optional. Setting default to undefined, otherwise Vue 3 will default boolean props to false.
	 * myProp: {type: [String, Number] as PropType<string | number>, default: undefined},
	 */
	const propDefinitionsSrc = attributes
		.flatMap((attr) => {
			const vueModel = componentDef.vueModels.find(
				(model) => model.attributeName === attr.name
			);

			return [
				attr,
				...(vueModel && vueModel.name !== kebabToCamel(attr.name)
					? [
							{
								...attr,
								name: vueModel.name,
							},
					  ]
					: []),
			];
		})
		.map(({ name, description, type }) => {
			const propName = kebabToCamel(name);
			return `${renderJsDoc(description)}
        ${propName}: {type: ${renderAttributeType(type)} as PropType<${type
				.map((t) => t.text)
				.join(' | ')}>, default: undefined}`;
		})
		.join(',\n');

	// Declare events
	const eventDefinitionsSrc = isVue3Stub
		? `{
			${declaredEvents
				.map(
					({ name, description, type }) => `
						${renderJsDoc(description, type)}
						['${name}'](event: ${type.map((t) => t.text).join(' | ')}) { return true }`
				)
				.join(',\n')}}`
		: `[
			${declaredEvents
				.map(
					({ name, description, type }) => `
						${renderJsDoc(description, type)}
							'${name}'`
				)
				.join(',\n')}]`;

	// For vue2, we rename v-model prop and event to the vue3 default names
	const vue2VModelSrc = vueModels.some((model) => model.name === 'modelValue')
		? `
  model: isVue2 ? {
    prop: 'modelValue',
    event: 'update:modelValue'
  } : undefined,`
		: '';

	// No need to render body for vue3 stubs, would run into type errors otherwise
	const renderMethodBody = isVue3Stub
		? 'return null;'
		: `
    if (isVue2) {
        return h(this.componentName, {
            ref: 'element',
            attrs: { ${propsV2Src} },
            class: 'vvd-component',
            ${domPropsV2Src ? `domProps: { ${domPropsV2Src} },` : ''}
            on: { ${eventsSrc} },
        }, [
            this.$slots.default,
            ${namedSlotsSource}
        ]);
      }
      // @ts-ignore
      return h(this.componentName, {
          ref: 'element',
          class: 'vvd-component',
          ${[propsV3Src, eventsV3Src].filter(Boolean).join(',')}
      } as unknown as VNodeData, [
          // @ts-ignore
          this.$slots.default && this.$slots.default(),
          ${namedSlotsSource}
      ]);
    `;

	/**
	 * Forward methods like this:
	 * focus: (arg: string): void => {
	 *   this.element?.focus(arg);
	 * },
	 */
	const methodDefinitionsSrc = componentDef.methods
		.map(
			(method) =>
				`
        ${renderJsDoc(method.description)}
        ${method.name}(${method.args
					.map((a) => `${a.name}: ${a.type.map((t) => t.text).join(' | ')}`)
					.join(', ')}): ${method.returnType
					.map((t) => t.text)
					.join(' | ')} { return (this.element as any)?.${
					method.name
				}(${method.args.map((a) => a.name).join(', ')}); }`
		)
		.join(',\n');

	return `
${renderImports(imports)}
${renderImports(typeImports, true)}


${renderJsDoc(componentDef.description)}
export default defineComponent({
  name: '${componentDef.wrappedClassName}',
  ${vue2VModelSrc}
  props: {
    ${propDefinitionsSrc}
  },
  emits: ${eventDefinitionsSrc},
  methods: {
  	${methodDefinitionsSrc}
	},
	${slotsSrc}
  setup(props, ctx) {
    const componentName = registerComponent('${componentDef.name}', ${
		componentDef.registerFunctionName
	});

    const element = ref<${componentDef.className} | null>(null);

    return { componentName, element };
  },
  render() {
    ${renderMethodBody}
  },
});
`;
};
