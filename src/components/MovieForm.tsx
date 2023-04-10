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
type FormData = z.infer<typeof schema>;
const MovieForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    saveMovie(data as Movie);
    navigate("/movies");
  };

  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>MovieForm </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            type="text"
            className="form-control"
            id="title"
          />
          {errors.title && (
            <div className="alert alert-danger">{errors.title.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="genre">Genres</label>
          <select {...register("genre")} className="form-control" id="genre">
            <option value="action">action</option>
            <option value="action">trealer</option>
            <option value="action">threaler</option>
          </select>
          {errors.genre && (
            <div className="alert alert-danger">{errors.genre.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="numberInStock">Number in Stock</label>
          <input
            {...register("numberInStock", { valueAsNumber: true })}
            type="number"
            className="form-control"
            id="numberInStock"
          />
          {errors.numberInStock && (
            <div className="alert alert-danger">
              {errors.numberInStock.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="dailyRentalRate">Rate</label>
          <input
            {...register("dailyRentalRate", { valueAsNumber: true })}
            type="number"
            className="form-control"
            id="dailyRentalRate"
          />
          {errors.dailyRentalRate && (
            <div className="alert alert-danger">
              {errors.dailyRentalRate.message}
            </div>
          )}
        </div>

        <button className={`btn btn-primary ${!isValid ? "disabled" : ""}`}>
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
