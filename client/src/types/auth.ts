type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  gender: string;
};

type LoginData = {
  email: string;
  password: string;
};

type LogoutReturnType = {
  message: string;
};

export type { RegisterData, LoginData, LogoutReturnType };
