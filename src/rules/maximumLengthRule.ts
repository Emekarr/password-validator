import { RuleOptions, ValidationRule } from "../types";

const maxLengthRule: ValidationRule =
  (opts: RuleOptions<number>) => (password: string) => {
    if (password.length > opts.value)
      throw new Error(
        opts.customErrMsg
          ? opts.customErrMsg
          : `maximum password length should be ${opts.value}`
      );
  };

export default maxLengthRule;
