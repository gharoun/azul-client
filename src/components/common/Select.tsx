import { UseFormRegister } from "react-hook-form";
import { Genre } from "../../interfaces/interfaces";
interface Field {
  _id: string;
  name: string;
}

interface Props {
  name: string;
  register: UseFormRegister<any>;
  label: string;
  type?: string;
  error?: any;
  options: Field[];
}

const Select = ({ register, name, label, error, options }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <select {...register(name)} className="form-control" id={name}>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error?.message}</div>}
    </div>
  );
};

export default Select;
