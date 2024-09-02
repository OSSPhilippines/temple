export default class TempleText {
  //value of the text node
  protected _value: string;
  //whether to escape value
  protected _escape: boolean;
  
  /**
   * Returns the value of the text node
   */
  public get value() {
    return this._escape 
      ? this._value 
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      : this._value;
  }

  /**
   * Creates a new TempleText instance
   */
  public constructor(value: string, escape = false) {
    this._escape = escape;
    this._value = value;
  }

  /**
   * Renders the text node to string
   */
  public toString() {
    return this.value;
  }
}