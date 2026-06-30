import type { IFavoritePost } from "../models/favorites";

const STORAGE_KEY = 'favorites';

export const loadFavoritePostsFromStorage = (): IFavoritePost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as IFavoritePost[];
  } catch (err) {
    console.error('Ошибка загрузки избранного:', err);
    return [];
  }
}

export const saveFavoritePostsToStorage = (favoritePosts: IFavoritePost[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritePosts));
  } catch (err) {
    console.error('Ошибка сохранения избранного:', err);
  }
}