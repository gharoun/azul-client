import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import { ZodType, z } from "zod";
import Select from "./Select";
import Button from "./Button";
import { useEffect } from "react";

interface Field {
  component: string;
  render: string;
  label: string;
  value?: string | number;
  type?: string;
  options?: any;
}
interface Props {
  schema: ZodType;
  onSubmit: (value: any) => void;
  renderComponents: Field[];
  submitButton: string;
}

const Form = ({ schema, onSubmit, renderComponents, submitButton }: Props) => {
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });
  console.log(errors);
  useEffect(() => {
    renderComponents.forEach(({ render, value }) => {
      setValue(render, value ?? ""); // set default value to empty string if value is undefined
    });
  }, [renderComponents, setValue]);

  const renderInput = (name: string, label: string, type?: string) => {
    return (
      <Input
        register={register}
        name={name}
        label={label}
        error={errors[name]}
        type={type}
      />
    );
  };

  const renderSelect = (name: string, label: string, option: any) => {
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
            {(() => {
              switch (component.component) {
                case "input":
                  return renderInput(
                    component.render,
                    component.label,
                    component.type
                  );
                case "select":
                  return renderSelect(
                    component.render,
                    component.label,
                    component.options
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ))}
        <Button isValid={isValid} label={submitButton} />
      </form>
    </div>
  );
};

export default Form;
