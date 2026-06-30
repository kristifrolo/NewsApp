import type { IPost } from "./post";

export interface IFavoritePost {
  post: IPost;
  addedAt: string;
}

export type SortByType = 'date' | 'title';