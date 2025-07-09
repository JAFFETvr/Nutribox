import { useEffect, useState } from 'react';
import { getTemperaturasPorContenedor } from '../../domain/UsesCases/get';
export const useContenedoresViewModel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTemperaturasPorContenedor()
      .then(setData)
      .catch(err => console.error('Error:', err));
  }, []);

  return { data };
};
