import type { FC } from "react";
import css from './styles.module.scss'

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}

export const Pagination: FC<IPaginationProps> = ({
  totalPages,
  currentPage,
  onPageClick
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={css.pagination}>
      <button
        onClick={() => onPageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      {pages.map((page) => {
        return (
          <button 
            key={page} 
            onClick={() => onPageClick(page)}
            className={page === currentPage ? css.active : ''}
          >
            {page}
          </button>
        )
      })}
      <button
        onClick={() => onPageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  )
}