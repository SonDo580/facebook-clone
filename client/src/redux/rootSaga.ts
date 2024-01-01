import { all, call } from "redux-saga/effects";

import { authSaga } from "./auth/authSaga";

export function* rootSaga() {
  yield all([call(authSaga)]);
}
