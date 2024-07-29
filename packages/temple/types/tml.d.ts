type Hash = Record<string, any>;

declare module '*.tml' {
  class TempleElement {
    /**
     * Returns the attributes of the element
     */
    public get attributes(): Hash;
  
    /**
     * Returns the element
     */
    public get element(): Element;
  
    /**
     * Returns true if the attribute exists
     */
    public hasAttribute(key: string): boolean;
  
    /**
     * Returns the attribute value
     */
    public getAttribute<T = any>(key: string): T
  
    /**
     * Removes the attribute
     */
    public removeAttribute(key: string, silent: boolean): this;
  
    /**
     * Sets the attribute value
     */
    public setAttribute(key: string, value: any, silent: boolean): this;
  
    /**
     * Sets the attributes
     */
    public setAttributes(attributes: Hash, silent: boolean): this;
  }

  class TempleComponent extends HTMLElement {
    //name of the component [ tag-name, className ]
    public static component: [string, string];
    
    /**
     * Self registers the component
     */
    public static register(): void;

    /**
     * Returns the component styles
     */
    public styles(): string;
  
    /**
     * Returns the component template
     */
    public template(): () => (Element|false)[];
  
    /**
     * Returns the component's metadata
     */
    public get metadata(): { tagname: string, classname: string };
  
    /**
     * Returns the original component's children
     * before the component was initiated
     */
    public get originalChildren(): Node[];
  
    /**
     * Returns the component's element registry
     */
    public get element(): TempleElement;
  
    /**
     * Returns the component properties
     */
    public get props(): Hash;
  
    /**
     * Returns whether the component has initiated
     */
    public get initiated(): boolean;
  
    /**
     * Sets the component properties
     */
    public set props(props: Hash);
  
    /**
     * Returns the parent component (if any)
     */
    public getParentComponent(): TempleComponent|null;
  
    /**
     * Psuedo constructor
     */
    public init(attributes: Hash): void;
  
    /**
     * Renders the component
     */
    public render(): string;
  
    /**
     * Waits for the document to be first ready
     */
    public wait(): void;
  }

  export { TempleComponent as default };
}