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

  // Toma los últimos 30 puntos para el gráfico de línea para que no esté sobrecargado
  const lineChartData = data.slice(-30);

  const histogramTemperaturas = useMemo(() => data.map((d) => d.temperatura), [data]);

  const { minTemp, maxTemp } = useMemo(() => {
    if (histogramTemperaturas.length === 0) return { minTemp: 0, maxTemp: 0 };
    return {
      minTemp: Math.floor(Math.min(...histogramTemperaturas)),
      maxTemp: Math.ceil(Math.max(...histogramTemperaturas)),
    };
  }, [histogramTemperaturas]);

  const bins = useMemo(() => {
    if (histogramTemperaturas.length === 0) return [];
    const newBins = [];
    for (let i = minTemp; i <= maxTemp; i++) {
      newBins.push({ temperatura: i, count: 0 });
    }
    histogramTemperaturas.forEach((temp) => {
      const binIndex = Math.floor(temp) - minTemp;
      if (newBins[binIndex]) {
        newBins[binIndex].count++;
      }
    });
    return newBins;
  }, [histogramTemperaturas, minTemp, maxTemp]);

  const bayesCalculations = useMemo(() => {
    if (data.length === 0) return null;

    const total = data.length;
    const tieneTempAlta = (d) => d.temperatura > umbralTemperatura;
    const esDeZonaEvidencia = (d) => d.zona === zonaEvidencia;

    const contenedoresZona = data.filter(esDeZonaEvidencia);
    const contenedoresNoZona = data.filter(d => d.zona !== zonaEvidencia);
    
    const p_zona = contenedoresZona.length / total;
    const p_no_zona = 1 - p_zona;

    const zonaYTempAlta = contenedoresZona.filter(tieneTempAlta).length;
    const noZonaYTempAlta = contenedoresNoZona.filter(tieneTempAlta).length;

    const p_temp_alta_dado_zona = contenedoresZona.length > 0 ? zonaYTempAlta / contenedoresZona.length : 0;
    const p_temp_alta_dado_no_zona = contenedoresNoZona.length > 0 ? noZonaYTempAlta / contenedoresNoZona.length : 0;
    
    const numerador = p_temp_alta_dado_zona * p_zona;
    const denominador = (p_temp_alta_dado_zona * p_zona) + (p_temp_alta_dado_no_zona * p_no_zona);

    const probabilidadPosterior = denominador > 0 ? numerador / denominador : 0;

    return { probabilidadPosterior };
  }, [data, umbralTemperatura, zonaEvidencia]);


  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-xl">
      {/* Altura responsiva para el contenedor del gráfico */}
      <div className="h-[400px] sm:h-[450px]">
        <h4
          className="text-lg sm:text-xl font-bold mb-4 cursor-pointer"
          onClick={() => setShowHistogram(!showHistogram)}
        >
          Grafica {showHistogram ? "(Histograma)" : "(Línea)"} - Haz click para {showHistogram ? "ver línea" : "ver histograma"}
        </h4>

        <ResponsiveContainer width="100%" height="90%">
          {showHistogram ? (
            <BarChart data={bins} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="temperatura"
                label={{ value: "Temperatura (°C)", position: "insideBottom", offset: -15 }}
                type="number"
                domain={[minTemp, maxTemp]}
                // Se ajusta el tickCount para evitar superposición en pantallas pequeñas
                tickCount={10} 
                interval="preserveStartEnd"
                tick={{fontSize: 12}}
              />
              <YAxis
                label={{ value: "Frecuencia", angle: -90, position: "insideLeft" }}
                allowDecimals={false}
                tick={{fontSize: 12}}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          ) : (
            <LineChart data={lineChartData} margin={{ top: 20, right: 20, bottom: 25, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* Se añade un intervalo para que las etiquetas no se solapen en móvil */}
              <XAxis dataKey="id_contenedor" interval={4} tick={{fontSize: 12}} />
              <YAxis
                label={{ value: "°C", angle: -90, position: "insideLeft" }}
                domain={['auto', 32]}
                tickFormatter={(tick) => `${tick}°C`}
                tick={{fontSize: 12}}
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
                dot={{ r: 4 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {showHistogram && bayesCalculations && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-800 text-sm sm:text-base">
            Si un contenedor tiene una temperatura mayor a <strong>{umbralTemperatura}°C</strong>, la probabilidad de que sea de la <strong>{zonaEvidencia}</strong> es del:
          </p>
          {/* Tamaño de fuente responsivo */}
          <p className="font-bold text-xl sm:text-2xl text-blue-900 mt-2">
            {(bayesCalculations.probabilidadPosterior * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default TemperaturaChart;