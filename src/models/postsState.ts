import type { IPost } from "./post";

export interface IPostsState {
  posts: IPost[];
  isLoading: boolean;
  error: string;
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  isCreating: boolean;
}