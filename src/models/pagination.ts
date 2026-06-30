export interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}