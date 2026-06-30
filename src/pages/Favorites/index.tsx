import { useMemo, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeFavorite, setSortBy } from "../../store/reducers/FavoritesSlice";
import css from './styles.module.scss'

export const Favorites: FC = () => {
  const dispatch = useAppDispatch();
  const { favoritePosts, sortBy } = useAppSelector((state) => state.favoritesReducer);
  const sortedFavoritePost = useMemo(() => {
    const sorted = [...favoritePosts];

    if (sortBy === 'date') {
      sorted.sort((a, b) => 
        new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      );
    } else if (sortBy === 'title') {
      sorted.sort((a, b) => 
        a.post.title.localeCompare(b.post.title, 'en')
      );
    }

    return sorted;
  }, [favoritePosts, sortBy]);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Избранное ({favoritePosts.length})</h1>
        
        {favoritePosts.length > 0 && (
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as 'date' | 'title'))}
            className={css.sortSelect}
          >
            <option value='date'>По дате добавления</option>
            <option value='title'>По названию</option>
          </select>
        )}
      </div>
      
      {favoritePosts.length === 0 ? (
        <div className={css.empty}>
          В избранном пока ничего нет
        </div>
      ) : (
        <div className={css.list}>
          {sortedFavoritePost.map((favorite) => (
            <div key={favorite.post.id} className={css.item}>
              <h2 className={css.itemTitle}>{favorite.post.title}</h2>
              <p className={css.itemBody}>{favorite.post.body}</p>
              <div className={css.itemMeta}>
                Добавлено: {new Date(favorite.addedAt).toLocaleString('ru-RU')}
              </div>
              <button 
                onClick={() => dispatch(removeFavorite(favorite.post.id))}
                className={css.removeButton}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}