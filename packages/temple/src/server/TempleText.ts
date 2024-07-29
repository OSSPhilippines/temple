export default class TempleText {
  //value of the text node
  protected _value: string;
  
  /**
   * Returns the value of the text node
   */
  public get value() {
    return this._value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Creates a new TempleText instance
   */
  public constructor(value: string) {
    this._value = value;
  }

  /**
   * Renders the text node to string
   */
  public toString() {
    return this.value;
  }
}