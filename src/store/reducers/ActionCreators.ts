import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPost, getPosts } from "../../api/posts";
import type { IPost } from "../../models/post";

export const fetchPosts = createAsyncThunk<
  { posts: IPost[]; totalCount: number },
  { limit?: number, page?: number, searchQuery?: string },
  { rejectValue: string }
>(
  'posts/fetchAll',
  async (props, { rejectWithValue }) => {
    try {
      const result = await getPosts(props);
      return result;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Неизвестная ошибка'
      );
    }
  }
);

export const addPost = createAsyncThunk<
  IPost,
  { title: string, body: string, userId: number },
  { rejectValue: string }
>(
  'posts/addPost',
  async (postData, { rejectWithValue }) => {
    try {
      const newPost = await createPost(postData);
      return newPost;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Неизвестная ошибка'
      );
    }
  }
);