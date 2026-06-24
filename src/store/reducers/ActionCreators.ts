import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPost } from "../../models/post";

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/posts");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const postsData: IPost[] = await res.json();
      return postsData;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Неизвестная ошибка'
      );
    }
  }
)