export type * from './client/types';

import TempleComponent from './client/TempleComponent';
import TempleRegistry from './client/TempleRegistry';
import TempleElement from './client/TempleElement';
import emitter, { TempleEmitter } from './client/TempleEmitter';
import TempleException from './client/TempleException';
import data from './client/data';
import props from './client/props';
import children, { innerHTML } from './client/children';
import signal, { SignalRegistry } from './client/signal';
import './client/helpers';

export {
  data,
  props,
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