import data from './data';
import TempleElement from './TempleElement';
import TempleRegistry from './TempleRegistry';
import TempleException from './TempleException';

export default abstract class TempleDocument {
  //client script
  protected _script: string;

  /**
   * Returns the build id for the document
   */
  public abstract id(): string; 

  /**
   * Returns the styles for the document
   */
  public abstract styles(): string; 

  /**
   * Returns the markup tree for the document
   */
  public abstract template(): TempleElement[];

  /**
   * Sets the client script
   */
  public constructor(script: string) {
    this._script = script;
  }

  /**
   * Returns the rendered document with build files
   */
  public build(path: string, props: Record<string, any> = {}) {
    let document = this.markup(props);
    const id = this.id();
    const styles = this.styles().trim();
    const inject = [
      `<script class="temple-build">${this.props()}</script>`,
      `<script class="temple-build" src="${path}/${id}.js"></script>`
    ];
    if (styles.length > 0) {
      inject.unshift(`<link rel="stylesheet" href="${path}/${id}.css" />`);
    }
    const [ before, after ] = document.split('</head>', 2);
    return `${before}${inject.join('')}</head>${after}`;
  }

  /**
   * Returns the rendered document with inline code
   */
  public render(props: Record<string, any> = {}) {
    const document = this.markup(props);
    const styles = this.styles().trim();
    const inject = [
      `<script class="temple-build">${this.props()}</script>`,
      `<script class="temple-build">${this._script}</script>`
    ];
    if (styles.length > 0) {
      inject.unshift(`<style>${styles}</style>`);
    }
    const [ before, after ] = document.split('</head>', 2);
    return `${before}${inject.join('')}</head>${after}`;
  }

  /**
   * Returns the document props
   */
  public props() {
    return `window.__APP_DATA__ = ${JSON.stringify(
      Object.fromEntries(data.entries())
    )};`
  }

  /**
   * Renders the redered document without injections
   */
  public markup(props: Record<string, any> = {}) {
    //set props (this is so template() can read it)
    data.set('props', props || {});
    //set the current component (this is so template() can read it)
    data.set('current', this);
    //get the children build w/o re-initializing the variables
    const children = this.template();
    //reset the current component before validating
    data.delete('current');
    
    //NOTE: in document there is no shadow dom
    //so there's no need to case for it...

    //this is the <html> tag
    let document = TempleElement.render(children).trim();
    //check if the root element is an <html> tag
    if (!document.toLowerCase().startsWith('<html')) {
      throw TempleException.for('Document must start with an <html> tag.');
    }
    //return the full html
    return `<!DOCTYPE html>\n${document}`;
  }

  protected _toNodeList(value: any) {
    if (typeof value === 'object' 
      && typeof value.nodeType === 'number'
    ) {
      return [ value ];
    }

    if (Array.isArray(value)) {
      if (value.every(
        item => typeof item === 'object' 
          && typeof item.nodeType === 'number'
      )) {
        return value;
      }
    }

    return [ TempleRegistry.createText(String(value)) ];
  }
}