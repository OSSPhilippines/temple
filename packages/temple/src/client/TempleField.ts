import TempleComponent from './TempleComponent';

export default abstract class TempleField extends TempleComponent {
  //associates this component with a form
  public static formAssociated = true;
  //accessor to the form internals API
  protected _field: ElementInternals;

  /**
   * Returns the form internals API.
   */
  public get field() {
    return this._field;
  }

  /**
   * Attaches the form internals API to the element.
   */
  public constructor() {
    super();
    this._field = this.attachInternals();
  }

  /**
   * This is called as soon as the element is associated with a form.
   */
  public formAssociatedCallback(form: HTMLFormElement) {
    //emit the associate event
    this.emit('formassociate', this);
  }

  /**
   * This is called whenever the element or parent <fieldset> element are disabled.
   */
  public formDisabledCallback(disabled: boolean) {
    //emit the disable event
    this.emit('formdisable', this);
  }

  /**
   * This gives us the ability to control our element’s behavior when a user resets a form.
   */
  public formResetCallback() {
    //emit the disable event
    this.emit('formreset', this);
  }
}

// Just to note..
// interface ValidityStateFlags {
//   // `true` if the element is required, but has no value
//   valueMissing?: boolean;
//   // `true` if the value is not in the required syntax 
//   // (when the "type" is "email" or "URL")
//   typeMismatch?: boolean;
//   // `true` if the value does not match the specified pattern
//   patternMismatch?: boolean;
//   // `true` if the value exceeds the specified `maxlength`
//   tooLong?: boolean;
//   // `true` if the value fails to meet the specified `minlength`
//   tooShort?: boolean;
//   // `true` if the value is less than the  
//   // minimum specified by the `min` attribute
//   rangeUnderflow?: boolean;
//   // `true` if the value is greater than the 
//   // maximum specified by the `max` attribute
//   rangeOverflow?: boolean;
//   // `true` if the value does not fit the rules determined by the 
//   // `step` attribute (that is, it's not evenly divisible by the 
//   // step value)
//   stepMismatch?: boolean;
//   // `true` if the user has provided input 
//   // that the browser is unable to convert
//   badInput?: boolean;
//   // `true` if the element's custom validity message has been set to 
//   // a non-empty string by calling the element's `setCustomValidity()` 
//   // method
//   customError?: boolean;
// }