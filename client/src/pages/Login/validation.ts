import { getRegisterOptions } from "@/utils/validation";

const registerOptions = getRegisterOptions({
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
    },
  },
});

export { registerOptions };
