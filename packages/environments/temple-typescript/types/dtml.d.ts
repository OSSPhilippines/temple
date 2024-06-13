declare module '*.dtml' {
  class TempleDocument {
    /**
     * Returns the component styles
     */
    public styles(): string;
  
    /**
     * Returns the component template
     */
    public template(): () => (Element|false)[];
  
    /**
     * Renders the component
     */
    public render(): string;
  }
}