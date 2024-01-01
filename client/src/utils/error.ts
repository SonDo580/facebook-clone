import { AxiosError } from "axios";

type ResponseError = { message: string; stack?: string };

const getErrorMessage = (error: AxiosError) => {
  if (error.response && error.response.status !== 404) {
    return (error.response.data as ResponseError).message;
  }
  return error.message || error.toString();
};

const handleServiceError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(getErrorMessage(error));
  }
  throw error;
};

export { getErrorMessage, handleServiceError };
