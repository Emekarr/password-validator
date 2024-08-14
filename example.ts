import PasswordValidator from "./src/PasswordValidator";
import rules from "./src/rules";

const password = "123!@#";

const passwordValidator = new PasswordValidator(password).setRules(
  rules.minLengthRule({
    value: 5,
    customErrMsg: "password should have a minimum value of 5 charcters",
  }),
  // rules.maxLengthRule({ value: 20 }),
  // rules.upperCaseRule({ value: 2 }),
  rules.lowerCaseRule({ value: 2 }),
  // rules.numberCharactersRule({ value: 2 }),
  // rules.specialCharctersRule({ value: 2 })
);

try {
  passwordValidator.validate();
  console.log("all validation rules passed");
} catch (err: any) {
  console.log(err);
}
