import React from "react";
interface Props {
  isValid: boolean;
  label: string;
}
const Button = ({ isValid, label }: Props) => {
  return (
    <button className={`btn btn-primary ${!isValid ? "disabled" : ""}`}>
      {label}
    </button>
  );
};

export default Button;
