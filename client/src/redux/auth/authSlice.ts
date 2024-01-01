import { createAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@/types/user";
import { LoginData, RegisterData } from "@/types/auth";
import { getItemFromLocalStorage } from "@/utils/storage";

type AuthState = {
  user: User | null;
  loading: boolean;
  errorMsg: string;
};

const SLICE_NAME: string = "auth";

const initialState: AuthState = {
  user: getItemFromLocalStorage<User>("user"),
  loading: false,
  errorMsg: "",
};

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    registerPending: (state) => {
      state.loading = true;
    },
    registerSuscess: (state, action) => {
      state.loading = false;
      state.errorMsg = "";
      state.user = action.payload;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    loginPending: (state) => {
      state.loading = true;
    },
    loginSuscess: (state, action) => {
      state.loading = false;
      state.errorMsg = "";
      state.user = action.payload;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    logoutPending: (state) => {
      state.loading = true;
    },
    logoutSuscess: (state) => {
      state.loading = false;
      state.errorMsg = "";
      state.user = null;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
  },
});

export default authSlice.reducer;

export const {
  registerPending,
  registerSuscess,
  registerFailed,
  loginPending,
  loginSuscess,
  loginFailed,
  logoutPending,
  logoutSuscess,
  logoutFailed,
} = authSlice.actions;

// Extra actions
const getActionType = (name: string) => `${SLICE_NAME}/${name}`;

const registerInit = createAction<RegisterData>(getActionType("registerInit"));
const loginInit = createAction<LoginData>(getActionType("loginInit"));
const logoutInit = createAction(getActionType("logoutInit"));

export { registerInit, loginInit, logoutInit };
