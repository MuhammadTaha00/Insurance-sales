import React from "react";

import { Sale } from "../../types";
import "./salesList.css";

interface SaleListProps {
  onDelete: (saleId: string) => void;
  onEdit: (sale: Sale) => void;
  sales: Sale[];
}

const SalesList: React.FC<SaleListProps> = ({ sales, onDelete, onEdit }) => {
  return (
    <div className="sales-list-container">
      <h2>Sales List</h2>
      {sales.length === 0 ? (
        <div className="no-data-container">
          <p>No data available</p>
        </div>
      ) : (
        <table className="sales-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Product</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.firstName}</td>
                <td>{sale.lastName}</td>
                <td>{sale.age}</td>
                <td>{sale.product}</td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => onEdit(sale)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDelete(sale.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesList;
