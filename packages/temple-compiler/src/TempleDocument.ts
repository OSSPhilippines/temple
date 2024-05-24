const TEMPLATE = `<!DOCTYPE html><html><head></head><body></body></html>`;
const PROP_NAME = '__SERVER_PROPS__';
const DOCTYPE_FLAG = '!DOCTYPE';
const HEAD_FLAG = '</head>';
const BODY_FLAG = '</body>';
const SCRIPT = '<script>%s</script>';
const STYLE = '<style>%s</style>';
const CLEAN = ';Array.from(document.head.getElementsByTagName'
              + '("%s")).forEach(s => s.remove());';

export default class TempleDocument {
  //component props
  protected _properties: Record<string, any> = {};
  //styles string
  protected _styles = '';
  //scripts string
  protected _scripts = '';
  //should include in head
  protected _markup = '';

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
  public set markup(value: string) {
    this._markup = value;
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
    const isHTML = this._markup.includes('<html');
    let document = isHTML? this._markup.trim(): TEMPLATE;
    document = this._addDoctype(document);
    document = this._addStyles(document);
    document = this._addProps(document);
    document = this._addScripts(document);
    document = this._prettify(document);

    if (!isHTML) {
      document = this._addMarkup(document);
    }

    //somehow bind the props to the document...
    for (const key in this._properties) {
      document = document.replace(
        new RegExp('\\${' + key + '}', 'g'),
        this._properties[key]
      );
    }
    return document;
  }

  /**
   * Adds the doctype to the markup
   */
  private _addDoctype(markup: string) {
    if (!markup.includes(`<${DOCTYPE_FLAG}`)) {
      markup = `<!DOCTYPE html>${markup}`;
    }
    return markup;
  }

  /**
   * Adds the markup to the body
   */
  private _addMarkup(markup: string) {
    if (this._markup.length) {
      markup = markup.replace(BODY_FLAG, this._markup + BODY_FLAG);
    }
    return markup;
  }

  /**
   * Adds the properties to the <head>
   */
  private _addProps(markup: string) {
    if (Object.keys(this._properties).length) {
      const json = JSON.stringify(this._properties);
      const script = `window.${PROP_NAME} = ${json}`;
      const props = SCRIPT.replace('%s', script);
      markup = markup.replace(HEAD_FLAG, props + HEAD_FLAG);
    }
    return markup;
  }

  /**
   * Adds the scripts to the <head>
   */
  private _addScripts(markup: string) {
    if (this._scripts.length) {
      const scripts = SCRIPT.replace('%s', this._scripts);
      markup = markup.replace(HEAD_FLAG, scripts + HEAD_FLAG);
    }
    return markup;
  }

  /**
   * Adds the styles to the <head>
   */
  private _addStyles(markup: string) {
    if (this._styles.length) {
      const styles = STYLE.replace('%s', this._styles);
      markup = markup.replace(HEAD_FLAG, styles + HEAD_FLAG);
    }
    return markup;
  }

  /**
   * Removes the styles and scripts from the <head> after leaded
   */
  private _prettify(markup: string) {
    const scripts = SCRIPT.replace('%s', CLEAN.replace('%s', 'script'));
    return markup.replace(HEAD_FLAG, scripts + HEAD_FLAG);
  }
}