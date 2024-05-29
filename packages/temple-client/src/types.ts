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