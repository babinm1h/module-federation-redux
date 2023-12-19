import { IUser } from "@/models/user.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IPostsState = { posts: [] };

interface IPostsState {
  posts: IUser[];
}

const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    setPosts(state, action: PayloadAction<IUser[]>) {
      state.posts = action.payload;
    },
  },
});

export const postsSliceReducer = postsSlice.reducer;
export const postsSliceActions = postsSlice.actions;

