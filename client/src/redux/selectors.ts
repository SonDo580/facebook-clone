import { RootState } from "./store";

const authSelector = (state: RootState) => state.auth;

const postSliceSelector = (state: RootState) => state.post;

export { authSelector, postSliceSelector };
