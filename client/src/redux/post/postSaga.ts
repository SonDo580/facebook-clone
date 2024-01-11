import { all, call, put, takeLatest } from "redux-saga/effects";

import postService from "@/services/post";
import { Post } from "@/types/post";
import {
  actionFailed,
  actionPending,
  getFeedPostsInit,
  getPostsSuccess,
} from "./postSlice";

function* getFeedPosts() {
  yield put(actionPending());
  try {
    const posts: Post[] = yield call(postService.getFeedPosts);
    yield put(getPostsSuccess(posts));
  } catch (error) {
    yield put(actionFailed((error as Error).message));
  }
}

function* getFeedPostsWatcher() {
  yield takeLatest(getFeedPostsInit.type, getFeedPosts);
}

export function* postSaga() {
  yield all([call(getFeedPostsWatcher)]);
}
