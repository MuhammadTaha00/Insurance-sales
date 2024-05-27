import React from "react";
import { render, screen } from "@testing-library/react";
import { Sale } from "../../types";
import userEvent from "@testing-library/user-event";
import SalesList from ".";

const user = userEvent.setup();

const onDeleteMock = jest.fn();
const onEditMock = jest.fn();

const sales: Sale[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    age: 30,
    product: "iPhone 12",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@gmail.com",
    age: 25,
    product: "Samsung Galaxy S21",
  },
];

describe("SalesList", () => {
  it("should render", () => {
    render(
      <SalesList sales={sales} onDelete={onDeleteMock} onEdit={onEditMock} />
    );

    expect(
      screen.getByRole("heading", { name: "Sales List" })
    ).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Check table headers
    expect(
      screen.getByRole("columnheader", { name: "First Name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Last Name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Age" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Product" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Actions" })
    ).toBeInTheDocument();

    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBe(sales.length + 1); // total rows including row with column headers
  });

  it("should render 'No data available' message", () => {
    render(
      <SalesList sales={[]} onDelete={onDeleteMock} onEdit={onEditMock} />
    );

    expect(
      screen.getByRole("heading", { name: "Sales List" })
    ).toBeInTheDocument();
    expect(screen.getByText("No data available")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("should call onDelete when delete button is clicked", async () => {
    render(
      <SalesList sales={sales} onDelete={onDeleteMock} onEdit={onEditMock} />
    );

    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    await user.click(deleteButtons[0]);

    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });

  it("should call onEdit when update button is clicked", async () => {
    render(
      <SalesList sales={sales} onDelete={onDeleteMock} onEdit={onEditMock} />
    );

    const updateButtons = screen.getAllByRole("button", { name: "Update" });
    await user.click(updateButtons[0]);

    expect(onEditMock).toHaveBeenCalledWith(sales[0]);
  });
});
