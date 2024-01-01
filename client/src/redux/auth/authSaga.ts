import { all, call, put, takeLatest } from "redux-saga/effects";

import { User } from "@/types/user";
import authService from "@/services/auth";
import {
  registerFailed,
  registerInit,
  registerPending,
  registerSuscess,
} from "./authSlice";

function* register(action: ReturnType<typeof registerInit>) {
  yield put(registerPending());
  try {
    const user: User = yield call(authService.register, action.payload);
    yield put(registerSuscess(user));
  } catch (error) {
    yield put(registerFailed((error as Error).message));
  }
}

function* registerWatcher() {
  yield takeLatest(registerInit.type, register);
}

export function* authSaga() {
  yield all([call(registerWatcher)]);
}
