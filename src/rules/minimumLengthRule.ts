import { RuleOptions, ValidationRule } from "../types";

const minLengthRule: ValidationRule =
  (opts: RuleOptions<number>) => (password: string) => {
    if (password.length < opts.value)
      throw new Error(
        opts.customErrMsg
          ? opts.customErrMsg
          : `minimum password length should be ${opts.value}`
      );
  };

export default minLengthRule;
