import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _FoundationButton extends FoundationElement {}
/* eslint-disable-next-line @typescript-eslint/naming-convention */
interface _FoundationButton extends FormAssociated {}

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Button:class)} component.
 *
 * @internal
 */
export class FormAssociatedButton extends FormAssociated(_FoundationButton) {
	proxy = document.createElement('input');
}
