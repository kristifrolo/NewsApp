import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SortByType } from "../../models/favorites";
import type { IPost } from "../../models/post";
import type { IFavoritesState } from "../../models/favoritesState";
import { loadFavoritePostsFromStorage } from "../../utils/favoritePostsStorage";

const initialState: IFavoritesState = {
  favoritePosts: loadFavoritePostsFromStorage(),
  sortBy: 'date',
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IPost>) =>{
      const favoritePost = action.payload;
      const exists = state.favoritePosts.some(
        (favorite) => favorite.post.id === favoritePost.id
      );

      if (!exists) {
        state.favoritePosts.push({
          post: favoritePost,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoritePosts = state.favoritePosts.filter(
        (favorite) => favorite.post.id !== action.payload
      );
    },
    setSortBy: (state, action: PayloadAction<SortByType>) => {
      state.sortBy = action.payload;
    }
  }
});

export default favoritesSlice.reducer;
export const { addFavorite, removeFavorite, setSortBy } = favoritesSlice.actions;