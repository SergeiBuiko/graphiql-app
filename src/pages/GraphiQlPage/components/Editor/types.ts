export interface IQuery {
  query: string;
  variables: { [key: string]: unknown };
  headers: { [key: string]: unknown };
}

export enum OptionTabValue {
  Variables = 'Variables',
  Headers = 'Headers',
}

export type IInvalidJsonError = { [key in OptionTabValue]?: string | null };
