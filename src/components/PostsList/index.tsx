import { useEffect, useState, type FC } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPosts } from "../../store/reducers/ActionCreators";
import css from './styles.module.scss'
import { Pagination } from "../Pagination";
import { setCurrentPage, setSearchQuery } from "../../store/reducers/PostsSlice";
import { useDebounce } from "../../hooks/useDebounce";

export const PostsList: FC = () => {
  const dispatch = useAppDispatch();
  const {posts, isLoading, error, totalPages, currentPage, searchQuery} = useAppSelector(state => state.postsReducer);
  
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 500);

  const handleSearch = (query: string) => {
    setLocalSearch(query);
  }

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(fetchPosts({ 
      page: currentPage,
      limit: 10,
      searchQuery: searchQuery, 
    }));
  }, [dispatch, currentPage, searchQuery])

  return (
    <div>
      <div className={css.searchWrapper}>
        <input
          type="text"
          placeholder="Поиск..."
          value={localSearch}
          onChange={e => handleSearch(e.target.value)}
          className={css.searchInput}
        />
      </div>
      {isLoading && <div className={css.loading}>Загрузка...</div>}
      {error && <div className={css.error}>Ошибка: {error}</div>}
      {!isLoading && !error && (
        posts.length === 0 ? (
          <div className={css.empty}>
            {searchQuery ? 'Ничего не найдено' : 'Новостей нет'}
          </div>
        ) : (
          <>
            <div className={css.list}>
              {posts.map((post) => (
                <div key={post.id} className={css.item}>
                  <h2 className={css.title}>{post.title}</h2>
                  <p className={css.body}>{post.body}</p>
                </div>
              ))}
            </div>
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageClick={handlePageChange} 
            />
          </>
        )
      )}
    </div>
  )
}