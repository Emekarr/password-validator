# Documentation

Emote Password Validator

The `src` folder contains the main code for the password validator

There are 4 main types

- PasswordValidator
- ValidationRule
- ValidationFunctionSignature
- RuleOptions

## PasswordValidator Type

This is the main password validator type. Create an instance and pass in the password to be validated through the constructure. You can then set the rules to be enforced on the password through the `setRules(...rules: ValidationFunctionSignature[])` method.

## ValidationRule Type

This type is a Function Signature which specifies the format validation rules should take when new rules are to be added. This signature is a higher order function which returns a function of type `ValidationFunctionSignature`. It's function parameter is of type `RuleOptions` which let's you customize error messages and set the value to validate against.

## ValidationFunctionSignature Type

This type represents the main function the Password Validation class knows how to run and is called only inside the class after an instance of this is specified as the return type of the `ValidationRule`. It takes a password parameter and runs the validation on it.

## RuleOptions Type

This type represents the options when creating an instance of a validation rule. It has only 2 properties, an optional `customErrMsg` which overrides the default error message and a generic `value` which holds the value to validate against.

## How To Use

The code snippet below shows a brief example of how to make use of the package

```typescript
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
} catch (err: any) {
  console.log(err);
}
```

## CONTRIBUTING

To add more rules to the PasswordValidator create the rules file in the rules module located in `./src/rules` and implement the validation rule which should match the Function Signature `ValidationRule`. Export this new rule using `export default newRule` and import it in `./src/index` and include it in the default object which is exported.

## PLEASE NOTE

- Use node `18.18.2 >` to avoid any issues
- If you are experiencing any issues upgrade your NodeJS version to `Node 20.11.0`

## SET UP GUIDE

- Clone the repositry from github using `git clone https://github.com/Emekarr/password-validator` and cd into the folder

- Use `nvm` to set your node version to `18.18.2` using the command`nvm use 18.18.2`.

- To install the recommended node version use `nvm install 18.18.2` then execute the command above again

- Install all dependencies using `npm i`

- `example.ts` contains a working example of how to use the PasswordValidator

- Test the example using `npm run example`. If all rules passed `all validation rules passed` will be logged to the console. If not an error message specifying which rule check failed will be logged to the console.
