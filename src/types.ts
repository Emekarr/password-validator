export type ValidationRule = (
  opts: RuleOptions<any>
) => ValidationFunctionSignature;

export type ValidationFunctionSignature = (password: string) => void;

export interface RuleOptions<T> {
  customErrMsg?: string;
  value: T;
}
