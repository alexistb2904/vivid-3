import {
	CheckableFormAssociated,
	FoundationElement,
} from '@microsoft/fast-foundation';

class _Radio extends FoundationElement {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Radio extends CheckableFormAssociated {}

export class FormAssociatedRadio extends CheckableFormAssociated(_Radio) {
	proxy = document.createElement('input');
}
