export type Token = {
  name: string;
  type: string;
  content: string;
};

export type Dict = Record<string, unknown>

export type ValueFormat<T> = (text: string, token: Token) => T;
