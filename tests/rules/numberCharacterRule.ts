import numberCharactersRule from "../../src/rules/numberCharactersRule";

describe("numberCharactersRule", () => {
  it("should not throw when the number of digits meets the requirement", () => {
    const rule = numberCharactersRule({ value: 3 });
    expect(() => rule("abc123def")).not.toThrow();
    expect(() => rule("123abcdef")).not.toThrow();
  });

  it("should throw when the number of digits is less than required", () => {
    const rule = numberCharactersRule({ value: 3 });
    expect(() => rule("abc12def")).toThrow(
      "minimum number of digits should be 3"
    );
    expect(() => rule("abcdef1")).toThrow(
      "minimum number of digits should be 3"
    );
  });

  it("should use the custom error message when provided", () => {
    const customMsg = "not enough digits!";
    const rule = numberCharactersRule({ value: 2, customErrMsg: customMsg });
    expect(() => rule("abc1")).toThrow(customMsg);
  });

  it("should not throw when value is 0 or negative", () => {
    const rule0 = numberCharactersRule({ value: 0 });
    const ruleNeg = numberCharactersRule({ value: -1 });
    expect(() => rule0("abcdef")).not.toThrow();
    expect(() => ruleNeg("abcdef")).not.toThrow();
  });

  it("should work with different required counts", () => {
    const rule1 = numberCharactersRule({ value: 1 });
    const rule5 = numberCharactersRule({ value: 5 });

    expect(() => rule1("abc1")).not.toThrow();
    expect(() => rule1("abcd")).toThrow();

    expect(() => rule5("abc12345def")).not.toThrow();
    expect(() => rule5("abc1234def")).toThrow();
  });

  it("should only count numeric characters", () => {
    const rule = numberCharactersRule({ value: 3 });
    expect(() => rule("abc123def")).not.toThrow();
    expect(() => rule("abc12.def")).toThrow(); // '.' is not counted as a digit
  });

  it("should work with all numeric characters", () => {
    const rule = numberCharactersRule({ value: 10 });
    const allDigits = "0123456789";
    expect(() => rule(allDigits)).not.toThrow();
  });

  it("should handle strings with no numeric characters", () => {
    const rule = numberCharactersRule({ value: 1 });
    expect(() => rule("abcDEF!@#")).toThrow(
      "minimum number of digits should be 1"
    );
  });

  it("should count each digit individually", () => {
    const rule = numberCharactersRule({ value: 3 });
    expect(() => rule("abc111def")).not.toThrow();
  });

  it("should handle strings with mixed characters", () => {
    const rule = numberCharactersRule({ value: 3 });
    expect(() => rule("a1b2c3d!@#")).not.toThrow();
    expect(() => rule("a1b2cd!@#")).toThrow(
      "minimum number of digits should be 3"
    );
  });

  it("should handle whitespace correctly", () => {
    const rule = numberCharactersRule({ value: 3 });
    expect(() => rule("abc 123 def")).not.toThrow();
    expect(() => rule("abc 12 def")).toThrow();
  });
});
