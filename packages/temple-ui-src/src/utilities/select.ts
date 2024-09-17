import type { MouseEvent, KeyboardEvent } from '@ossph/temple/dist/types';

export type Option = { 
  label: any, 
  value: any, 
  keyword?: string 
};

export type Props = {
  name?: string,
  value?: unknown,
  placeholder?: string,
  //classnames
  highlight?: string,
  //allow custom value
  custom?: boolean, 
  multiple?: boolean, 
  search?: boolean,
  //events
  open?: Function,
  close?: Function,
  filter?: Function,
  select?: Function,
  remove?: Function,
  add?: Function,
  clear?: Function,
  change?: Function,
  update?: Function
};

export type State = {
  value: {
    show: boolean,
    keyword: string,
    values: any[],
    options: Option[],
    filtered: HTMLDivElement[],
    selected: HTMLDivElement[]
  }
};

export type Handlers = {
  hover: boolean,
  toggle(e: MouseEvent<HTMLElement>): void,
  select(option: HTMLElement, e: MouseEvent<HTMLElement>): void,
  filter(e: KeyboardEvent<HTMLInputElement>): void,
  clear(e: MouseEvent<HTMLElement>): void,
  add(e: MouseEvent<HTMLElement>): void,
  over(e: MouseEvent<HTMLElement>): boolean,
  out(e: MouseEvent<HTMLElement>): boolean
};
