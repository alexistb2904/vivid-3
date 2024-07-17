import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import {
	Button,
	type ElementDefinitionContext,
	type FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { Alert } from './alert';

const getClasses = ({ connotation }: Alert) =>
	classNames('base', [`connotation-${connotation}`, Boolean(connotation)]);

const getControlClasses = ({ open, placement, strategy }: Alert) =>
	classNames(
		'control',
		['open', open],
		[`placement-${placement}`, Boolean(placement)],
		[`strategy-${strategy}`, Boolean(strategy)]
	);

function renderIcon(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`${(x) => affixIconTemplate(x.conditionedIcon, IconWrapper.Slot)}`;
}

function renderDismissButton(buttonTag: string) {
	return html`
		<${buttonTag}
			aria-label="${(x) =>
				x.dismissButtonAriaLabel || x.locale.alert.dismissButtonLabel}"
			size="condensed"
			class="dismiss-button"
			icon="close-line"
			@click="${(x) => (x.open = false)}">
		</${buttonTag}>`;
}

/**
 * The template for the Alert component.
 *
 * @param context - element definition context
 * @public
 */
export const AlertTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Alert> = (context: ElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const buttonTag = context.tagFor(Button);

	return html<Alert>`
	<${elevationTag} class="elevation" dp='8' exportparts="vvd-theme-alternate">
		<div
			class="${getControlClasses}"
			role="${(x) => (x.removable ? 'alertdialog' : 'alert')}"
			aria-live="assertive"
		>
			<div part="vvd-theme-alternate" class="${getClasses}">
				${renderIcon(context)}
				<div class="alert-text">
					${when(
						(x) => x.headline,
						html`<header class="headline">${(x) => x.headline}</header>`
					)}
					${when((x) => x.text, html`<div class="main-text">${(x) => x.text}</div>`)}
					<slot name="main"></slot>
				</div>
				<slot class="action-items" name="action-items"></slot>
				${when((x) => x.removable, renderDismissButton(buttonTag))}
			</div>
		</div>
	</${elevationTag}>
	`;
};
