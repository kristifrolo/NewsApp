import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPost } from "../../models/post";
import { fetchPosts } from "./ActionCreators";

interface IPostsState {
  posts: IPost[];
  isLoading: boolean;
  error: string;
}

const initialState: IPostsState = {
  posts: [],
  isLoading: false,
  error: ''
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isLoading = false;
        state.error = '';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || 'Ошибка загрузки';
      });
  },
})

export default postsSlice.reducer;