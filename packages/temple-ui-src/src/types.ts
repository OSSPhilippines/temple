export type Stylesheet = Record<string, string[]>;

export type Value = {
  type: 'static',
  responsive: boolean,
  selector: string,
  style: string
};

export type Range = {
  type: 'range',
  responsive: boolean,
  selector: string,
  style: string,
  range: [ number, number ],
  step: number
};

export type Regex = {
  type: 'regexp',
  responsive: boolean,
  selector: string,
  style: string
};