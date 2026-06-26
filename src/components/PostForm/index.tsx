import { useState, type FC } from "react";
import css from './styles.module.scss'

interface IPostFormProps {
  onSubmit: (data: { title: string, body: string }) => void;
  isLoading: boolean;
}

export const PostForm: FC<IPostFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert('Заполните все поля');
      return;
    }

    onSubmit({ title: title.trim(), body: body.trim() });

    setTitle('');
    setBody('');
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.field}>
        <label htmlFor="title">Заголовок</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
          disabled={isLoading}
          className={css.input}
        />
      </div>
      <div className={css.field}>
        <label htmlFor="body">Текст новости</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Введите текст новости"
          disabled={isLoading}
          className={css.textarea}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={css.button}
      >
        {isLoading ? 'Создание...' : 'Создать'}
      </button>
    </form>
  )
}