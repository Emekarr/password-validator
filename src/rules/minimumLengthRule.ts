import { RuleOptions, ValidationRule } from "../types";

const minLengthRule: ValidationRule =
  (opts: RuleOptions<number>) => (password: string) => {
    if (opts.value <= 0)
      throw new Error("minimum length cannot be equal to or less than 0");
    if (password.length < opts.value)
      throw new Error(
        opts.customErrMsg
          ? opts.customErrMsg
          : `minimum password length should be ${opts.value}`
      );
  };

export default minLengthRule;
