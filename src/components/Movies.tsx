import { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import _ from "lodash";
import Pagnination from "../common/Pagnination";
import { Genre, Movie } from "../interfaces/interfaces";
import paginate from "../utils/paginat";
import ListGroup from "./ListGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./MoviesTable";

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
  const [sortColumn, setSortColumn] = useState<{
    path: string;
    order: boolean | "asc" | "desc";
  }>({
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
  const handleSort = (path: string) => {
    setSortColumn({ path: path, order: "asc" });
  };
  const { movies, currentPage, pageSize } = dataMovies;

  const filtred =
    dataGenres.selectedGenres && dataGenres.selectedGenres._id
      ? movies.filter((m) => m.genre._id === dataGenres.selectedGenres?._id)
      : movies;
  const sorted = _.orderBy(filtred, [sortColumn.path], [sortColumn.order]);
  const AllMovies = paginate(sorted as Movie[], currentPage, pageSize);

  if (movies.length === 0) return <p>There are no movies in the Database</p>;

  return (
    <div className="d-flex flex-row gap-4">
      <ListGroup
        items={dataGenres.genres}
        onItemSelect={handleGenreSelect}
        itemSelected={dataGenres.selectedGenres}
      />
      <div className="flex-fill">
        <p>Showing {filtred.length} movies in the database.</p>
        <MoviesTable
          movies={AllMovies}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagnination
          movies={AllMovies}
          onClick={(page) =>
            setDataMovies({ ...dataMovies, currentPage: page })
          }
        />
      </div>
    </div>
  );
};

export default movies;
