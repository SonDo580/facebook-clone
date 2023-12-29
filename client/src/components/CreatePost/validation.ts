import { getRegisterOptions } from "@/utils/validation";

const registerOptions = getRegisterOptions({
  content: {
    displayName: "Post content",
    rules: {
      required: true,
    },
  },
});

export { registerOptions };
