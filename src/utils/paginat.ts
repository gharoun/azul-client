import { Movie, Pagination } from "../interfaces/interfaces";

function paginate(
  items: Movie[],
  currentPage: number,
  itemsPerPage: number
): Pagination {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    items: paginatedItems,
  };
}
export default paginate;
