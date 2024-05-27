import React, { useState } from "react";

import useSales from "./hooks/useSales";
import SalesForm from "./components/SalesForm";
import SalesChart from "./components/SalesChart";
import SalesList from "./components/SalesList";
import Section from "./components/Section";
import { Sale } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [saleToUpdate, setSaleToUpdate] = useState<Sale | undefined>();
  const { sales, products, saveSale, deleteSale } = useSales();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Insurance Sales Dashboard</h1>
      </header>
      <div className="content-container">
        <div className="form-container">
          <Section title="Insurance Form">
            <SalesForm
              sale={saleToUpdate}
              products={products}
              onSave={saveSale}
            />
          </Section>
        </div>
        <div className="chart-container">
          <Section title="Visualization">
            <SalesChart sales={sales} />
          </Section>
        </div>
      </div>
      <div className="list-container">
        <SalesList
          sales={sales}
          onEdit={(sale) => setSaleToUpdate(sale)}
          onDelete={deleteSale}
        />
      </div>
    </div>
  );
};

export default App;
