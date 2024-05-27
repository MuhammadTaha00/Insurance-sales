import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SalesForm from ".";
import { Product, Sale } from "../../types";

const user = userEvent.setup();

const salesToEdit: Sale = {
  id: "53e75c9d-f87f-4063-9db3-3fdc850d5e59",
  firstName: "Jhon",
  lastName: "Doe",
  email: "jhon.doe@gmail.com",
  age: 32,
  product: "samsung_galaxy_s21-12206",
};

const products: Product[] = [
  {
    id: "1",
    label: "Oppo Find N3",
    value: "oppo_find_n3-12205",
  },
  {
    id: "2",
    label: "Samsung Galaxy S21",
    value: "samsung_galaxy_s21-12206",
  },
];

const onSave = jest.fn();

describe("SalesForm", () => {
  it("should render", () => {
    // arrange
    render(<SalesForm products={products} />);

    // assert
    expect(
      screen.getByRole("textbox", { name: "First name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Last name" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "Age" })).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Product" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should submit", async () => {
    render(<SalesForm products={products} onSave={onSave} />);
    await user.type(
      screen.getByRole("textbox", { name: "First name" }),
      "John"
    );
    await user.type(screen.getByRole("textbox", { name: "Last name" }), "Wick");
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "john.wick@entertainer.com"
    );
    await user.type(screen.getByRole("spinbutton", { name: "Age" }), "33");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Product" }),
      "Samsung Galaxy S21"
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSave).toHaveBeenCalled();
    expect(onSave).toHaveBeenLastCalledWith({
      firstName: "John",
      lastName: "Wick",
      email: "john.wick@entertainer.com",
      product: "samsung_galaxy_s21-12206",
      age: "33",
    });
  });

  it("should not submit when form is empty", async () => {
    const onSave = jest.fn();
    render(<SalesForm products={products} onSave={onSave} />);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText("First Name is required")).toBeInTheDocument();
    expect(screen.getByText("Last Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Age should be >= 18")).toBeInTheDocument();
    expect(screen.getByText("Product is required")).toBeInTheDocument();
  });

  it("should not submit when email is not valid", async () => {
    const onSave = jest.fn();
    render(<SalesForm products={products} onSave={onSave} />);
    await user.type(
      screen.getByRole("textbox", { name: "First name" }),
      "John"
    );
    await user.type(screen.getByRole("textbox", { name: "Last name" }), "Wick");
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "john.wickentertainer.com"
    );
    await user.type(screen.getByRole("spinbutton", { name: "Age" }), "19");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Product" }),
      "Samsung Galaxy S21"
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  });

  it("should not submit when age is less then 18", async () => {
    const onSave = jest.fn();
    render(<SalesForm products={products} onSave={onSave} />);
    await user.type(
      screen.getByRole("textbox", { name: "First name" }),
      "John"
    );
    await user.type(screen.getByRole("textbox", { name: "Last name" }), "Wick");
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "john.wick@entertainer.com"
    );
    await user.type(screen.getByRole("spinbutton", { name: "Age" }), "16");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Product" }),
      "Samsung Galaxy S21"
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText("Age should be >= 18")).toBeInTheDocument();
  });

  it("should update existing sale", async () => {
    render(
      <SalesForm products={products} sale={salesToEdit} onSave={onSave} />
    );

    expect(screen.getByRole("textbox", { name: "First name" })).toHaveValue(
      salesToEdit.firstName
    );
    expect(screen.getByRole("textbox", { name: "Last name" })).toHaveValue(
      salesToEdit.lastName
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveValue(
      salesToEdit.email
    );
    expect(screen.getByRole("spinbutton", { name: "Age" })).toHaveValue(
      salesToEdit.age
    );
    expect(screen.getByRole("combobox", { name: "Product" })).toHaveValue(
      salesToEdit.product
    );

    await user.clear(screen.getByRole("textbox", { name: "First name" }));
    await user.type(
      screen.getByRole("textbox", { name: "First name" }),
      "Dave"
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSave).toHaveBeenCalledWith({
      ...salesToEdit,
      firstName: "Dave",
    });
  });

  it("should reset form when reset button clicked", async () => {
    render(<SalesForm products={products} sale={salesToEdit} />);

    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByRole("textbox", { name: "First name" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Last name" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveValue("");
    expect(screen.getByRole("spinbutton", { name: "Age" })).toHaveValue(0);
    expect(screen.getByRole("combobox", { name: "Product" })).toHaveValue("");
  });
});
