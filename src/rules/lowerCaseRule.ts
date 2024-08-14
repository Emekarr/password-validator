import { RuleOptions, ValidationRule } from "../types";
import { isAlphabet } from "../utils";

const lowerCaseRule: ValidationRule<number> =
  (opts: RuleOptions<number>) => (password: string) => {
    if (opts.value <= 0) return;
    let upperCaseCount = 0;
    for (const char of password) {
      if (!isAlphabet(char)) continue;
      if (char === char.toLowerCase()) upperCaseCount++;
      if (upperCaseCount === opts.value) return;
    }
    throw new Error(
      opts.customErrMsg
        ? opts.customErrMsg
        : `minimum number of lowercase characters should be ${opts.value}`
    );
  };

export default lowerCaseRule;
