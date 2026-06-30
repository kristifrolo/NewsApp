import { useEffect } from "react";
import { useAppSelector } from "./redux"
import { saveFavoritePostsToStorage } from "../utils/favoritePostsStorage";

export const useFavoritesSync = () => {
  const favoritePosts = useAppSelector(state => state.favoritesReducer.favoritePosts);

  useEffect(() => {
    saveFavoritePostsToStorage(favoritePosts);
  }, [favoritePosts]);
}