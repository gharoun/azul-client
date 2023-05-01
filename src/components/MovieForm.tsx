import { FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Form from "./common/Form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { Movie, MovieFormSubmitType } from "../interfaces/interfaces";
import { useEffect, useState } from "react";
const schema = z.object({
  title: z
    .string()
    .nonempty({ message: "username field is required" })
    .min(5, { message: "UserName should be at least 5 caracteres!" }),
  genreId: z.string(),
  numberInStock: z.number(),
  dailyRentalRate: z.number(),
});
const MovieForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<MovieFormSubmitType>({
    _id: "",
    title: "",
    genreId: "",
    numberInStock: 0,
    dailyRentalRate: 0,
  });
  useEffect(() => {
    const movieId = params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return navigate("/not-found");

    setData({
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    });
  }, []);
  const onSubmit = (movie: MovieFormSubmitType) => {
    movie._id = data._id;
    console.log(movie);
    saveMovie(movie as Movie);
    navigate("/");
  };
  const renderComponents = [
    { component: "input", render: "title", label: "Title", value: data.title },
    {
      component: "select",
      render: "genreId",
      label: "Genres",
      options: getGenres(),
      value: data.genreId,
    },
    {
      component: "input",
      render: "numberInStock",
      label: "Number In Stock",
      type: "number",
      value: data.numberInStock,
    },
    {
      component: "input",
      render: "dailyRentalRate",
      label: "Rate",
      type: "number",
      value: data.dailyRentalRate,
    },
  ];

  return (
    <div>
      <h1>MovieForm </h1>

      <Form
        schema={schema}
        onSubmit={onSubmit}
        renderComponents={renderComponents}
        submitButton="save"
      />
    </div>
  );
};

export default MovieForm;
