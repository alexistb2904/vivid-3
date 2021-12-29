import '../icon/icon';
import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Badge } from './badge.base';
import { Icon } from '../icon/icon.base';

const getClasses = ({
	connotation, layout, shape, size, iconTrailing,
}: Badge) => classNames(
	'control',
	['icon-trailing', iconTrailing],
	[`connotation-${connotation}`, Boolean(connotation)],
	[`layout-${layout}`, Boolean(layout)],
	[`shape-${shape}`, Boolean(shape)],
	[`size-${size}`, Boolean(size)],
);

const iconTemplate = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`<span class="affix"><${iconTag} :type="${(x) => x.icon}"></${iconTag}></span>`;
};
/**
 * The template for the {@link @microsoft/fast-foundation#Badge} component.
 * @public
 */
export const badgeTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Badge> = (context: ElementDefinitionContext) => html`
        <span class="${getClasses}">
			${(x) => (x.icon ? iconTemplate(context) : '')}
			${(x) => x.text}
		</span>`;
