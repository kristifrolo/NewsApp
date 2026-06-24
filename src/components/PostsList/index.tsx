import { useEffect, type FC } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPosts } from "../../store/reducers/ActionCreators";
import css from './styles.module.scss'

export const PostsList: FC = () => {
  const dispatch = useAppDispatch();
  const {posts, isLoading, error} = useAppSelector(state => state.postsReducer);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])

  if (isLoading) return <div className={css.loading}>Загрузка...</div>

  if (error) return <div className={css.error}>Ошибка: {error}</div>

  if (posts.length === 0) return <div>Новостей нет.</div>

  return (
    <div className={css.list}>
      {posts.map((post) => {
        return (
          <div key={post.id} className={css.item}>
            <h2 className={css.title}>{post.title}</h2>
            <p className={css.body}>{post.body}</p>
          </div>
        )
      })}
    </div>
  )
}