import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FormData } from "../LoginForm";

interface Props {
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  label: string;
  type: string;
  error: FieldErrors<FormData>;
}

const Input = ({ register, name, label, type, error }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
        type={type}
        className="form-control"
        id={name}
      />
      {error.username && (
        <p className="text-danger">{error.username.message}</p>
      )}
      {error.password && (
        <p className="text-danger">{error.password.message}</p>
      )}
    </div>
  );
};

export default Input;
