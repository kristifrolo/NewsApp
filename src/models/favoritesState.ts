import type { IFavoritePost, SortByType } from "./favorites";

export interface IFavoritesState {
  favoritePosts: IFavoritePost[];
  sortBy: SortByType;
}
