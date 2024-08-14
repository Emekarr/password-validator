import PasswordValidator from "./src/PasswordValidator";
import rules from "./src/rules";

const password = "astrongpassword";

const passwordValidator = new PasswordValidator(password).setRules(
  rules.minLengthRule({
    value: 5,
    customErrMsg: "password should have a minimum value of 5 charcters",
  }),
  rules.maxLengthRule({ value: 20 })
);

try {
  passwordValidator.validate();
  console.log("all validation rules passed");
} catch (err: any) {
  console.log(err);
}
