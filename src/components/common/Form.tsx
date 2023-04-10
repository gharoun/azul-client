import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import { ZodType, z } from "zod";

interface Props {
  schema: ZodType;
  onSubmit: (value: FieldValues) => void;
  inputs: string[];
}

const Form = ({ schema, onSubmit, inputs }: Props) => {
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const renderInput = (name: FormData, label: string) => {
    return (
      <Input
        register={register}
        name={name}
        label={label}
        error={errors[name]}
      />
    );
  };
  function capitalizeFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <div key={input}>
            {renderInput(input, capitalizeFirstLetter(input))}
          </div>
        ))}
        <button className={`btn btn-primary ${!isValid ? "disabled" : ""}`}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;
