import { all, call, put, takeLatest } from "redux-saga/effects";

import postService from "@/services/post";
import {
  DeletePostReturnType,
  Post,
  ReactToPostReturnType,
  ReactionToPostReturnType,
} from "@/types/post";
import {
  getPostsPending,
  getPostsFailed,
  getFeedPostsInit,
  getPostsSuccess,
  createPostInit,
  processPostPending,
  processPostFailed,
  createPostSuccess,
  updatePostInit,
  updatePostSuccess,
  deletePostInit,
  deletePostSuccess,
  reactToPostInit,
  reactToPostFailed,
  reactToPostSuccess,
} from "./postSlice";

// WORKERS

function* getFeedPosts() {
  yield put(getPostsPending());
  try {
    const posts: Post[] = yield call(postService.getFeedPosts);
    yield put(getPostsSuccess(posts));
  } catch (error) {
    yield put(getPostsFailed((error as Error).message));
  }
}

function* createPost(action: ReturnType<typeof createPostInit>) {
  yield put(processPostPending());
  try {
    const newPost: Post = yield call(postService.createPost, action.payload);
    yield put(createPostSuccess(newPost));
  } catch (error) {
    yield put(processPostFailed((error as Error).message));
  }
}

function* updatePost(action: ReturnType<typeof updatePostInit>) {
  yield put(processPostPending());
  try {
    const updatedPost: Post = yield call(
      postService.updatePost,
      action.payload
    );
    yield put(updatePostSuccess(updatedPost));
  } catch (error) {
    yield put(processPostFailed((error as Error).message));
  }
}

function* deletePost(action: ReturnType<typeof deletePostInit>) {
  yield put(processPostPending());
  try {
    const { deletedPostId }: DeletePostReturnType = yield call(
      postService.deletePost,
      action.payload
    );
    yield put(deletePostSuccess(deletedPostId));
  } catch (error) {
    yield put(processPostFailed((error as Error).message));
  }
}

function* reactToPost(action: ReturnType<typeof reactToPostInit>) {
  yield put(processPostPending());
  try {
    const updatedPost: Post = yield call(
      postService.reactToPost,
      action.payload
    );
    yield put(updatePostSuccess(updatedPost));
  } catch (error) {
    yield put(reactToPostFailed((error as Error).message));
  }
}

// WATCHERS

function* getFeedPostsWatcher() {
  yield takeLatest(getFeedPostsInit.type, getFeedPosts);
}

function* createPostWatcher() {
  yield takeLatest(createPostInit.type, createPost);
}

function* updatePostWatcher() {
  yield takeLatest(updatePostInit.type, updatePost);
}

function* deletePostWatcher() {
  yield takeLatest(deletePostInit.type, deletePost);
}

function* reactToPostWatcher() {
  yield takeLatest(reactToPostInit.type, reactToPost);
}

export function* postSaga() {
  yield all([
    call(getFeedPostsWatcher),
    call(createPostWatcher),
    call(updatePostWatcher),
    call(deletePostWatcher),
    call(reactToPostWatcher),
  ]);
}
