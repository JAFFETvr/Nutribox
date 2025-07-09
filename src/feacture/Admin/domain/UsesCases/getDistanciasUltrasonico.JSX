import { fetchContenedores } from "../../data/DataSource/dataSource";

export const getLecturasUltrasonico = async () => {
  const sensores = await fetchContenedores();

  return sensores
    .filter(s => s.sensor_type === "ultrasonico")
    .map(s => ({
      timestamp: new Date(s.timestamp).toLocaleTimeString(),
      distancia: s.value_numeric,
    }));
};
