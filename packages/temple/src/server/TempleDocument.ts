const template = `<!DOCTYPE html><html><head>{__HEAD__}</head><body>{__BODY__}</body></html>`;

export default class TempleDocument {
  //component props
  protected _properties: Record<string, any> = {};
  //styles string
  protected _styles = '';
  //scripts string
  protected _scripts = '';
  //head template string w/o <head />
  protected _head = '';
  //body template string w/o<body />
  protected _body = '';

  /**
   * Returns the component properties
   */
  public get props() {
    return this._properties;
  }

  /**
   * Sets the styles
   */
  public set styles(value: string) {
    this._styles = value;
  }

  /**
   * Sets the script bundle
   */
  public set scripts(value: string) {
    this._scripts = value;
  }

  /**
   * Sets the head template
   */
  public set head(value: string) {
    this._head = value;
  }

  /**
   * Sets the body template
   */
  public set body(value: string) {
    this._body = value;
  }

  /**
   * Sets the component properties
   */
  public set props(value: Record<string, any>) {
    this._properties = value;
  }

  /**
   * Renders the component
   */
  public render() {
    const head = [ this._head ];
    if (this._styles) {
      head.push(`<style>${this._styles}</style>`);
    }
    if (Object.keys(this._properties).length) {
      head.push(`<script>window.__SERVER_PROPS__ = ${
        JSON.stringify(this._properties)
      }</script>`);
    } 
    if (this._scripts) {
      head.push(`<script>${this._scripts}</script>`);
    }

    let document = template
      .replace('{__HEAD__}', head.join('\n'))
      .replace('{__BODY__}', this._body);
    //somehow bind the props to the document...
    for (const key in this._properties) {
      document = document.replace(
        new RegExp('\\${' + key + '}', 'g'),
        this._properties[key]
      );
    }
    return document;
  }
}