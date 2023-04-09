import Like from "./common/Like";
import { Movie, Pagination, SortColumn } from "../interfaces/interfaces";
import Table from "./common/Table";
import { Link } from "react-router-dom";
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
    {
      path: "title",
      label: "Title",
      content: (movie: Movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
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
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      data={movies}
    />
  );
};

export default MoviesTable;
