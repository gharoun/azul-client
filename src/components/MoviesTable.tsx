import Like from "./common/Like";
import { Movie, Pagination, SortColumn } from "../interfaces/interfaces";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";
interface Props {
  movies: Pagination;
  onDelete: (movie: Movie) => void;
  onLike: (movie: Movie) => void;
  onSort: (path: SortColumn) => void;
  sortColumn: SortColumn;
}
const MoviesTable = ({
  movies,
  onDelete,
  onLike,
  sortColumn,
  onSort,
}: Props) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: "",
      label: "",
      key: "like",
      content: (movie: Movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
    {
      path: "",
      label: "",
      key: "delete",
      content: (movie: Movie) => (
        <button className="btn btn-danger" onClick={() => onDelete(movie)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={movies} columns={columns} />
    </table>
  );
};

export default MoviesTable;
