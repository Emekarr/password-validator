import minLengthRule from "../../src/rules/minimumLengthRule";

describe("minLengthRule", () => {
  it("should not throw an error when password length is equal to the minimum", () => {
    const rule = minLengthRule({ value: 8 });
    expect(() => rule("12345678")).not.toThrow();
  });

  it("should not throw an error when password length is greater than the minimum", () => {
    const rule = minLengthRule({ value: 5 });
    expect(() => rule("123456789")).not.toThrow();
  });

  it("should throw an error when password length is less than the minimum", () => {
    const rule = minLengthRule({ value: 5 });
    expect(() => rule("1234")).toThrow("minimum password length should be 8");
  });

  it("should use the default error message when no custom message is provided", () => {
    const rule = minLengthRule({ value: 10 });
    expect(() => rule("123456789")).toThrow(
      "minimum password length should be 10"
    );
  });

  it("should use the custom error message when provided", () => {
    const customMessage = "Password is too short!";
    const rule = minLengthRule({ value: 10, customErrMsg: customMessage });
    expect(() => rule("123456789")).toThrow(customMessage);
  });

  it("should throw an error if value set is 0 or less", () => {
    const rule = minLengthRule({ value: 0 });
    expect(() => rule("password")).toThrow(
      "minimum length cannot be equal to or less than 0"
    );
  });

  it("should work with different minimum lengths", () => {
    const rule1 = minLengthRule({ value: 5 });
    const rule2 = minLengthRule({ value: 15 });

    expect(() => rule1("12345")).not.toThrow();
    expect(() => rule1("1234")).toThrow();

    expect(() => rule2("123456789012345")).not.toThrow();
    expect(() => rule2("12345678901234")).toThrow();
  });
});
