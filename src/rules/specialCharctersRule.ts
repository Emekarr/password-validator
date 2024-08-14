import { RuleOptions, ValidationRule } from "../types";

const allowedSpecialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const specialCharactersRule: ValidationRule<number> =
  (opts: RuleOptions<number>) => (password: string) => {
    if (opts.value <= 0) return;
    let specialCharactersCount = 0;
    for (const char of password) {
      if (allowedSpecialCharacters.includes(char)) specialCharactersCount++;
      if (specialCharactersCount === opts.value) return;
    }
    throw new Error(
      opts.customErrMsg
        ? opts.customErrMsg
        : `minimum number of special characters should be ${opts.value}`
    );
  };

export default specialCharactersRule;
