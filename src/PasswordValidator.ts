import { ValidationFunctionSignature } from "./types";

export default class PasswordValidator {
  private rules: ValidationFunctionSignature[] = [];

  constructor(private password: string) {
    if (!password || !password.length) {
      throw new Error(
        "the password to be validated must be provided and cannot contain an empty value"
      );
    }
  }

  setRules(...rules: ValidationFunctionSignature[]) {
    this.rules = rules;
    return this;
  }

  validate() {
    this.rules.forEach((rule) => rule(this.password));
  }
}
