import {
  RuleOptions,
  ValidationFunctionSignature,
  ValidationRule,
} from "../src/types";

describe("PasswordValidator Types", () => {
  describe("ValidationRule", () => {
    it("should create a valid rule function", () => {
      const demoRule: ValidationRule<number> = (opts: RuleOptions<number>) => {
        return (password: string) => {
          if (password.length < opts.value) {
            throw new Error(
              opts.customErrMsg
                ? opts.customErrMsg
                : `Password must be at least ${opts.value} characters long`
            );
          }
        };
      };

      const validationFunction = demoRule({ value: 8 });
      expect(typeof validationFunction).toBe("function");
      expect(validationFunction.length).toBe(1);

      expect(() => validationFunction("short")).toThrow(
        `Password must be at least 8 characters long`
      );
      expect(() => validationFunction("long enough")).not.toThrow();
    });
  });

  describe("ValidationFunctionSignature", () => {
    it("should accept a string and return void", () => {
      const demoValidationFunction: ValidationFunctionSignature = (
        password: string
      ) => {
        if (password.length < 8) {
          throw new Error("Password too short");
        }
      };

      expect(() => demoValidationFunction("short")).toThrow(
        "Password too short"
      );
      expect(() => demoValidationFunction("long enough")).not.toThrow();
    });
  });

  describe("RuleOptions", () => {
    it("should work with custom error message", () => {
      const options: RuleOptions<number> = {
        value: 8,
        customErrMsg: "custom error message",
      };

      const rule: ValidationRule<number> = (opts) => (password) => {
        if (password.length < opts.value) {
          throw new Error(opts.customErrMsg || "default error");
        }
      };

      const validationFunction = rule(options);
      expect(() => validationFunction("short")).toThrow("custom error message");
    });

    it("should work without custom error message", () => {
      const options: RuleOptions<number> = {
        value: 8,
      };

      const rule: ValidationRule<number> = (opts) => (password) => {
        if (password.length < opts.value) {
          throw new Error(opts.customErrMsg || "default error");
        }
      };

      const validationFunction = rule(options);
      expect(() => validationFunction("short")).toThrow("default error");
    });
  });
});
