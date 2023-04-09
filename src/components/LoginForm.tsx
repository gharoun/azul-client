import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./common/Input";
const schema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
});
export type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log("gaya", data);
  };

  return (
    <div>
      <h1>LoginForm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="username"
          type="text"
          label="Username"
          error={errors}
        />

        <Input
          register={register}
          name="password"
          type="password"
          label="Password"
          error={errors}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
