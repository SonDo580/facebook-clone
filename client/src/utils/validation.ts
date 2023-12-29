import { RegisterOptions } from "react-hook-form";

const requiredMessage = (name: string) => `${name} is required!`;

const minLengthMessage = (name: string, value: number) =>
  `${name} must contains at least ${value} characters!`;

const maxLengthMessage = (name: string, value: number) =>
  `${name} must contains at most ${value} characters!`;

const minMessage = (name: string, value: number) =>
  `${name} must be at least ${value}!`;

const maxMessage = (name: string, value: number) =>
  `${name} must be at most ${value}!`;

const trimMessage = (name: string) => `${name} must not contain all spaces!`;

type NumberRule = "minLength" | "maxLength" | "min" | "max";

const MESSAGE_FUNCTIONS = {
  minLength: minLengthMessage,
  maxLength: maxLengthMessage,
  min: minMessage,
  max: maxMessage,
};

const numberRuleKeys = Object.keys(MESSAGE_FUNCTIONS) as NumberRule[];

type CustomRegisterOptions = RegisterOptions & { trim?: true };

const getFieldRegisterOptions = (
  displayName: string,
  rules: CustomRegisterOptions
): RegisterOptions => {
  if (rules.required === true) {
    rules.required = requiredMessage(displayName);
  }

  if (rules.trim === true) {
    delete rules.trim;
    rules.validate = (value) =>
      value.trim().length !== 0 || trimMessage(displayName);
  }

  for (const key of numberRuleKeys) {
    const value = rules[key];
    if (typeof value === "number") {
      rules[key] = {
        value,
        message: MESSAGE_FUNCTIONS[key](displayName, value),
      };
    }
  }

  return rules;
};

type AllFieldValidations = {
  [field: string]: {
    displayName: string;
    rules: CustomRegisterOptions;
  };
};

type AllFieldRegisterOptions = {
  [field: string]: RegisterOptions;
};

const getRegisterOptions = (validations: AllFieldValidations) => {
  const registerOptions: AllFieldRegisterOptions = {};
  for (const field of Object.keys(validations)) {
    const { displayName, rules } = validations[field];
    registerOptions[field] = getFieldRegisterOptions(displayName, rules);
  }
  return registerOptions;
};

const getStrongPasswordRegex = () => {
  const containsLowercase = "(?=.*[a-z])";
  const containsUppercase = "(?=.*[A-Z])";
  const containsNumber = "(?=.*[0-9])";
  const containsSymbol = "(?=.*[^\\W\\s])";

  return new RegExp(
    `${containsLowercase}${containsUppercase}${containsNumber}${containsSymbol}`
  );
};

export { getRegisterOptions, getStrongPasswordRegex };
