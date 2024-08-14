export type ValidationRule<T> = (
  opts: RuleOptions<T>
) => ValidationFunctionSignature;

export type ValidationFunctionSignature = (password: string) => void;

export interface RuleOptions<T> {
  customErrMsg?: string;
  value: T;
}
