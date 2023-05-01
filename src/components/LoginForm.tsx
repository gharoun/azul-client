import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./common/Input";
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
type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const onSubmit = (data: FieldValues) => {
    console.log("gaya", data);
  };

  const renderComponents = [
    { component: "input", render: "username", label: "Username" },
    {
      component: "input",
      render: "password",
      label: "Password",
      type: "password",
    },
  ];
  return (
    <div>
      <h1>LoginForm</h1>
      <Form
        schema={schema}
        onSubmit={onSubmit}
        renderComponents={renderComponents}
        submitButton="Login"
      />
    </div>
  );
};

export default LoginForm;
