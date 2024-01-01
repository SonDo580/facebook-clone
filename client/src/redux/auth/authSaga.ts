import { all, call, takeLatest } from "redux-saga/effects";

function* register() {}

function* registerWatcher() {
  yield takeLatest("auth/register", register);
}

export function* authSaga() {
  yield all([call(registerWatcher)]);
}
