import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/types/user";
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
  reducers: {},
});

export default authSlice.reducer;
