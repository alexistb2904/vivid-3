import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

class _TextField extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _TextField extends FormAssociated {}

export class FormAssociatedTextField extends FormAssociated(_TextField) {
	proxy = document.createElement('input');
}
