import { fetchContenedores } from "../../data/DataSource/dataSource";

export const getTemperaturasPorContenedor = async () => {
  const contenedores = await fetchContenedores();

  const temperaturas = contenedores
    .filter(c => c.sensor_type === 'temperatura')
    .map(c => ({
      id_contenedor: c.machine_id,       
      temperatura: c.value_numeric       
    }));

  return temperaturas;
};
