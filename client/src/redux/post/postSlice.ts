import { createAction, createSlice } from "@reduxjs/toolkit";

import { Post } from "@/types/post";

type PostSliceState = {
  posts: Post[];
  loading: boolean;
  errorMsg: string;
};

const SLICE_NAME: string = "post";

const initialState: PostSliceState = {
  posts: [],
  loading: false,
  errorMsg: "",
};

const postSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    actionPending: (state) => {
      state.loading = true;
    },
    actionFailed: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.errorMsg = "";
      state.posts = action.payload;
    },
  },
});

export default postSlice.reducer;

export const { actionPending, actionFailed, getPostsSuccess } =
  postSlice.actions;

// Extra actions
const getActionType = (name: string) => `${SLICE_NAME}/${name}`;

const getFeedPostsInit = createAction(getActionType("getFeedPostsInit"));

export { getFeedPostsInit };
