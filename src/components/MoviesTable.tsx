import Like from "../common/Like";
import { Movie, Pagination } from "../interfaces/interfaces";

interface Props {
  movies: Pagination;
  onDelete: (movie: Movie) => void;
  onLike: (movie: Movie) => void;
  onSort: (path: string) => void;
}
const MoviesTable = ({ movies, onDelete, onLike, onSort }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.items.map((movie) => (
          <tr key={movie._id}>
            <th>{movie.title}</th>
            <th>{movie.genre.name}</th>
            <th>{movie.numberInStock}</th>
            <th>{movie.dailyRentalRate}</th>
            <th>
              <Like liked={movie.liked} onClick={() => onLike(movie)} />
            </th>
            <th>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
