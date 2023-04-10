import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import { ZodType, z } from "zod";
import Select from "./Select";
import Button from "./Button";

interface Field {
  component: string;
  render: string;
  label: string;
  options?: any;
}
interface Props {
  schema: ZodType;
  onSubmit: (value: FieldValues) => void;
  renderComponents: Field[];
}

const Form = ({ schema, onSubmit, renderComponents }: Props) => {
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

  const renderSelect = (name: FormData, label: string, option: any) => {
    return (
      <Select
        register={register}
        name={name}
        label={label}
        error={errors[name]}
        options={option}
      />
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderComponents.map((component) => (
          <div key={component.render}>
            {component.component === "input"
              ? renderInput(component.render, component.label)
              : renderSelect(
                  component.render,
                  component.label,
                  component.options
                )}
          </div>
        ))}
        <Button isValid={isValid} label={"Login"} />
      </form>
    </div>
  );
};

export default Form;
