import { createAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@/types/user";
import { getItemFromLocalStorage } from "@/utils/storage";
import { RegisterData } from "@/types/auth";

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
  logoutPending,
  logoutSuscess,
  logoutFailed,
} = authSlice.actions;

// Extra actions
const getActionType = (name: string) => `${SLICE_NAME}/${name}`;

const registerInit = createAction<RegisterData>(getActionType("registerInit"));
const logoutInit = createAction(getActionType("logoutInit"));

export { registerInit, logoutInit };
