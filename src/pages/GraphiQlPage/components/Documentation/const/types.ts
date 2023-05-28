export interface ISchema {
  data: Data;
}

export interface Data {
  __schema: Schema;
}

export interface Schema {
  queryType: QueryType;
  types: Type[];
  directives: Direc[];
}

export interface QueryType {
  name: string;
}

export interface Type {
  kind: string;
  name: string;
  description: string;
  fields?: Field[];
  inputFields?: InputField[];
  enumValues?: EnumValue[];
}

export interface Field {
  name: string;
  description?: string;
  args: Arg[];
  type: Type3;
  isDeprecated: boolean;
}

export interface Arg {
  name: string;
  description?: string;
  type: Type2;
  defaultValue?: string;
}

export interface Type2 {
  kind: string;
  name?: string;
  ofType?: OfType;
}

export interface OfType {
  kind: string;
  name?: string;
  ofType?: OfType2;
}

export interface OfType2 {
  kind: string;
  ofType: OfType3;
}

export interface OfType3 {
  kind: string;
  name: string;
}

export interface Type3 {
  kind: string;
  name?: string;
  ofType?: OfType4;
}

export interface OfType4 {
  kind: string;
  name?: string;
  ofType?: OfType5;
}

export interface OfType5 {
  kind: string;
  name?: string;
  ofType?: OfType6;
}

export interface OfType6 {
  kind: string;
  name: string;
}

export interface InputField {
  name: string;
  description: string;
  type: Type4;
}

export interface Type4 {
  kind: string;
  name: string;
  ofType: Type4;
}

export interface EnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
}

export interface Direc {
  name: string;
  description: string;
  locations: string[];
  args: Arg2[];
}

export interface Arg2 {
  name: string;
  description: string;
  type: Type5;
  defaultValue?: string;
}

export interface Type5 {
  kind: string;
  name?: string;
  ofType?: OfType7;
}

export interface OfType7 {
  kind: string;
  name: string;
}
