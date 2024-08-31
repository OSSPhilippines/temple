import Exception from '../Exception';
import data from './data';
import TempleElement from './TempleElement';
import TempleRegistry from './TempleRegistry';

export default abstract class TempleDocument {
  /**
   * Returns the build id for the document
   */
  public abstract id(): string; 

  /**
   * Returns component styles
   */
  public abstract styles(): string; 

  /**
   * Returns the markup tree for the document
   */
  public abstract template(): TempleElement[];

  /**
   * Renders the redered document without injections
   */
  public render(props: Record<string, any> = {}) {
    //set server props (this is so template() can read it using props())
    data.set('props', props || {});
    //set environment variables
    data.set('env', {
      ...(process.env || {}),
      BUILD_ID: this.id(),
      APP_DATA: btoa(JSON.stringify({
        ...Object.fromEntries(data.entries()),
        env: {
          ...Object.fromEntries(
            Object.entries(process.env || {}).filter(
              entry => entry[0].startsWith('PUBLIC_')
            )
          ),
          BUILD_ID: this.id()
        }
      }))
    });
    
    //get the children build w/o re-initializing the variables
    const children = this.template();
    
    //NOTE: in document there is no shadow dom
    //so there's no need to case for it...

    //this is the <html> tag
    let document = TempleElement.render(children).trim();
    //check if the root element is an <html> tag
    if (!document.toLowerCase().startsWith('<html')) {
      throw Exception.for('Document must start with an <html> tag.');
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