import React from "react";

import "./SelectInput.css";
import { Product } from "../../types";

interface SelectInputProps {
  value: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  name: string;
  label: string;
  options: Array<Product>;
  placeholder: string;
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  name,
  label,
  options,
  placeholder,
  error,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <select id="product" name="product" value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map(({ id, value, label }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default SelectInput;
