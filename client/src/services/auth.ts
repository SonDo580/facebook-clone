import { User } from "@/types/user";
import { RegisterData } from "@/types/auth";
import { saveItemToLocalStorage } from "@/utils/storage";
import { handleServiceError } from "@/utils/error";
import { axiosInstance } from "./request";

const URL = "/auth";

const register = async (registerData: RegisterData): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>(
      `${URL}/register`,
      registerData
    );

    saveItemToLocalStorage<User>("user", response.data);
    return response.data;
  } catch (error) {
    return handleServiceError(error);
  }
};

const authService = { register };
export default authService;
