import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Product, Sale } from "../types";

interface UseSalesResult {
  products: Product[];
  sales: Sale[];
  saveSale: (entry: Sale) => void;
  deleteSale: (id: string) => void;
}

const useSales = (): UseSalesResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    fetch("/devices.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.devices);
      });
  }, []);

  const addSale = (payload) => {
    setSales([...sales, { id: uuidv4(), ...payload }]);
  };

  const updateSale = (updatedSale: Sale) => {
    const updatedSales = sales.map((sale) =>
      sale.id === updatedSale.id ? updatedSale : sale
    );
    setSales(updatedSales);
  };

  const saveSale = (sale: Sale) => {
    if ("id" in sale) {
      updateSale(sale as Sale);
    } else {
      addSale(sale);
    }
  };

  const deleteSale = (id: string) => {
    const updatedSales = sales.filter((sale) => sale.id !== id);
    setSales(updatedSales);
  };

  return { products, sales, saveSale, deleteSale };
};

export default useSales;
