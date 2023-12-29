import {
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/constants";
import { getRegisterOptions, getStrongPasswordRegex } from "@/utils/validation";

const passwordRegex = getStrongPasswordRegex();

const registerOptions = getRegisterOptions({
  firstName: {
    displayName: "First name",
    rules: {
      required: true,
      trim: true,
      maxLength: NAME_MAX_LENGTH,
    },
  },
  lastName: {
    displayName: "Last name",
    rules: {
      required: true,
      trim: true,
      maxLength: NAME_MAX_LENGTH,
    },
  },
  email: {
    displayName: "Email",
    rules: {
      required: true,
    },
  },
  password: {
    displayName: "Password",
    rules: {
      required: true,
      minLength: PASSWORD_MIN_LENGTH,
      maxLength: PASSWORD_MAX_LENGTH,
      pattern: {
        value: passwordRegex,
        message:
          "Password must contains lowercase letter, uppercase letter, number and symbol!",
      },
    },
  },
  gender: {
    displayName: "Gender",
    rules: {
      required: true,
    },
  },
});

export { registerOptions };
