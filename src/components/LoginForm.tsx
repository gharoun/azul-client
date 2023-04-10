import { z } from "zod";
import { FieldValues } from "react-hook-form";

import Form from "./common/Form";
const schema = z.object({
  username: z
    .string()
    .nonempty({ message: "username field is required" })
    .min(5, { message: "UserName should be at least 5 caracteres!" }),
  password: z
    .string()
    .nonempty({ message: "password field is required" })
    .min(5, { message: "Password should be at least 5 caracteres!" }),
});
const LoginForm = () => {
  const onSubmit = (data: FieldValues) => {
    console.log("gaya", data);
  };

  const inputs = ["username", "password"];
  return (
    <div>
      <h1>Login</h1>
      <Form schema={schema} onSubmit={onSubmit} inputs={inputs} />
    </div>
  );
};

export default LoginForm;
