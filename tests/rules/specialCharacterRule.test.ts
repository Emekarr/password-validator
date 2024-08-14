import specialCharactersRule from "../../src/rules/specialCharctersRule";

describe("specialCharactersRule", () => {
  it("should not throw an error when the number of special characters meets the requirement", () => {
    const rule = specialCharactersRule({ value: 2 });
    expect(() => rule("abc!@def")).not.toThrow();
    expect(() => rule("!@#abcdef")).not.toThrow();
  });

  it("should throw an error when the number of special characters is less than required", () => {
    const rule = specialCharactersRule({ value: 3 });
    expect(() => rule("abc!@def")).toThrow(
      "minimum number of special characters should be 3"
    );
    expect(() => rule("abcdef!")).toThrow(
      "minimum number of special characters should be 3"
    );
  });

  it("should use the custom error message when provided", () => {
    const customMessage = "not enough special characters!";
    const rule = specialCharactersRule({
      value: 2,
      customErrMsg: customMessage,
    });
    expect(() => rule("abcdef!")).toThrow(customMessage);
  });

  it("should not throw an error when value is 0 or negative", () => {
    const rule1 = specialCharactersRule({ value: 0 });
    const rule2 = specialCharactersRule({ value: -1 });
    expect(() => rule1("abcdef")).not.toThrow();
    expect(() => rule2("abcdef")).not.toThrow();
  });

  it("should work with different required counts of special characters", () => {
    const rule1 = specialCharactersRule({ value: 1 });
    const rule2 = specialCharactersRule({ value: 5 });

    expect(() => rule1("abcde!")).not.toThrow();
    expect(() => rule1("abcdef")).toThrow();

    expect(() => rule2("abc!@#$%def")).not.toThrow();
    expect(() => rule2("abc!@#$def")).toThrow();
  });

  it("should correctly count only allowed special characters", () => {
    const rule = specialCharactersRule({ value: 3 });
    expect(() => rule("abc!@#def")).not.toThrow();
    expect(() => rule("abc!@~def")).toThrow(
      "minimum number of special characters should be 3"
    ); // '~' is not in the allowed list
  });

  it("should count each special character only once", () => {
    const rule = specialCharactersRule({ value: 3 });
    expect(() => rule("abc!!@@def")).not.toThrow();
  });

  it("should work with all allowed special characters", () => {
    const rule = specialCharactersRule({ value: 26 });
    const allSpecialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    expect(() => rule(allSpecialChars)).not.toThrow();
  });
});
