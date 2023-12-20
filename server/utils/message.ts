const requiredMessage = (name: string) => `${name} is required!`;

const invalidMessage = (name: string) => `${name} is invalid!`;

type Range = Partial<{ min: number; max: number }>;

const lengthMessage = (name: string, { min, max }: Range) => {
  if (!min && max) {
    return `${name} must contains at most ${max} characters!`;
  }
  if (!max && min) {
    return `${name} must contains at least ${min} characters!`;
  }
  if (min === max) {
    return `${name} must contains ${min} characters!`;
  }
  return `${name} must be between ${min} and ${max} characters!`;
};

export { requiredMessage, invalidMessage, lengthMessage };
