declare module 'eslint-plugin-vue/lib/utils' {
	export function defineTemplateBodyVisitor(
		context: unknown,
		templateVisitor: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			VElement(node: any): void;
		}
	);
}
