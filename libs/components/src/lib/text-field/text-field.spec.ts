import {
	axe,
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	listenToFormSubmission,
} from '@vivid-nx/shared';
import { TextFieldType } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';
import { Size } from '../enums';
import { TextField } from './text-field';
import '.';

// Polyfill innerText for JSDOM
if (
	Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText') ===
	undefined
) {
	Object.defineProperty(HTMLElement.prototype, 'innerText', {
		get() {
			return this.textContent;
		},
		set(value) {
			this.textContent = value;
		},
	});
}

const COMPONENT_TAG_NAME = 'vwc-text-field';

describe('vwc-text-field', () => {
	function setToBlurred() {
		element.dispatchEvent(new Event('blur'));
	}

	function setValidityToError(errorMessage = 'error') {
		element.setValidity({ badInput: true }, errorMessage);
		element.validate();
	}

	function getLabel() {
		return element.querySelector('label[slot=_label]') as HTMLLabelElement;
	}

	function getInput() {
		return element.querySelector('input[slot=_control]') as HTMLInputElement;
	}

	let element: TextField;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG_NAME}></${COMPONENT_TAG_NAME}>`
		)) as TextField;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text-field', async () => {
			expect(element).toBeInstanceOf(TextField);
		});
	});

	describe('scale', () => {
		function hasSizeClass(baseElement: HTMLElement) {
			return Array.from(baseElement.classList).some((className) => {
				return className.includes('size-');
			});
		}

		it('should reflect the property as an attribute', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(element.getAttribute('scale')).toBe(Size.Condensed);
		});

		it('should reflect the attribute as a property', async () => {
			element.setAttribute('scale', Size.Condensed);
			await elementUpdated(element);
			expect(element.scale).toBe(Size.Condensed);
		});

		it('should init without a size class on base element', async () => {
			expect(hasSizeClass(getBaseElement(element))).toBe(false);
		});
		it('should set size class on base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('size-condensed')).toBe(
				true
			);
		});

		it('should remove size class from base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			element.scale = undefined;
			await elementUpdated(element);
			expect(hasSizeClass(getBaseElement(element))).toBe(false);
		});
	});

	describe('label', function () {
		it('should set a label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = getLabel();
			expect(labelElement).toBeTruthy();
			expect(labelElement?.textContent?.trim()).toEqual(labelText);
		});

		it('should show label only if label is set', async function () {
			const labelElement = getLabel();
			expect(labelElement).toBeNull();
		});

		it('should remove label if label is removed', async function () {
			element.label = 'label';
			await elementUpdated(element);
			element.label = '';
			await elementUpdated(element);

			const labelElement = getLabel();
			expect(labelElement).toBeNull();
		});

		it('should associate the label with the input via a unique id', async function () {
			element.label = 'label';
			await elementUpdated(element);

			const labelElement = getLabel();
			const inputElement = getInput();
			expect(inputElement.id).toBeTruthy();
			expect(labelElement.htmlFor).toBe(inputElement.id);
		});
	});

	describe('char-count', function () {
		it('should render char-count if attribute char-count and max-length are set', async function () {
			element.charCount = true;
			element.maxlength = 20;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.char-count')).toBeTruthy();
		});

		it('should remove char count if max-length is not set', async function () {
			element.charCount = true;
			element.toggleAttribute('max-length', false);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.char-count')).toBeNull();
		});

		it('should render count with 0 if value is not set', async function () {
			element.charCount = true;
			element.maxlength = 20;
			const expectedString = '0 / 20';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.char-count')?.textContent?.trim()
			).toEqual(expectedString);
		});

		it('should render count according to value and max', async function () {
			element.charCount = true;
			element.maxlength = 20;
			element.value = '12345';
			const expectedString = '5 / 20';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.char-count')?.textContent?.trim()
			).toEqual(expectedString);
		});
	});

	describe('readOnly', function () {
		it('should add class readonly to host', async function () {
			const readonlyClassWhenFalse =
				getBaseElement(element).classList.contains('readonly');
			element.readOnly = true;
			await elementUpdated(element);
			const readonlyClassWhenTrue =
				getBaseElement(element).classList.contains('readonly');
			expect(readonlyClassWhenFalse).toEqual(false);
			expect(readonlyClassWhenTrue).toEqual(true);
		});
	});

	describe('autofocus', function () {
		it('should set autofocus on the input element', async function () {
			element.autofocus = true;
			await elementUpdated(element);
			expect(getInput()?.hasAttribute('autofocus')).toEqual(true);
		});
	});

	describe('placeholder', function () {
		const placeholderText = 'Text';
		it('should set placeholder attribute on the input', async function () {
			element.placeholder = placeholderText;
			await elementUpdated(element);
			expect(getInput()?.getAttribute('placeholder')).toEqual(placeholderText);
		});

		it('should set class placeholder to root', async function () {
			element.placeholder = placeholderText;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('placeholder')).toEqual(
				true
			);
		});
	});

	describe('type', function () {
		const typeText = TextFieldType.text;
		it('should set type attribute on the input', async function () {
			element.type = typeText;
			await elementUpdated(element);
			expect(getInput()?.getAttribute('type')).toEqual(typeText);
		});
	});

	describe('list', function () {
		const dataListID = 'dataListId';

		it('should set list attribute on the input', async function () {
			element.list = dataListID;
			await elementUpdated(element);
			expect(getInput()?.getAttribute('list')).toEqual(dataListID);
		});
	});

	describe('maxlength', function () {
		const value = '8';
		const propertyName = 'maxlength';
		const proxyPropertyName = 'maxLength';

		it('should set maxlength attribute on the input', async function () {
			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(getInput()?.getAttribute(propertyName)).toEqual(value);
		});

		it('should set maxLength on proxy input', function () {
			(element as any)[propertyName] = value;
			expect((element.proxy as any)[proxyPropertyName]).toEqual(Number(value));
		});
	});

	describe('minlength', function () {
		const value = '2';
		const propertyName = 'minlength';
		const proxyPropertyName = 'minLength';

		it('should set minlength attribute on the input', async function () {
			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(getInput()?.getAttribute(propertyName)).toEqual(value);
		});

		it('should set minLength on proxy input', function () {
			(element as any)[propertyName] = value;
			expect((element.proxy as any)[proxyPropertyName]).toEqual(Number(value));
		});
	});

	describe('form association', function () {
		let fieldValue: string,
			formId: string,
			fieldName: string,
			formWrapper: HTMLElement;

		beforeEach(function () {
			fieldValue = 'field-value';
			fieldName = 'test-field';
			formId = 'test-form-id';
			formWrapper = document.createElement('div');
			document.body.appendChild(formWrapper);
		});

		afterEach(function () {
			formWrapper.remove();
		});

		it('should attach to closest form', async function () {
			const { form: formElement } = createFormHTML<TextField>({
				componentTagName: COMPONENT_TAG_NAME,
				fieldName,
				fieldValue,
				formId,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(formElement);
			formElement.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey).toEqual(fieldName);
				expect(formDataValue).toEqual(fieldValue);
			});
		});

		it('should attach to form when given form id', async function () {
			const { otherForm } = createFormHTML<TextField>({
				fieldName,
				fieldValue,
				formId,
				otherFormId: 'otherFormId',
				componentTagName: COMPONENT_TAG_NAME,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(otherForm);
			otherForm.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey).toEqual(fieldName);
				expect(formDataValue).toEqual(fieldValue);
			});
		});

		it('should reset the value of the custom element to default on form reset', async function () {
			const { form: formElement, element } = createFormHTML<TextField>({
				fieldName,
				fieldValue,
				formId,
				componentTagName: COMPONENT_TAG_NAME,
				formWrapper,
			});

			element.value = '5';
			formElement.reset();
			await elementUpdated(element);

			expect(element.value).toEqual(fieldValue);
		});
	});

	describe('events', function () {
		it('should emit an input event', async function () {
			const inputPromise = new Promise((res) =>
				element.addEventListener('input', () => res(true))
			);
			const innerInput = getInput();
			innerInput.dispatchEvent(
				new InputEvent('input', {
					bubbles: true,
					composed: true,
				})
			);
			expect(await inputPromise).toEqual(true);
		});

		it('should emit a change event', async function () {
			const inputPromise = new Promise((res) =>
				element.addEventListener('change', () => res(true))
			);
			const innerInput = getInput();
			innerInput.dispatchEvent(
				new InputEvent('change', {
					bubbles: true,
					composed: true,
				})
			);
			expect(await inputPromise).toEqual(true);
		});
	});

	describe('error message', function () {
		it('should add class error to base if not valid', async function () {
			element.dirtyValue = true;
			setToBlurred();
			setValidityToError('blah');
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('error')).toEqual(true);
		});
	});

	describe('successText', function () {
		it('should add class success to base if successText is set', async function () {
			element.successText = 'success';
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('success')).toEqual(
				true
			);
		});
	});

	describe('disabled', function () {
		it('should set disabled class when attribute is set', async function () {
			const disabledClassWhenEnabled =
				getBaseElement(element).classList.contains('disabled');
			element.disabled = true;
			await elementUpdated(element);
			const disabledClassWhenDisabled =
				getBaseElement(element).classList.contains('disabled');
			expect(disabledClassWhenEnabled).toEqual(false);
			expect(disabledClassWhenDisabled).toEqual(true);
		});
	});

	describe('value', function () {
		it("should set 'has-value' class when there is a value", async function () {
			const activeClassWhenEnabled =
				getBaseElement(element).classList.contains('has-value');
			element.value = '5';
			await elementUpdated(element);
			const activeClassWhenDisabled =
				getBaseElement(element).classList.contains('has-value');
			expect(activeClassWhenEnabled).toEqual(false);
			expect(activeClassWhenDisabled).toEqual(true);
		});
	});

	describe('appearance', function () {
		it('should set the shape class on the root', async function () {
			const appearance = 'filled';
			element.setAttribute('appearance', appearance);
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains('appearance-filled')
			).toEqual(true);
		});
	});

	describe('shape', function () {
		it('should set the shape appearance class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('shape-pill')).toEqual(
				true
			);
		});
	});

	describe('icon', function () {
		it('should render the icon with name', async function () {
			const iconExistsWithoutAttribute =
				element.shadowRoot?.querySelector('vwc-icon');
			const iconName = 'home';
			element.setAttribute('icon', iconName);
			await elementUpdated(element);
			const iconElement = element.shadowRoot?.querySelector('vwc-icon');
			expect(iconExistsWithoutAttribute).toBeFalsy();
			expect(iconElement instanceof Icon).toEqual(true);
			expect(iconElement?.getAttribute('name')).toEqual(iconName);
		});
		it('should set class has-icon when icon is set', async function () {
			element.icon = 'home';
			await elementUpdated(element);
			const baseElementHasIconClass = element.shadowRoot
				?.querySelector('.base')
				?.classList.contains('has-icon');
			expect(baseElementHasIconClass).toEqual(true);
		});
		it('should remove .no-leading class from .base if icon is set', async function () {
			element.icon = 'home';
			await elementUpdated(element);
			const baseElementHasNoLeadingClass = element.shadowRoot
				?.querySelector('.base')
				?.classList.contains('no-leading');
			expect(baseElementHasNoLeadingClass).toEqual(false);
		});
	});

	describe('autocomplete', function () {
		it('should set autocomplete on the internal input', async function () {
			const internalInput = getInput();
			const autoCompleteDefault = internalInput.getAttribute('autocomplete');

			element.autoComplete = 'off';
			await elementUpdated(element);
			expect(autoCompleteDefault).toBeNull();
			expect(internalInput.getAttribute('autocomplete')).toEqual('off');
		});
	});

	describe('errorText', function () {
		const forcedErrorMessage = 'BAD!';

		it('should force the input in custom error mode', async function () {
			element.errorText = forcedErrorMessage;
			await elementUpdated(element);
			expect(element.validationMessage).toBe(forcedErrorMessage);
			expect(element.validity.valid).toBeFalsy();
		});

		it('should add the error class', async function () {
			element.errorText = forcedErrorMessage;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('error')).toEqual(true);
		});

		it('should display the given error message', async function () {
			element.errorText = forcedErrorMessage;
			await elementUpdated(element);
			const errorElement = element.shadowRoot?.querySelector('.error-message');
			expect(errorElement).toBeDefined();
		});

		it('should replace/restore the current error state, if any, when set/removed', async function () {
			element.pattern = '123';
			element.value = 'abc';
			setToBlurred();
			await elementUpdated(element);

			const originalValidationMessage = element.validationMessage;

			element.errorText = forcedErrorMessage;
			await elementUpdated(element);
			const validationMessageWithErrorText = element.validationMessage;

			element.errorText = '';
			await elementUpdated(element);
			const validationMessageAfterErrorTextRemove = element.validationMessage;

			expect(originalValidationMessage).not.toBe('');
			expect(validationMessageWithErrorText).toBe(forcedErrorMessage);
			expect(validationMessageAfterErrorTextRemove).toBe(
				originalValidationMessage
			);
		});
	});

	describe('slot', function () {
		it('should have a slot name action-items', async function () {
			const slotElement = element.shadowRoot?.querySelector(
				'.base .fieldset slot[name="action-items"]'
			);
			expect(slotElement).toBeDefined();
		});

		it('should add .action-items class if action-items is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'action-items';
			slottedElement.id = 'action-items';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementHasActionItemsClass = element.shadowRoot
				?.querySelector('.base')
				?.classList.contains('action-items');

			expect(baseElementHasActionItemsClass).toEqual(true);
		});

		it('should have a slot name leading-action-items', async function () {
			const slotElement = element.shadowRoot?.querySelector(
				'.base .fieldset .leading-items-wrapper  slot[name="leading-action-items"]'
			);
			expect(slotElement).toBeDefined();
		});

		it('should add .leading-action-items class to .base if leading-action-items is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'leading-action-items';
			slottedElement.id = 'leading-action-items';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementHasActionItemsClass = element.shadowRoot
				?.querySelector('.base')
				?.classList.contains('leading-action-items');

			expect(baseElementHasActionItemsClass).toEqual(true);
		});

		it('should remove .no-leading class to .base if leading-action-items is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'leading-action-items';
			slottedElement.id = 'leading-action-items';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementNoLeadingClass = element.shadowRoot
				?.querySelector('.base')
				?.classList.contains('no-leading');

			expect(baseElementNoLeadingClass).toEqual(false);
		});
	});

	describe('focus event', function () {
		it('should emit a non-bubbling focus event when the input receives focus', async function () {
			const internalInput = getInput();
			const focusSpy = jest.fn();
			element.addEventListener('focus', focusSpy);
			internalInput.focus();
			expect(focusSpy).toHaveBeenCalledTimes(1);
			expect(focusSpy).toHaveBeenCalledWith(
				expect.objectContaining({ bubbles: false })
			);
		});
	});

	describe('blur event', function () {
		it('should emit a non-bubbling blur event when the input is blurred', async function () {
			const internalInput = getInput();
			const blurSpy = jest.fn();
			element.addEventListener('blur', blurSpy);
			internalInput.focus();
			internalInput.blur();
			expect(blurSpy).toHaveBeenCalledTimes(1);
			expect(blurSpy).toHaveBeenCalledWith(
				expect.objectContaining({ bubbles: false })
			);
		});
	});

	describe('focus method', function () {
		it('should focus the input', async function () {
			element.focus();
			expect(document.activeElement).toEqual(getInput());
		});

		it('should do nothing when element is unconnected', async function () {
			const unconnectedElement = document.createElement(
				COMPONENT_TAG_NAME
			) as TextField;
			expect(() => unconnectedElement.focus()).not.toThrow();
		});
	});

	describe('accessible helper text', function () {
		function getAccessibleDescription() {
			const describedBy = element
				.querySelector('input[slot="_control"]')!
				.getAttribute('aria-describedby');
			const describedByTarget = element.querySelector(
				`#${describedBy}`
			) as HTMLElement;
			return describedByTarget.innerText;
		}

		it('should use helperText value as the accessible description', () => {
			element.helperText = 'Helper text';

			expect(getAccessibleDescription()).toBe('Helper text');
		});

		it('should use slotted helper-text as the accessible description, joining text from multiple slotted elements', async () => {
			const slotted1 = document.createElement('div');
			slotted1.slot = 'helper-text';
			slotted1.innerText = 'slotted1';
			const slotted2 = document.createElement('div');
			slotted2.slot = 'helper-text';
			slotted2.innerText = 'slotted2';

			element.appendChild(slotted1);
			element.appendChild(slotted2);
			await elementUpdated(element);

			expect(getAccessibleDescription()).toBe('slotted1 slotted2');
		});

		it('should update its accessible description when slotted helper-text changes', async () => {
			const slotted = document.createElement('div');
			slotted.slot = 'helper-text';
			slotted.innerText = 'initial';
			element.appendChild(slotted);
			await elementUpdated(element);

			slotted.innerText = 'updated';
			await elementUpdated(element);

			expect(getAccessibleDescription()).toBe('updated');
		});

		it('should handle setting helper text while unconnected', () => {
			const unconnectedElement = document.createElement(
				COMPONENT_TAG_NAME
			) as TextField;

			expect(
				() => (unconnectedElement.helperText = 'Helper text')
			).not.toThrow();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.label = 'Label';
			element.value = 'Value text';
			element.helperText = 'Helper text';
			element.errorText = 'Error text';
			element.charCount = true;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
