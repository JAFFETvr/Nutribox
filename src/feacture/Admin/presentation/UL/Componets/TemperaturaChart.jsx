import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const TemperaturaChart = ({ data, umbralTemperatura = 30, zonaEvidencia = "Zona Caliente" }) => {
  const [showHistogram, setShowHistogram] = useState(false);

  const lineChartData = useMemo(() => data.slice(-30), [data]);

  const bayesCalculations = useMemo(() => {
    if (!lineChartData || lineChartData.length === 0) return null;

    const total = lineChartData.length;
    const tieneTempAlta = d => d.temperatura > umbralTemperatura;
    const esDeZona = d => d.zona === zonaEvidencia;

    const zona = lineChartData.filter(esDeZona);
    const noZona = lineChartData.filter(d => !esDeZona(d));
    const zonaYAlta = zona.filter(tieneTempAlta).length;
    const noZonaYAlta = noZona.filter(tieneTempAlta).length;

    const pZona = zona.length / total;
    const pNoZona = 1 - pZona;
    const pAltaDadoZona = zona.length ? zonaYAlta / zona.length : 0;
    const pAltaDadoNoZona = noZona.length ? noZonaYAlta / noZona.length : 0;

    const numerador = pAltaDadoZona * pZona;
    const denominador = numerador + (pAltaDadoNoZona * pNoZona);

    const resultado = denominador ? numerador / denominador : 0;

    return { probabilidadPosterior: resultado };
  }, [lineChartData, umbralTemperatura, zonaEvidencia]);

  const histogramTemperaturas = useMemo(() => lineChartData.map(d => d.temperatura), [lineChartData]);
  const min = Math.floor(Math.min(...histogramTemperaturas));
  const max = Math.ceil(Math.max(...histogramTemperaturas));

  const bins = useMemo(() => {
    const r = Array.from({ length: max - min + 1 }, (_, i) => ({
      temperatura: min + i,
      count: 0,
    }));
    lineChartData.forEach(d => {
      const index = Math.floor(d.temperatura) - min;
      if (r[index]) r[index].count++;
    });
    return r;
  }, [lineChartData]);

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-xl">
      <div className="h-[450px]">
        <h4
          className="text-xl font-bold mb-4 cursor-pointer"
          onClick={() => setShowHistogram(!showHistogram)}
        >
          Gráfica {showHistogram ? "(Histograma)" : "(Línea)"} - haz click para {showHistogram ? "ver línea" : "ver histograma"}
        </h4>

        <ResponsiveContainer width="100%" height="90%">
          {showHistogram ? (
            <BarChart data={bins}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="temperatura" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          ) : (
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id_contenedor" tick={false} />
              <YAxis domain={["auto", 32]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperatura"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {showHistogram && bayesCalculations && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-800 text-base">
            Si un contenedor tiene temperatura mayor a <strong>{umbralTemperatura}°C</strong>, la probabilidad de que sea de <strong>{zonaEvidencia}</strong> es:
          </p>
          <p className="font-bold text-2xl text-blue-900 mt-2">
            {(bayesCalculations.probabilidadPosterior * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default TemperaturaChart;
