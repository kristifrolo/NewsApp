import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addPost, fetchPosts } from "./ActionCreators";
import { getPageCount } from "../../utils/pages";
import type { IPostsState } from "../../models/postsState";

const initialState: IPostsState = {
  posts: [],
  isLoading: false,
  error: '',
  totalPages: 0,
  currentPage: 1,
  searchQuery: '',
  isCreating: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.posts = action.payload.posts;
        state.totalPages = getPageCount(action.payload.totalCount, 10);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || action.error.message || 'Ошибка загрузки';
      })
      .addCase(addPost.pending, (state) => {
        state.isCreating = true;
        state.error = '';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isCreating = false;
        state.error = '';
        state.posts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isCreating = false;
        state.error = (action.payload as string) || action.error.message || 'Ошибка создания';
      })
  },
})

const postReducer = postsSlice.reducer;
export default postReducer;
export const { setCurrentPage, setSearchQuery } = postsSlice.actions;