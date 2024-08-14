import lowerCaseRule from "../../src/rules/lowerCaseRule";

describe("lowerCaseRule", () => {
  it("should not throw an error when the number of lowercase characters meets the requirement", () => {
    const rule = lowerCaseRule({ value: 3 });
    expect(() => rule("ABCdef")).not.toThrow();
    expect(() => rule("abDEFc")).not.toThrow();
  });

  it("should throw an error when the number of lowercase characters is less than required", () => {
    const rule = lowerCaseRule({ value: 3 });
    expect(() => rule("ABCDEF")).toThrow(
      "minimum number of lowercase characters should be 3"
    );
    expect(() => rule("ABcDEF")).toThrow(
      "minimum number of lowercase characters should be 3"
    );
  });

  it("should use the custom error message when provided", () => {
    const customMessage = "not enough lowercase letters!";
    const rule = lowerCaseRule({ value: 2, customErrMsg: customMessage });
    expect(() => rule("ABCDEF")).toThrow(customMessage);
  });

  it("should not throw an error when value is 0 or negative", () => {
    const rule1 = lowerCaseRule({ value: 0 });
    const rule2 = lowerCaseRule({ value: -1 });
    expect(() => rule1("ABCDEF")).not.toThrow();
    expect(() => rule2("ABCDEF")).not.toThrow();
  });

  it("should work with different required counts of lowercase characters", () => {
    const rule1 = lowerCaseRule({ value: 1 });
    const rule2 = lowerCaseRule({ value: 5 });

    expect(() => rule1("ABCDEf")).not.toThrow();
    expect(() => rule1("ABCDEF")).toThrow();

    expect(() => rule2("abcdeFGHIJ")).not.toThrow();
    expect(() => rule2("abcdEFGHIJ")).toThrow();
  });

  it("should handle strings with only non-alphabetic characters", () => {
    const rule = lowerCaseRule({ value: 1 });
    expect(() => rule("123!@#")).toThrow(
      "minimum number of lowercase characters should be 1"
    );
  });
});
