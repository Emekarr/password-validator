import { RuleOptions, ValidationRule } from "../types";

const upperCaseRule: ValidationRule<number> =
  (opts: RuleOptions<number>) => (password: string) => {
    if (opts.value <= 0) return;
    let upperCaseCount = 0;
    for (const char of password) {
      if (char === char.toUpperCase()) upperCaseCount++;
      if (upperCaseCount === opts.value) return;
    }
    throw new Error(
      opts.customErrMsg
        ? opts.customErrMsg
        : `minimum number of uppercase characters should be ${opts.value}`
    );
  };

export default upperCaseRule;
