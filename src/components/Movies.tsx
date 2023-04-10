import { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import _ from "lodash";
import Pagnination from "./common/Pagnination";
import { Genre, Movie } from "../interfaces/interfaces";
import paginate from "../utils/paginat";
import ListGroup from "./common/ListGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";
import { SortColumn } from "../interfaces/interfaces";
import { Link } from "react-router-dom";
const movies = () => {
  const [dataMovies, setDataMovies] = useState<{
    movies: Movie[];
    genres: Genre[];
    currentPage: number;
    pageSize: number;
  }>({
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  });
  const [dataGenres, setDataGenres] = useState<{
    genres: Genre[];
    selectedGenres: Genre | null;
  }>({
    genres: [],
    selectedGenres: null,
  });
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "",
    order: false,
  });
  useEffect(() => {
    setDataMovies({ ...dataMovies, movies: getMovies() });
    const newGenres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setDataGenres({ ...dataGenres, genres: newGenres });
  }, []);

  const handleDelete = (movie: Movie) => {
    setDataMovies({
      ...dataMovies,
      movies: dataMovies.movies.filter((m) => m._id !== movie._id),
    });
  };

  const handleLike = (movie: Movie) => {
    const movies = [...dataMovies.movies];
    const index = movies.findIndex((m) => m._id === movie._id);
    movies[index].liked = !movies[index].liked;
    setDataMovies({ ...dataMovies, movies: movies });
  };
  const handleGenreSelect = (genre: Genre) => {
    setDataGenres({ ...dataGenres, selectedGenres: genre });
    setDataMovies({ ...dataMovies, currentPage: 1 });
  };
  const handleSort = (sortColum: SortColumn) => {
    setSortColumn(sortColum);
  };

  const { movies, currentPage, pageSize } = dataMovies;
  const getPagedData = () => {
    const filtered =
      dataGenres.selectedGenres && dataGenres.selectedGenres._id
        ? movies.filter((m) => m.genre._id === dataGenres.selectedGenres?._id)
        : movies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const AllMovies = paginate(sorted as Movie[], currentPage, pageSize);
    return { data: AllMovies, totalCount: filtered.length };
  };

  const { data: allMovies, totalCount } = getPagedData();
  if (movies.length === 0) return <p>There are no movies in the Database</p>;

  return (
    <div className="d-flex flex-row gap-4">
      <ListGroup
        items={dataGenres.genres}
        onItemSelect={handleGenreSelect}
        itemSelected={dataGenres.selectedGenres}
      />
      <div className="flex-fill">
        <Link
          to="movies/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          Add Movie
        </Link>
        <p>Showing {totalCount} movies in the database.</p>
        <MoviesTable
          movies={allMovies}
          onLike={handleLike}
          onDelete={handleDelete}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <Pagnination
          movies={allMovies}
          onClick={(page) =>
            setDataMovies({ ...dataMovies, currentPage: page })
          }
        />
      </div>
    </div>
  );
};

export default movies;
