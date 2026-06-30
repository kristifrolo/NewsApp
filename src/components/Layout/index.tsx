import type { FC } from "react";
import { Link, Outlet } from "react-router";
import css from './styles.module.scss'
import { useFavoritesSync } from "../../hooks/useFavoritesSync";

export const Layout: FC = () => {
  useFavoritesSync();

  return (
    <div className={css.layout}>
      <header className={css.header}>
        <h1>Новости</h1>
        <ul className={css.navList}>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/addPost">Добавить новость</Link>
          </li>
          <li>
            <Link to="/favorites">Избранное</Link>
          </li>
          <li>
            <Link to="/gallery">Галерея</Link>
          </li>
          <li>
            <Link to="/about">О нас</Link>
          </li>
        </ul>
      </header>
      <div className={css.main}>
        <Outlet />
      </div>
    </div>
  )
}