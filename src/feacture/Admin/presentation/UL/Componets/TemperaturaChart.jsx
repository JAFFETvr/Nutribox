import React, { useState, useMemo } from "react";
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

const TemperaturaChart = ({ data, umbralTemperatura, zonaEvidencia }) => {
  // --- Estado para alternar gráficos ---
  const [showHistogram, setShowHistogram] = useState(false);

  // --- Cálculos para los gráficos (Promedio, Moda, Bins del Histograma) ---
  const temperaturas = data.map((d) => d.temperatura);

  const avgTemp =
    temperaturas.length > 0
      ? temperaturas.reduce((acc, cur) => acc + cur, 0) / temperaturas.length
      : 0;

  const modeTemp = useMemo(() => {
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
  }, [temperaturas]);

  const { minTemp, maxTemp } = useMemo(() => {
    if (temperaturas.length === 0) return { minTemp: 0, maxTemp: 0 };
    return {
      minTemp: Math.floor(Math.min(...temperaturas)),
      maxTemp: Math.ceil(Math.max(...temperaturas)),
    };
  }, [temperaturas]);

  const bins = useMemo(() => {
    if (temperaturas.length === 0) return [];
    const newBins = [];
    for (let i = minTemp; i <= maxTemp; i++) {
      newBins.push({ temperatura: i, count: 0 });
    }
    temperaturas.forEach((temp) => {
      const binIndex = Math.floor(temp) - minTemp;
      if (newBins[binIndex]) {
        newBins[binIndex].count++;
      }
    });
    return newBins;
  }, [temperaturas, minTemp, maxTemp]);
  
  // --- LÓGICA DEL TEOREMA DE BAYES ---
  const bayesCalculations = useMemo(() => {
    // Solo se calcula si se reciben los datos y parámetros necesarios.
    if (!umbralTemperatura || !zonaEvidencia || data.length === 0) {
      return null;
    }
    const totalContenedores = data.length;
    const contenedoresTempAlta = data.filter(d => d.temperatura > umbralTemperatura);
    const pA = contenedoresTempAlta.length / totalContenedores;
    const contenedoresEnZonaEvidencia = data.filter(d => d.zona === zonaEvidencia);
    const pB = contenedoresEnZonaEvidencia.length / totalContenedores;
    const contenedoresTempAltaYEnZona = contenedoresTempAlta.filter(d => d.zona === zonaEvidencia);
    const pB_dado_A = contenedoresTempAlta.length > 0 ? contenedoresTempAltaYEnZona.length / contenedoresTempAlta.length : 0;
      
    // Aplicación del Teorema de Bayes: P(A|B) = (P(B|A) * P(A)) / P(B)
    const pA_dado_B = pB > 0 ? (pB_dado_A * pA) / pB : 0;

    return { pA_dado_B };
  }, [data, umbralTemperatura, zonaEvidencia]);

  // --- RENDERIZACIÓN DEL COMPONENTE ---
  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-xl">
      <div className="h-[450px]">
        <h4
          className="text-xl font-bold mb-4 cursor-pointer"
          onClick={() => setShowHistogram(!showHistogram)}
        >
          Grafica {showHistogram ? "(Histograma)" : "(Línea)"} - Haz click para{" "}
          {showHistogram ? "ver línea" : "ver histograma"}
        </h4>
        <ResponsiveContainer width="100%" height="90%">
          {showHistogram ? (
            <BarChart data={bins} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="temperatura" label={{ value: "Temperatura (°C)", position: "insideBottom", offset: -15 }} type="number" domain={[minTemp, maxTemp]} tickCount={maxTemp - minTemp + 1} />
              <YAxis label={{ value: "Frecuencia", angle: -90, position: "insideLeft" }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id_contenedor" />
              <YAxis label={{ value: "°C", angle: -90, position: "insideLeft" }} domain={["auto", (dataMax) => Math.max(dataMax, avgTemp) * 1.1]} />
              <Tooltip formatter={(value) => `${value.toFixed(2)} °C`} labelFormatter={(label) => `Contenedor: ${label}`} />
              <Line type="monotone" dataKey="temperatura" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
              <ReferenceLine y={avgTemp} stroke="red" strokeDasharray="3 3" label={{ value: `Promedio: ${avgTemp.toFixed(2)} °C`, position: "insideTopLeft", fill: "red", dy: 15, dx: 15 }} />
              {modeTemp !== null && (
                <ReferenceLine y={modeTemp} stroke="green" strokeDasharray="3 3" label={{ value: `Moda: ${modeTemp.toFixed(2)} °C`, position: "insideTopRight", fill: "green", dy: 15, dx: -15 }} />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Condición: Muestra el resultado de Bayes solo con el histograma */}
      {showHistogram && bayesCalculations && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-800 text-base">
            Si un contenedor es de la <strong>{zonaEvidencia}</strong>, la probabilidad de que su temperatura sea mayor a <strong>{umbralTemperatura}°C</strong> es del:
          </p>
          <p className="font-bold text-2xl text-blue-900 mt-2">
            {(bayesCalculations.pA_dado_B * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default TemperaturaChart;