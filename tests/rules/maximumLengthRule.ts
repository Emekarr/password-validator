import maxLengthRule from "../../src/rules/maximumLengthRule";

describe("maxLengthRule", () => {
  it("should not throw an error when password length is equal to the maximum", () => {
    const rule = maxLengthRule({ value: 5 });
    expect(() => rule("12345")).not.toThrow();
  });

  it("should not throw an error when password length is less than the maximum", () => {
    const rule = maxLengthRule({ value: 5 });
    expect(() => rule("1234")).not.toThrow();
  });

  it("should throw an error when password length exceeds the maximum", () => {
    const rule = maxLengthRule({ value: 5 });
    expect(() => rule("123456")).toThrow("maximum password length should be 5");
  });

  it("should use the default error message when no custom message is provided", () => {
    const rule = maxLengthRule({ value: 8 });
    expect(() => rule("123456789")).toThrow(
      "maximum password length should be 8"
    );
  });

  it("should throw an error if value set is 0 or less", () => {
    const rule = maxLengthRule({ value: 0 });
    expect(() => rule("password")).toThrow(
      "maximum length cannot be equal to or less than 0"
    );
  });

  it("should use the custom error message when provided", () => {
    const customMessage = "password is too long!";
    const rule = maxLengthRule({ value: 8, customErrMsg: customMessage });
    expect(() => rule("123456789")).toThrow(customMessage);
  });

  it("should work with different maximum lengths", () => {
    const rule1 = maxLengthRule({ value: 5 });
    const rule2 = maxLengthRule({ value: 15 });

    expect(() => rule1("12345")).not.toThrow();
    expect(() => rule1("123456")).toThrow();

    expect(() => rule2("123456789012345")).not.toThrow();
    expect(() => rule2("1234567890123456")).toThrow();
  });
});
