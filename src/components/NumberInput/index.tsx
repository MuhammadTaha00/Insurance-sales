import React from "react";

import "./NumberInput.css";

interface TextInputProps {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  name: string;
  label: string;
  value: number;
  error?: string;
}

const NumberInput: React.FC<TextInputProps> = ({
  onChange,
  name,
  label,
  value,
  error,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default NumberInput;
