import type TempleDocument from './TempleDocument';
import type TempleComponent from './TempleComponent';

export type Hash = Record<string, any>;

export type TempleComponentClass = {
  component: [ string, string ],
  new (): TempleComponent
};

export type RegistryIterator<T = any> = (
  temple: TempleDocument,
  element: Element
) => T;

export type TempleEvent<T = undefined> = Event & {
  detail?: T;
};

export type Observer = {
  observed: number,
  values: { raw: any }[]
};

export type Property<T = any> = {
  raw: T,
  getter(callback: () => any): Property,
  setter(callback: (value: any) => any): Property,
  value: T
};