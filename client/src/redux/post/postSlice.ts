import { createAction, createSlice } from "@reduxjs/toolkit";

import { Post, PostFormData } from "@/types/post";

type PostSliceState = {
  posts: Post[];
  loading: boolean;
  errorMsg: string;
  postLoading: boolean;
  postErrorMsg: string;
  reactionLoading: boolean;
  reactionSuccess: boolean;
  reactionErrorMsg: string;
};

const SLICE_NAME: string = "post";

const initialState: PostSliceState = {
  posts: [],
  loading: false,
  errorMsg: "",
  postLoading: false,
  postErrorMsg: "",
  reactionLoading: false,
  reactionSuccess: false,
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
    createPostSuccess: (state, action) => {
      state.postLoading = false;
      state.postErrorMsg = "";
      state.posts.unshift(action.payload);
    },
    reactionPending: (state) => {
      state.reactionLoading = true;
    },
    reactionFailed: (state, action) => {
      state.reactionLoading = false;
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
  createPostSuccess,
} = postSlice.actions;

// Extra actions
const getActionType = (name: string) => `${SLICE_NAME}/${name}`;

const getFeedPostsInit = createAction(getActionType("getFeedPostsInit"));
const createPostInit = createAction<PostFormData>(
  getActionType("createPostInit")
);

export { getFeedPostsInit, createPostInit };
