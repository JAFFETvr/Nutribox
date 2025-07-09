import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
} from "recharts";

const TemperaturaChart = ({ data }) => {
  const [showHistogram, setShowHistogram] = useState(false);

  const temperaturas = data.map((d) => d.temperatura);

  const avgTemp =
    temperaturas.length > 0
      ? temperaturas.reduce((acc, cur) => acc + cur, 0) / temperaturas.length
      : 0;

  const modeTemp = (() => {
    if (temperaturas.length === 0) return null;

    const frequencyMap = temperaturas.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    let mode = null;
    let maxCount = 0;

    for (const temp in frequencyMap) {
      if (frequencyMap[temp] > maxCount) {
        maxCount = frequencyMap[temp];
        mode = parseFloat(temp);
      }
    }
    return mode;
  })();

  const minTemp = temperaturas.length > 0 ? Math.floor(Math.min(...temperaturas)) : 0;
  const maxTemp = temperaturas.length > 0 ? Math.ceil(Math.max(...temperaturas)) : 0;

  const bins = [];
  if (temperaturas.length > 0) {
    for (let i = minTemp; i <= maxTemp; i++) {
      bins.push({ temperatura: i, count: 0 });
    }

    temperaturas.forEach((temp) => {
      const binIndex = Math.floor(temp) - minTemp;
      if (bins[binIndex]) {
        bins[binIndex].count++;
      }
    });
  }

  return (
    <div className="w-full h-[450px] p-4 bg-white shadow-lg rounded-xl">
      <h4
        className="text-xl font-bold mb-4 cursor-pointer"
        onClick={() => setShowHistogram(!showHistogram)}
      >
        Grafica {showHistogram ? "(Histograma)" : "(Línea)"} - Haz click para{" "}
        {showHistogram ? "ver línea" : "ver histograma"}
      </h4>

      <ResponsiveContainer width="100%" height="90%">
        {showHistogram ? (
          <BarChart
            data={bins}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="temperatura"
              label={{ value: "Temperatura (°C)", position: "insideBottom", offset: -15 }}
              type="number"
              domain={[minTemp, maxTemp]}
              tickCount={maxTemp - minTemp + 1}
            />
            <YAxis
              label={{ value: "Frecuencia", angle: -90, position: "insideLeft" }}
              allowDecimals={false}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id_contenedor" />
            <YAxis
              label={{ value: "°C", angle: -90, position: "insideLeft" }}
              domain={["auto", (dataMax) => Math.max(dataMax, avgTemp) * 1.1]}
            />
            <Tooltip
              formatter={(value) => `${value.toFixed(2)} °C`}
              labelFormatter={(label) => `Contenedor: ${label}`}
            />
            
            <Line
              type="monotone"
              dataKey="temperatura"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />

            <ReferenceLine
              y={avgTemp}
              stroke="red"
              strokeDasharray="3 3"
              label={{
                value: `Promedio: ${avgTemp.toFixed(2)} °C`,
                position: "insideTopLeft",
                fill: "red",
                dy: 15, 
                dx: 15, 
              }}
            />

            {modeTemp !== null && (
              <ReferenceLine
                y={modeTemp}
                stroke="green"
                strokeDasharray="3 3"
                label={{
                  value: `Moda: ${modeTemp.toFixed(2)} °C`,
                  position: "insideTopRight",
                  fill: "green",
                  dy: 15, 
                  dx: -15, 
                }}
              />
            )}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TemperaturaChart;