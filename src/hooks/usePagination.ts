import { useState } from 'react';

export const usePagination = (initialPage = 1, limit = 10) => {
  const [page, setPage] = useState(initialPage);
  const nextPage = () => setPage(p => p + 1);
  const prevPage = () => setPage(p => Math.max(1, p - 1));
  const goToPage = (p: number) => setPage(p);
  return { page, limit, nextPage, prevPage, goToPage };
};
