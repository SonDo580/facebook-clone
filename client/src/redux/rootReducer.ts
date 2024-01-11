import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import postReducer from "./post/postSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});
