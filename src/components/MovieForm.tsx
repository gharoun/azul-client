import { FieldValues, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import Form from "./common/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";
import { Movie } from "../interfaces/interfaces";
const schema = z.object({
  title: z
    .string()
    .nonempty({ message: "username field is required" })
    .min(5, { message: "UserName should be at least 5 caracteres!" }),
  genre: z.string(),
  numberInStock: z.number(),
  dailyRentalRate: z.number(),
});
const MovieForm = () => {
  const navigate = useNavigate();
  const onSubmit = (data: FieldValues) => {
    saveMovie(data as Movie);
    navigate("/movies");
  };

  const params = useParams();
  const renderComponents = [
    { component: "input", render: "title", label: "Title" },
    {
      component: "select",
      render: "genre",
      label: "Genres",
      options: getGenres(),
    },
    {
      component: "input",
      render: "numberInStock",
      label: "Number In Stock",
      type: "number",
    },
    {
      component: "input",
      render: "dailyRentalRate",
      label: "Rate",
      type: "number",
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
