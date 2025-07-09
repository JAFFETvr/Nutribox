import { useEffect, useState } from 'react';
import { getTemperaturasPorContenedor } from '../../domain/UsesCases/get';
import { getLecturasUltrasonico } from '../../domain/UsesCases/getDistanciasUltrasonico.JSX';

export const useContenedoresViewModel = () => {
  const [data, setData] = useState([]);
  const [ultrasonicoData, setUltrasonicoData] = useState([]);

  useEffect(() => {
    getTemperaturasPorContenedor()
      .then(setData)
      .catch(err => console.error('Error:', err));

    getLecturasUltrasonico()
      .then(setUltrasonicoData)
      .catch(err => console.error('Error cargando datos ultrasónico:', err));
  }, []);

  return { data, ultrasonicoData };
};
