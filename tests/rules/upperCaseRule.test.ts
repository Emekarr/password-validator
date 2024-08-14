import upperCaseRule from "../../src/rules/upperCaseRule";

describe("upperCaseRule", () => {
  it("should not throw an error when the number of uppercase characters meets the requirement", () => {
    const rule = upperCaseRule({ value: 3 });
    expect(() => rule("ABCdef")).not.toThrow();
    expect(() => rule("abDEFc")).not.toThrow();
  });

  it("should throw an error when the number of uppercase characters is less than required", () => {
    const rule = upperCaseRule({ value: 3 });
    expect(() => rule("ABcdef")).toThrow(
      "minimum number of uppercase characters should be 3"
    );
    expect(() => rule("cdAB@$@")).toThrow(
      "minimum number of uppercase characters should be 3"
    );
  });

  it("should use the custom error message when provided", () => {
    const customMessage = "not enough uppercase letters!";
    const rule = upperCaseRule({ value: 2, customErrMsg: customMessage });
    expect(() => rule("abc")).toThrow(customMessage);
  });

  it("should not throw an error when value is 0 or negative", () => {
    const rule1 = upperCaseRule({ value: 0 });
    const rule2 = upperCaseRule({ value: -1 });
    expect(() => rule1("ABCDEF")).not.toThrow();
    expect(() => rule2("abcd")).not.toThrow();
  });

  it("should work with different required counts of uppercase characters", () => {
    const rule1 = upperCaseRule({ value: 1 });
    const rule2 = upperCaseRule({ value: 5 });

    expect(() => rule1("ABCDEf")).not.toThrow();
    expect(() => rule1("abcde")).toThrow();

    expect(() => rule2("abcdeFGHIJ")).not.toThrow();
    expect(() => rule2("abcdEFGH")).toThrow();
  });

  it("should handle strings with only non-alphabetic characters", () => {
    const rule = upperCaseRule({ value: 1 });
    expect(() => rule("123!@#")).toThrow(
      "minimum number of uppercase characters should be 1"
    );
  });
});
