import { RuleOptions, ValidationRule } from "../types";

const numberCharactersRule: ValidationRule<number> =
  (opts: RuleOptions<number>) => (password: string) => {
    if (opts.value <= 0) return;
    let numberCharactersCount = 0;
    for (const char of password) {
      if (!isNaN(Number(char))) numberCharactersCount++;
      if (numberCharactersCount === opts.value) return;
    }
    throw new Error(
      opts.customErrMsg
        ? opts.customErrMsg
        : `minimum number of digits should be ${opts.value}`
    );
  };

export default numberCharactersRule;
