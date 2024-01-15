import { createAction, createSlice } from "@reduxjs/toolkit";

import {
  Post,
  PostFormData,
  ReactToPostPayload,
  UpdatePostPayload,
} from "@/types/post";

type PostSliceState = {
  posts: Post[];
  loading: boolean;
  errorMsg: string;
  postLoading: boolean;
  postErrorMsg: string;
  reactionErrorMsg: string;
};

const SLICE_NAME: string = "post";

const initialState: PostSliceState = {
  posts: [],
  loading: false,
  errorMsg: "",
  postLoading: false,
  postErrorMsg: "",
  reactionErrorMsg: "",
};

const postSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    getPostsPending: (state) => {
      state.loading = true;
    },
    getPostsFailed: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.errorMsg = "";
      state.posts = action.payload;
    },
    processPostPending: (state) => {
      state.postLoading = true;
    },
    processPostFailed: (state, action) => {
      state.postLoading = false;
      state.postErrorMsg = action.payload;
    },
    resetPostError: (state) => {
      state.postErrorMsg = "";
    },
    createPostSuccess: (state, action) => {
      state.postLoading = false;
      state.postErrorMsg = "";
      state.posts.unshift(action.payload);
    },
    updatePostSuccess: (state, action) => {
      const updatedPost = action.payload;
      state.postLoading = false;
      state.postErrorMsg = "";
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    },
    deletePostSuccess: (state, action) => {
      state.postLoading = false;
      state.postErrorMsg = "";
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    reactToPostFailed: (state, action) => {
      state.postLoading = false;
      state.reactionErrorMsg = action.payload;
    },
  },
});

export default postSlice.reducer;

export const {
  getPostsPending,
  getPostsFailed,
  getPostsSuccess,
  processPostPending,
  processPostFailed,
  resetPostError,
  createPostSuccess,
  updatePostSuccess,
  deletePostSuccess,
  reactToPostFailed,
  reactToPostSuccess,
} = postSlice.actions;

// Extra actions
const getActionType = (name: string) => `${SLICE_NAME}/${name}`;

const getFeedPostsInit = createAction(getActionType("getFeedPostsInit"));
const createPostInit = createAction<PostFormData>(
  getActionType("createPostInit")
);
const updatePostInit = createAction<UpdatePostPayload>(
  getActionType("updatePostInit")
);
const deletePostInit = createAction<string>(getActionType("deletePostInit"));
const reactToPostInit = createAction<ReactToPostPayload>(
  getActionType("reactToPostInit")
);

export {
  getFeedPostsInit,
  createPostInit,
  updatePostInit,
  deletePostInit,
  reactToPostInit,
};
