import type TempleText from './TempleText';
import type TempleElement from './TempleElement';

export type Node = TempleElement|TempleText;
export type Hash = Record<string, any>;