import { all, call, put, takeLatest } from "redux-saga/effects";

import { User } from "@/types/user";
import authService from "@/services/auth";
import {
  loginFailed,
  loginInit,
  loginPending,
  loginSuscess,
  logoutFailed,
  logoutInit,
  logoutPending,
  logoutSuscess,
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

function* login(action: ReturnType<typeof loginInit>) {
  yield put(loginPending());
  try {
    const user: User = yield call(authService.login, action.payload);
    yield put(loginSuscess(user));
  } catch (error) {
    yield put(loginFailed((error as Error).message));
  }
}

function* logout() {
  yield put(logoutPending());
  try {
    yield call(authService.logout);
    yield put(logoutSuscess());
  } catch (error) {
    yield put(logoutFailed((error as Error).message));
  }
}

function* registerWatcher() {
  yield takeLatest(registerInit.type, register);
}

function* loginWatcher() {
  yield takeLatest(loginInit.type, login);
}

function* logoutWatcher() {
  yield takeLatest(logoutInit.type, logout);
}

export function* authSaga() {
  yield all([call(registerWatcher), call(loginWatcher), call(logoutWatcher)]);
}
