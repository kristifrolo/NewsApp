import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router";
import { addPost } from "../../store/reducers/ActionCreators";
import { PostForm } from "../../components/PostForm";
import css from './styles.module.scss';
import { setCurrentPage } from "../../store/reducers/PostsSlice";

export const AddPost: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isCreating, error } = useAppSelector(state => state.postsReducer);

  const handleSubmit = async (data: { title: string; body: string }) => {
    try {
      const newPost = await dispatch(addPost({
        title: data.title,
        body: data.body,
        userId: 1,
      })).unwrap();
      console.log(`Новый пост: ${newPost}`);

      dispatch(setCurrentPage(1));
      navigate('/');
    } catch (err) {
      alert('Ошибка при создании новости');
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Создать новость</h1>
      {error && <div className={css.error}>Ошибка: {error}</div>}
      <PostForm onSubmit={handleSubmit} isLoading={isCreating} />
    </div>
  )
}