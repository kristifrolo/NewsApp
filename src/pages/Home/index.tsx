import { type FC } from "react"
import { PostsList } from "../../components/PostsList";
import css from './styles.module.scss'

export const Home: FC = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Последние новости</h1>
      <PostsList />
    </div>
  )
}