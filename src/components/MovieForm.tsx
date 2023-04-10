import { FieldValues, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import Form from "./common/Form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    { component: "input", render: "numberInStock", label: "Number In Stock" },
    { component: "input", render: "dailyRentalRate", label: "Rate" },
  ];

  return (
    <div>
      <h1>MovieForm </h1>

      <Form
        schema={schema}
        onSubmit={onSubmit}
        renderComponents={renderComponents}
      />
    </div>
  );
};

export default MovieForm;
