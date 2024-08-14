import PasswordValidator from "../src/PasswordValidator";
import rules from "../src/rules";

describe("PasswordValidator", () => {
  describe("constructor", () => {
    it("should create an instance with a valid password", () => {
      expect(() => new PasswordValidator("validPassword")).not.toThrow();
    });

    it("should throw an error when an empty string is provided", () => {
      expect(() => new PasswordValidator("")).toThrow(
        "the password to be validated must be provided and cannot contain an empty value"
      );
    });

    it("should throw an error when null is provided", () => {
      expect(() => new PasswordValidator(null as any)).toThrow(
        "the password to be validated must be provided and cannot contain an empty value"
      );
    });
  });

  describe("setRules", () => {
    it("should return the instance for method chaining", () => {
      const validator = new PasswordValidator("password");
      const result = validator.setRules(rules.maxLengthRule({ value: 10 }));
      expect(result).toBe(validator);
    });
  });

  describe("validate", () => {
    it("should not throw an error when no rules are set", () => {
      const validator = new PasswordValidator("password");
      expect(() => validator.validate()).not.toThrow();
    });

    it("should throw an error when a rule fails", () => {
      const badPassword = "an";
      const validator = new PasswordValidator(badPassword);
      validator.setRules(rules.minLengthRule({ value: 3 }));
      expect(() => validator.validate()).toThrow(
        `minimum password length should be 3`
      );
    });

    it("should throw an error with custom message if set", () => {
      const badPassword = "an";
      const validator = new PasswordValidator(badPassword);
      validator.setRules(
        rules.minLengthRule({ value: 3, customErrMsg: "min rule failed" })
      );
      expect(() => validator.validate()).toThrow(`min rule failed`);
    });

    it("should throw an error when a rule fails out of multiple", () => {
      const badPassword = "anewpasswordvalue";
      const validator = new PasswordValidator(badPassword);
      validator.setRules(
        rules.minLengthRule({ value: 3 }),
        rules.maxLengthRule({ value: 10 })
      );
      expect(() => validator.validate()).toThrow(
        `maximum password length should be 10`
      );
    });

    it("should not throw an error all rules pass", () => {
      const badPassword = "password";
      const validator = new PasswordValidator(badPassword);
      validator.setRules(
        rules.minLengthRule({ value: 3 }),
        rules.maxLengthRule({ value: 10 })
      );
      expect(() => validator.validate()).not.toThrow();
    });
  });
});
