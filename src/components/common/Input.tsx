import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  name: string;
  register: UseFormRegister<any>;
  label: string;
  type?: string;
  error?: any;
}

const Input = ({ register, name, label, type = "text", error }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
        type={type}
        className="form-control"
        id={name}
      />
      {error && <div className="alert alert-danger">{error?.message}</div>}
    </div>
  );
};

export default Input;
