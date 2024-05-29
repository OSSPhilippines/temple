import type TempleComponent from './TempleComponent';
import Exception from './TempleException';
import data from './data';

//types
export type Observer = {
  observed: number,
  values: { raw: any }[]
};

/**
 * Signal registry
 */
export class SignalRegistry {
  //map of components and their observer
  protected static observers: Map<TempleComponent, Observer> = new Map();

  /**
   * Observe a value
   */
  public static observe(component: TempleComponent, value: any) {
    //make a new payload
    const property = { raw: value };
    //define the access to the value
    Object.defineProperty(property, 'value', {
      get() {
        return property.raw;
      },
      set(value) {
        const rerender = SignalRegistry.serialize(value) 
          !== SignalRegistry.serialize(property.raw);
        property.raw = value;
        if (rerender) {
          component.render();
        }
        
      }
    });
    //get the component's values
    const observer = this.observers.get(component);
    //if no observer
    if (!observer) {
      //means there's no observer
      //so set a new observer
      this.observers.set(component, { 
        observed: 1, 
        values: [ property ] 
      });
    } else {
      observer.observed++;
      observer.values.push(property);
    }

    return property;
  }

  /**
   * Get the observer for a component
   */
  public static observer(component: TempleComponent) {
    return this.observers.get(component) || null;
  }

  /**
   * Serialize a value
   */
  protected static serialize(value: any) {
    return JSON.stringify(value);
  
  }
}

/**
 * Simple state management for Temple components
 * ie. const message = signal<string>('Hello World');
 *     message.value = 'New World'; //will cause re-render
 *     console.log(message.value); //New World
 */
export default function signal<T = any>(
  value: T,
  component: TempleComponent|null = null
) {
  if (!component) {
    //try getting the current component from global
    component = data.current || null;
  }
  //if still no current component
  if (!component) {
    throw Exception.for(
      'Signals can only be created within a Temple component'
    );
  }
  //if component is not initiated
  if (!component.initiated) {
    //then add value to observer
    return SignalRegistry.observe(component, value);
  }
  //The reason why signal() maybe called after the component
  //has initiated is because the signal() call was part of
  //the render() method. In this case, we need to get the
  //observer and return the value based on how many times
  //it was observed...
  const observer = SignalRegistry.observer(component);
  //it shouldn't be possible to not have an observer
  //for a component that has initiated, but we should
  //still case for it...
  if (!observer) {
    throw Exception.for('State mismatch');
  }
  //get the property...
  //we are relying on JS single threaded nature to figure out 
  //what value to return based on how many times it was observed...
  return observer.values[
    observer.observed++ % observer.values.length
  ];
}