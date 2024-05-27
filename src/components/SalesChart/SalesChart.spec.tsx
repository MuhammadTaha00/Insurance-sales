import React from "react";
import { render, screen } from "@testing-library/react";
import { Sale } from "../../types";
import SalesChart from ".";

jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  PieChart: () => <div>Pie Chart</div>,
}));

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

describe("SalesChart", () => {
  it("should render", () => {
    // arrange
    render(<SalesChart sales={sales} />);

    // assert
    expect(screen.getByText("Pie Chart")).toBeInTheDocument();
  });

  it("should render 'No data available' message", () => {
    // arrange
    render(<SalesChart sales={[]} />);

    // assert
    expect(screen.getByText("No data available")).toBeInTheDocument();
    expect(screen.queryByText("Pie Chart")).not.toBeInTheDocument();
  });
});
