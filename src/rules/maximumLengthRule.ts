import { RuleOptions, ValidationRule } from "../types";

const maxLengthRule: ValidationRule =
  (opts: RuleOptions<number>) => (password: string) => {
    if (opts.value <= 0)
      throw new Error("maximum length cannot be equal to or less than 0");
    if (password.length > opts.value)
      throw new Error(
        opts.customErrMsg
          ? opts.customErrMsg
          : `maximum password length should be ${opts.value}`
      );
  };

export default maxLengthRule;
