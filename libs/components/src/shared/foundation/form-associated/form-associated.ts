/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import {
  attr,
  booleanConverter,
  DOM,
  emptyArray,
  observable,
} from "@microsoft/fast-element";
import type { Constructable, FASTElement } from "@microsoft/fast-element";
import { keyEnter } from "@microsoft/fast-web-utilities";

/**
* This file enables typing support for ElementInternals APIs.
* It is largely taken from https://github.com/microsoft/TSJS-lib-generator/pull/818/files.
*
* When TypeScript adds support for these APIs we can delete this file.
*/

interface ValidityStateFlags {
  badInput?: boolean;
  customError?: boolean;
  patternMismatch?: boolean;
  rangeOverflow?: boolean;
  rangeUnderflow?: boolean;
  stepMismatch?: boolean;
  tooLong?: boolean;
  tooShort?: boolean;
  typeMismatch?: boolean;
  valueMissing?: boolean;
}

/**
* Source:
* https://html.spec.whatwg.org/multipage/custom-elements.html#elementinternals
*/
interface ElementInternals {
  /**
   * Returns the form owner of internals target element.
   */
  readonly form: HTMLFormElement | null;
  /**
   * Returns a NodeList of all the label elements that internals target element is associated with.
   */
  readonly labels: NodeList;
  /**
   * Returns the error message that would be shown to the user if internals target element was to be checked for validity.
   */
  readonly validationMessage: string;
  /**
   * Returns the ValidityState object for internals target element.
   */
  readonly validity: ValidityState;
  /**
   * Returns true if internals target element will be validated when the form is submitted; false otherwise.
   */
  readonly willValidate: boolean;
  /**
   * Returns true if internals target element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.
   */
  checkValidity(): boolean;
  /**
   * Returns true if internals target element has no validity problems; otherwise,
   * returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user.
   */
  reportValidity(): boolean;
  /**
   * Sets both the state and submission value of internals target element to value.
   *
   * While "null" isn't enumerated as a argument type (here)[https://html.spec.whatwg.org/multipage/custom-elements.html#the-elementinternals-interface],
   * In practice it appears to remove the value from the form data on submission. Adding it as a valid type here
   * becuase that capability is required for checkbox and radio types
   */
  setFormValue(
      value: File | string | FormData | null,
      state?: File | string | FormData | null
  ): void;
  /**
   * Marks internals target element as suffering from the constraints indicated by the flags argument,
   * and sets the element's validation message to message.
   * If anchor is specified, the user agent might use
   * it to indicate problems with the constraints of internals target
   * element when the form owner is validated interactively or reportValidity() is called.
   */
  setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}

declare let ElementInternals: {
  prototype: ElementInternals;
  new (): ElementInternals;
};

const proxySlotName = "form-associated-proxy";

const ElementInternalsKey = "ElementInternals";
/**
* @alpha
*/
export const supportsElementInternals =
  ElementInternalsKey in window &&
  "setFormValue" in window[ElementInternalsKey].prototype;

const InternalsMap = new WeakMap();

/**
* Base class for providing Custom Element Form Association.
*
* @alpha
*/
export interface FormAssociated extends Omit<ElementInternals, "labels"> {
  dirtyValue: boolean;
  disabled: boolean;
  readonly elementInternals: ElementInternals | null;
  readonly formAssociated: boolean;
  initialValue: string;
  readonly labels: ReadonlyArray<Node[]>;
  name: string;
  required: boolean;
  value: string;
  currentValue: string;
  attachProxy(): void;
  detachProxy(): void;
  disabledChanged?(previous: boolean, next: boolean): void;
  formDisabledCallback?(disabled: boolean): void;
  formResetCallback(): void;
  initialValueChanged?(previous: string, next: string): void;
  nameChanged?(previous: string, next: string): void;
  requiredChanged(prev: boolean, next: boolean): void;
  stopPropagation(e: Event): void;

  /**
   * Sets the validity of the custom element. By default this uses the proxy element to determine
   * validity, but this can be extended or replaced in implementation.
   *
   * @param anchor - The anchor element to provide to ElementInternals.setValidity for surfacing the browser's constraint validation UI
   */
  validate(anchor?: HTMLElement): void;
  valueChanged(previous: string, next: string): void;
}

/**
* Base class for providing Custom Element Form Association with checkable features.
*
* @alpha
*/
export interface CheckableFormAssociated extends FormAssociated {
  currentChecked: boolean;
  dirtyChecked: boolean;
  checkedAttribute: boolean;
  defaultChecked: boolean;
  defaultCheckedChanged(oldValue: boolean | undefined, newValue: boolean): void;
  checked: boolean;
  checkedChanged(oldValue: boolean | undefined, newValue: boolean): void;
}

/**
* Avaiable types for the `proxy` property.
* @alpha
*/
export type ProxyElement = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

/**
* Identifies a class as having a proxy element and optional submethods related
* to the proxy element.
*
* @alpha
*/
export interface FormAssociatedProxy {
  proxy: ProxyElement;
  disabledChanged?(previous: boolean, next: boolean): void;
  formDisabledCallback?(disabled: boolean): void;
  formResetCallback?(): void;
  initialValueChanged?(previous: string, next: string): void;
  valueChanged?(previous: string, next: string): void;
  nameChanged?(previous: string, next: string): void;
}

/**
* Combined type to describe a Form-associated element.
*
* @alpha
*/
export type FormAssociatedElement = FormAssociated &
  FASTElement &
  HTMLElement &
  FormAssociatedProxy;

/**
* Combined type to describe a checkable Form-associated element.
*
* @alpha
*/
export type CheckableFormAssociatedElement = FormAssociatedElement &
  CheckableFormAssociated & { proxy: HTMLInputElement };

/**
* Combined type to describe a Constructable Form-Associated type.
*
* @alpha
*/
export type ConstructableFormAssociated = Constructable<HTMLElement & FASTElement>;

/**
* Base function for providing Custom Element Form Association.
*
* @alpha
*/
export function FormAssociated<T extends ConstructableFormAssociated>(BaseCtor: T): T {
  const C = class extends BaseCtor {
      /**
       * The proxy element - this element serves as the communication layer with the parent form
       * when form association is not supported by the browser.
       *
       * @alpha
       */
      // @ts-expect-error Type is incorrectly non-optional
      public proxy: ProxyElement;

      /**
       * Must evaluate to true to enable elementInternals.
       * Feature detects API support and resolve respectively
       *
       * @internal
       */
      public static get formAssociated(): boolean {
          return supportsElementInternals;
      }

      /**
       * Returns the validity state of the element
       *
       * @alpha
       */
      public get validity(): ValidityState {
          return this.elementInternals
              ? this.elementInternals.validity
              : this.proxy.validity;
      }

      /**
       * Retrieve a reference to the associated form.
       * Returns null if not associated to any form.
       *
       * @alpha
       */
      public get form(): HTMLFormElement | null {
          return this.elementInternals ? this.elementInternals.form : this.proxy.form;
      }

      /**
       * Retrieve the localized validation message,
       * or custom validation message if set.
       *
       * @alpha
       */
      public get validationMessage(): string {
          return this.elementInternals
              ? this.elementInternals.validationMessage
              : this.proxy.validationMessage;
      }

      /**
       * Whether the element will be validated when the
       * form is submitted
       */
      public get willValidate(): boolean {
          return this.elementInternals
              ? this.elementInternals.willValidate
              : this.proxy.willValidate;
      }

      /**
       * A reference to all associated label elements
       */
      public get labels(): ReadonlyArray<Node> {
          if (this.elementInternals) {
              return Object.freeze(Array.from(this.elementInternals.labels));
          } else if (
              this.proxy instanceof HTMLElement &&
              this.proxy.ownerDocument &&
              this.id
          ) {
              // Labels associated by wrapping the element: <label><custom-element></custom-element></label>
              const parentLabels = this.proxy.labels;
              // Labels associated using the `for` attribute
              const forLabels = Array.from(
                  (this.proxy.getRootNode() as
                      | HTMLDocument
                      | ShadowRoot).querySelectorAll(`[for='${this.id}']`)
              );

              const labels = parentLabels
                  ? forLabels.concat(Array.from(parentLabels))
                  : forLabels;

              return Object.freeze(labels);
          } else {
              return emptyArray;
          }
      }

      /**
       * Track whether the value has been changed from the initial value
       */
      public dirtyValue = false;

      /**
       * Stores a reference to the slot element that holds the proxy
       * element when it is appended.
       */
      // @ts-expect-error Type is incorrectly non-optional
      private proxySlot: HTMLSlotElement | void;

      /**
       * The value of the element to be associated with the form.
       */
      // @ts-expect-error Type is incorrectly non-optional
      public value: string;

      /**
       * Invoked when the `value` property changes
       * @param previous - the previous value
       * @param next - the new value
       *
       * @remarks
       * If elements extending `FormAssociated` implement a `valueChanged` method
       * They must be sure to invoke `super.valueChanged(previous, next)` to ensure
       * proper functioning of `FormAssociated`
       */
      // @ts-expect-error Type is incorrectly non-optional
      public valueChanged(previous: string, next: string) {
          this.dirtyValue = true;

          if (this.proxy instanceof HTMLElement) {
              this.proxy.value = this.value;
          }

          this.currentValue = this.value;

          this.setFormValue(this.value);
          this.validate();
      }

      /**
       * The current value of the element. This property serves as a mechanism
       * to set the `value` property through both property assignment and the
       * .setAttribute() method. This is useful for setting the field's value
       * in UI libraries that bind data through the .setAttribute() API
       * and don't support IDL attribute binding.
       */
      // @ts-expect-error Type is incorrectly non-optional
      public currentValue: string;
      public currentValueChanged() {
          this.value = this.currentValue;
      }

      /**
       * The initial value of the form. This value sets the `value` property
       * only when the `value` property has not been explicitly set.
       *
       * @remarks
       * HTML Attribute: value
       */
      public initialValue: string;

      /**
       * Invoked when the `initialValue` property changes
       *
       * @param previous - the previous value
       * @param next - the new value
       *
       * @remarks
       * If elements extending `FormAssociated` implement a `initialValueChanged` method
       * They must be sure to invoke `super.initialValueChanged(previous, next)` to ensure
       * proper functioning of `FormAssociated`
       */
      // @ts-expect-error Type is incorrectly non-optional
      public initialValueChanged(previous: string, next: string): void {
          // If the value is clean and the component is connected to the DOM
          // then set value equal to the attribute value.
          if (!this.dirtyValue) {
              this.value = this.initialValue;
              this.dirtyValue = false;
          }
      }

      /**
       * Sets the element's disabled state. A disabled element will not be included during form submission.
       *
       * @remarks
       * HTML Attribute: disabled
       */
      public disabled = false;

      /**
       * Invoked when the `disabled` property changes
       *
       * @param previous - the previous value
       * @param next - the new value
       *
       * @remarks
       * If elements extending `FormAssociated` implement a `disabledChanged` method
       * They must be sure to invoke `super.disabledChanged(previous, next)` to ensure
       * proper functioning of `FormAssociated`
       */
      // @ts-expect-error Type is incorrectly non-optional
      public disabledChanged(previous: boolean, next: boolean): void {
          if (this.proxy instanceof HTMLElement) {
              this.proxy.disabled = this.disabled;
          }

          DOM.queueUpdate(() => this.classList.toggle("disabled", this.disabled));
      }

      /**
       * The name of the element. This element's value will be surfaced during form submission under the provided name.
       *
       * @remarks
       * HTML Attribute: name
       */
      // @ts-expect-error Type is incorrectly non-optional
      public name: string;

      /**
       * Invoked when the `name` property changes
       *
       * @param previous - the previous value
       * @param next - the new value
       *
       * @remarks
       * If elements extending `FormAssociated` implement a `nameChanged` method
       * They must be sure to invoke `super.nameChanged(previous, next)` to ensure
       * proper functioning of `FormAssociated`
       */
      // @ts-expect-error Type is incorrectly non-optional
      public nameChanged(previous: string, next: string): void {
          if (this.proxy instanceof HTMLElement) {
              this.proxy.name = this.name;
          }
      }

      /**
       * Require the field to be completed prior to form submission.
       *
       * @remarks
       * HTML Attribute: required
       */
      public required: boolean;

      /**
       * Invoked when the `required` property changes
       *
       * @param previous - the previous value
       * @param next - the new value
       *
       * @remarks
       * If elements extending `FormAssociated` implement a `requiredChanged` method
       * They must be sure to invoke `super.requiredChanged(previous, next)` to ensure
       * proper functioning of `FormAssociated`
       */
      // @ts-expect-error Type is incorrectly non-optional
      public requiredChanged(prev: boolean, next: boolean): void {
          if (this.proxy instanceof HTMLElement) {
              this.proxy.required = this.required;
          }

          DOM.queueUpdate(() => this.classList.toggle("required", this.required));
          this.validate();
      }

      /**
       * The element internals object. Will only exist
       * in browsers supporting the attachInternals API
       */
      private get elementInternals(): ElementInternals | null {
          if (!supportsElementInternals) {
              return null;
          }

          let internals = InternalsMap.get(this);

          if (!internals) {
              internals = (this as any).attachInternals();
              InternalsMap.set(this, internals);
          }

          return internals;
      }

      /**
       * These are events that are still fired by the proxy
       * element based on user / programmatic interaction.
       *
       * The proxy implementation should be transparent to
       * the app author, so block these events from emitting.
       */
      protected proxyEventsToBlock = ["change", "click"];

      constructor(...args: any[]) {
          super(...args);

          this.required = false;
          // @ts-expect-error Type is incorrectly non-optional
          this.initialValue = this.initialValue || "";

          if (!this.elementInternals) {
              // When elementInternals is not supported, formResetCallback is
              // bound to an event listener, so ensure the handler's `this`
              // context is correct.
              this.formResetCallback = this.formResetCallback.bind(this);
          }
      }

      /**
       * @internal
       */
      public override connectedCallback(): void {
          super.connectedCallback();

          this.addEventListener("keypress", this._keypressHandler);

          if (!this.value) {
              this.value = this.initialValue;
              this.dirtyValue = false;
          }

          if (!this.elementInternals) {
              this.attachProxy();

              if (this.form) {
                  this.form.addEventListener("reset", this.formResetCallback);
              }
          }
      }

      /**
       * @internal
       */
      public override disconnectedCallback(): void {
          super.disconnectedCallback();

          this.proxyEventsToBlock.forEach(name =>
              this.proxy.removeEventListener(name, this.stopPropagation)
          );

          if (!this.elementInternals && this.form) {
              this.form.removeEventListener("reset", this.formResetCallback);
          }
      }

      /**
       * Return the current validity of the element.
       */
      public checkValidity(): boolean {
          return this.elementInternals
              ? this.elementInternals.checkValidity()
              : this.proxy.checkValidity();
      }

      /**
       * Return the current validity of the element.
       * If false, fires an invalid event at the element.
       */
      public reportValidity(): boolean {
          return this.elementInternals
              ? this.elementInternals.reportValidity()
              : this.proxy.reportValidity();
      }

      /**
       * Set the validity of the control. In cases when the elementInternals object is not
       * available (and the proxy element is used to report validity), this function will
       * do nothing unless a message is provided, at which point the setCustomValidity method
       * of the proxy element will be invoked with the provided message.
       * @param flags - Validity flags
       * @param message - Optional message to supply
       * @param anchor - Optional element used by UA to display an interactive validation UI
       */
      public setValidity(
          flags: ValidityStateFlags,
          message?: string,
          anchor?: HTMLElement
      ): void {
          if (this.elementInternals) {
              this.elementInternals.setValidity(flags, message, anchor);
          } else if (typeof message === "string") {
              this.proxy.setCustomValidity(message);
          }
      }

      /**
       * Invoked when a connected component's form or fieldset has its disabled
       * state changed.
       * @param disabled - the disabled value of the form / fieldset
       */
      public formDisabledCallback(disabled: boolean): void {
          this.disabled = disabled;
      }

      public formResetCallback(): void {
          this.value = this.initialValue;
          this.dirtyValue = false;
      }

      protected proxyInitialized = false;

      /**
       * Attach the proxy element to the DOM
       */
      public attachProxy(): void {
          if (!this.proxyInitialized) {
              this.proxyInitialized = true;
              this.proxy.style.display = "none";
              this.proxyEventsToBlock.forEach(name =>
                  this.proxy.addEventListener(name, this.stopPropagation)
              );

              // These are typically mapped to the proxy during
              // property change callbacks, but during initialization
              // on the initial call of the callback, the proxy is
              // still undefined. We should find a better way to address this.
              this.proxy.disabled = this.disabled;
              this.proxy.required = this.required;
              if (typeof this.name === "string") {
                  this.proxy.name = this.name;
              }

              if (typeof this.value === "string") {
                  this.proxy.value = this.value;
              }

              this.proxy.setAttribute("slot", proxySlotName);

              this.proxySlot = document.createElement("slot");
              this.proxySlot.setAttribute("name", proxySlotName);
          }

          this.shadowRoot?.appendChild(this.proxySlot as HTMLSlotElement);
          this.appendChild(this.proxy);
      }

      /**
       * Detach the proxy element from the DOM
       */
      public detachProxy(): void {
          this.removeChild(this.proxy);
          this.shadowRoot?.removeChild(this.proxySlot as HTMLSlotElement);
      }

      /** {@inheritDoc (FormAssociated:interface).validate} */
      public validate(anchor?: HTMLElement): void {
          if (this.proxy instanceof HTMLElement) {
              this.setValidity(
                  this.proxy.validity,
                  this.proxy.validationMessage,
                  anchor
              );
          }
      }

      /**
       * Associates the provided value (and optional state) with the parent form.
       * @param value - The value to set
       * @param state - The state object provided to during session restores and when autofilling.
       */
      public setFormValue(
          value: File | string | FormData | null,
          state?: File | string | FormData | null
      ): void {
          if (this.elementInternals) {
              this.elementInternals.setFormValue(value, state || value);
          }
      }

      private _keypressHandler(e: KeyboardEvent): void {
          switch (e.key) {
              case keyEnter:
                  if (this.form instanceof HTMLFormElement) {
                      // Implicit submission
                      const defaultButton = this.form.querySelector(
                          "[type=submit]"
                      ) as HTMLElement | null;
                      defaultButton?.click();
                  }
                  break;
          }
      }

      /**
       * Used to stop propagation of proxy element events
       * @param e - Event object
       */
      public stopPropagation(e: Event): void {
          e.stopPropagation();
      }
  };

  attr({ mode: "boolean" })(C.prototype, "disabled");
  attr({ mode: "fromView", attribute: "value" })(C.prototype, "initialValue");
  attr({ attribute: "current-value" })(C.prototype, "currentValue");
  attr(C.prototype, "name");
  attr({ mode: "boolean" })(C.prototype, "required");
  observable(C.prototype, "value");

  return C;
}

/**
* @alpha
*/
export function CheckableFormAssociated<T extends ConstructableFormAssociated>(
  BaseCtor: T
): T {
  interface C extends FormAssociatedElement {}
  class C extends FormAssociated(BaseCtor) {}
  class D extends C {
      /**
       * Tracks whether the "checked" property has been changed.
       * This is necessary to provide consistent behavior with
       * normal input checkboxes
       */
      protected dirtyChecked = false;

      /**
       * Provides the default checkedness of the input element
       * Passed down to proxy
       *
       * @public
       * @remarks
       * HTML Attribute: checked
       */
      public checkedAttribute = false;
      // @ts-expect-error Type is incorrectly non-optional
      private checkedAttributeChanged(): void {
          this.defaultChecked = this.checkedAttribute;
      }

      // @ts-expect-error Type is incorrectly non-optional
      public defaultChecked: boolean;

      /**
       * @internal
       */
      public defaultCheckedChanged(): void {
          if (!this.dirtyChecked) {
              // Setting this.checked will cause us to enter a dirty state,
              // but if we are clean when defaultChecked is changed, we want to stay
              // in a clean state, so reset this.dirtyChecked
              this.checked = this.defaultChecked;
              this.dirtyChecked = false;
          }
      }

      /**
       * The checked state of the control.
       *
       * @public
       */
      public checked = false;
      // @ts-expect-error Type is incorrectly non-optional
      public checkedChanged(prev: boolean | undefined, next: boolean): void {
          if (!this.dirtyChecked) {
              this.dirtyChecked = true;
          }

          this.currentChecked = this.checked;
          this.updateForm();

          if (this.proxy instanceof HTMLInputElement) {
              this.proxy.checked = this.checked;
          }

          if (prev !== undefined) {
              this.$emit("change");
          }

          this.validate();
      }

      /**
       * The current checkedness of the element. This property serves as a mechanism
       * to set the `checked` property through both property assignment and the
       * .setAttribute() method. This is useful for setting the field's checkedness
       * in UI libraries that bind data through the .setAttribute() API
       * and don't support IDL attribute binding.
       */
      // @ts-expect-error Type is incorrectly non-optional
      public currentChecked: boolean;
      // @ts-expect-error Type is incorrectly non-optional
      public currentCheckedChanged(prev: boolean | undefined, next: boolean) {
          this.checked = this.currentChecked;
      }

      constructor(...args: any[]) {
          super(args);

          // Re-initialize dirtyChecked because initialization of other values
          // causes it to become true
          this.dirtyChecked = false;
      }

      private updateForm(): void {
          const value = this.checked ? this.value : null;
          this.setFormValue(value, value);
      }

      public override connectedCallback() {
          super.connectedCallback();
          this.updateForm();
      }

      public override formResetCallback() {
          super.formResetCallback();
          this.checked = !!this.checkedAttribute;
          this.dirtyChecked = false;
      }
  }

  attr({ attribute: "checked", mode: "boolean" })(D.prototype, "checkedAttribute");
  attr({ attribute: "current-checked", converter: booleanConverter })(
      D.prototype,
      "currentChecked"
  );
  observable(D.prototype, "defaultChecked");
  observable(D.prototype, "checked");

  return D;
}