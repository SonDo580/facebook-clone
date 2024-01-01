import { RootState } from "./store";

const authSelector = (state: RootState) => state.auth;

export { authSelector };
