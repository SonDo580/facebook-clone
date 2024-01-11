import { all, call } from "redux-saga/effects";

import { authSaga } from "./auth/authSaga";
import { postSaga } from "./post/postSaga";

export function* rootSaga() {
  yield all([call(authSaga), call(postSaga)]);
}
