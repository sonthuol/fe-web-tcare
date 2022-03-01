import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import "./style.css";
export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div className="chart">
      <h4 className="chartTitle">{title}</h4>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#555" />
          <Line type="monotone" dataKey={dataKey} stroke="#555" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e3e3eb" strokeDasharray="5 5" />}
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
