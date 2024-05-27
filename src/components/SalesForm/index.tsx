import React, { useCallback, useEffect, useState } from "react";

import SelectInput from "../SelectInput";
import TextInput from "../TextInput";
import NumberInput from "../NumberInput";
import "./SalesForm.css";
import { Product, Sale } from "../../types";

interface SaleFormProps {
  sale?: Sale;
  products: Array<Product>;
  onSave?: (sale: Sale) => void;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const defaultData = {
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  product: "",
};

const InsuranceForm: React.FC<SaleFormProps> = ({ sale, products, onSave }) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<Sale>(defaultData);

  useEffect(() => {
    if (sale) {
      setFormData(sale);
    }
  }, [sale]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = useCallback(() => {
    let formErrors: FormErrors = {};
    if (!formData.firstName) formErrors.firstName = "First Name is required";
    if (!formData.lastName) formErrors.lastName = "Last Name is required";
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    if (!formData.age || formData.age < 18)
      formErrors.age = "Age should be >= 18";
    if (!formData.product) formErrors.product = "Product is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    [formData, setFormData]
  );

  const handleReset = useCallback(() => {
    setFormData(defaultData);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValid() && onSave) {
        onSave(formData);
        setFormData(defaultData);
      }
    },
    [formData, isValid, setFormData, onSave]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <TextInput
          name="firstName"
          onChange={handleChange}
          label="First name"
          value={formData.firstName}
          error={errors.firstName}
        />
        <TextInput
          name="lastName"
          onChange={handleChange}
          label="Last name"
          value={formData.lastName}
          error={errors.lastName}
        />
      </div>
      <div className="row">
        <TextInput
          name="email"
          onChange={handleChange}
          label="Email"
          value={formData.email}
          error={errors.email}
        />
      </div>
      <div className="row">
        <NumberInput
          name="age"
          onChange={handleChange}
          label="Age"
          value={formData.age}
          error={errors.age}
        />
        <SelectInput
          name="product"
          onChange={handleChange}
          label="Product"
          placeholder="Select a product"
          options={products}
          value={formData.product}
          error={errors.product}
        />
      </div>
      <div className="row">
        <div className="button-container">
          <button type="button" className="submit-button" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default InsuranceForm;
