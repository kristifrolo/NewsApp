export const getPageCount = (totalCount: number, limit: number) => {
  const pageCount = Math.ceil(totalCount / limit);
  return pageCount;
}