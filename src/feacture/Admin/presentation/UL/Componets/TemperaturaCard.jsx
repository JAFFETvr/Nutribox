import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
  Cell,
} from "recharts";
import { MdShowChart, MdBarChart, MdTrendingDown, MdPerson } from "react-icons/md";

const UltrasonicoChart = ({ data }) => {
  const umbralPresencia = 20;
  const limitedData = data.slice(-30);
  const distancias = limitedData.map(d => d.distancia);

  const calcularMedia = arr =>
    arr.reduce((acc, val) => acc + val, 0) / arr.length;

  const calcularMediana = arr => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  };

  const calcularDesviacion = arr => {
    const media = calcularMedia(arr);
    const varianza = arr.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / arr.length;
    return Math.sqrt(varianza);
  };

  const media = calcularMedia(distancias).toFixed(2);
  const mediana = calcularMediana(distancias).toFixed(2);
  const desviacion = calcularDesviacion(distancias).toFixed(2);
  const presencias = distancias.filter(d => d < umbralPresencia);
  const probabilidadPresencia = ((presencias.length / distancias.length) * 100).toFixed(2);

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">Lecturas Ultrasónicas (últimas {limitedData.length})</h2>
      <div className="text-sm text-gray-700 space-y-1">
        <p className="flex items-center gap-2"><MdShowChart className="text-blue-500" /> <strong>Media:</strong> {media} cm</p>
        <p className="flex items-center gap-2"><MdBarChart className="text-purple-500" /> <strong>Mediana:</strong> {mediana} cm</p>
        <p className="flex items-center gap-2"><MdTrendingDown className="text-orange-500" /> <strong>Desviación estándar:</strong> {desviacion} cm</p>
        <p className="flex items-center gap-2"><MdPerson className="text-green-600" /> <strong>Probabilidad de presencia (&lt; {umbralPresencia} cm):</strong> {probabilidadPresencia}%</p>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={limitedData}
            margin={{ top: 10, right: 30, left: 60, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              label={{ value: "Distancia (cm)", position: "insideBottom", offset: -5 }}
              domain={["auto", "auto"]}
            />
            <YAxis
              dataKey="timestamp"
              type="category"
              width={80}
              tick={{ fontSize: 9 }}
              interval={0}
            />
            <Tooltip
              formatter={(value) => `${value} cm`}
              labelFormatter={(label) => `Hora: ${label}`}
            />
            <ReferenceLine
              x={umbralPresencia}
              stroke="red"
              strokeDasharray="3 3"
              label={`Umbral (${umbralPresencia} cm)`}
            />
            <Bar dataKey="distancia">
              {limitedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.distancia < umbralPresencia ? "#e53935" : "#4CAF50"}
                />
              ))}
              <LabelList dataKey="distancia" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UltrasonicoChart;
