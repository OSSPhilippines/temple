export type {
  TempleComponentClass,
  RegistryIterator,
  TempleBrowserEvent,
  SignalObserver,
  SignalProps
} from './types';

import TempleException from './Exception';
import TempleComponent from './client/TempleComponent';
import TempleRegistry from './client/TempleRegistry';
import TempleElement from './client/TempleElement';
import emitter, { TempleEmitter } from './client/TempleEmitter';
import data from './client/data';
import props from './client/props';
import classnames from './client/classnames';
import children, { innerHTML } from './client/children';
import signal, { SignalRegistry } from './client/signal';
import './client/helpers';

export {
  data,
  props,
  classnames,
  children,
  innerHTML,
  signal, 
  emitter,
  TempleComponent,
  TempleRegistry,
  TempleElement,
  TempleEmitter,
  TempleException,
  SignalRegistry
};