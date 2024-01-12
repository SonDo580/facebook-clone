import { all, call, put, takeLatest } from "redux-saga/effects";

import postService from "@/services/post";
import { Post } from "@/types/post";
import {
  getPostsPending,
  getPostsFailed,
  getFeedPostsInit,
  getPostsSuccess,
  createPostInit,
  processPostPending,
  processPostFailed,
  createPostSuccess,
} from "./postSlice";

function* getFeedPosts() {
  yield put(getPostsPending());
  try {
    const posts: Post[] = yield call(postService.getFeedPosts);
    yield put(getPostsSuccess(posts));
  } catch (error) {
    yield put(getPostsFailed((error as Error).message));
  }
}

function* createPost() {
  yield put(processPostPending());
  try {
    const newPost: Post = yield call(postService.createPost);
    yield put(createPostSuccess(newPost));
  } catch (error) {
    yield put(processPostFailed((error as Error).message));
  }
}

function* getFeedPostsWatcher() {
  yield takeLatest(getFeedPostsInit.type, getFeedPosts);
}

function* createPostWatcher() {
  yield takeLatest(createPostInit.type, createPost);
}

export function* postSaga() {
  yield all([call(getFeedPostsWatcher), call(createPostWatcher)]);
}
