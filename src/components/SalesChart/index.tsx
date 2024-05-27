import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { Sale } from "../../types";
import "./SalesChart.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface SalesChartProps {
  sales: Sale[];
}

interface AccumulatorType {
  name: string;
  value: number;
}

const SalesChart: React.FC<SalesChartProps> = ({ sales }) => {
  const data = sales.reduce((acc: AccumulatorType[], sale) => {
    const product = acc.find(
      (item: AccumulatorType) => item.name === sale.product
    );
    if (product) {
      product.value += 1;
    } else {
      acc.push({ name: sale.product, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="chart">
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name }) => name}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry: AccumulatorType, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;
