import { useState, useEffect } from 'react';
import { GetContenedoresStatus } from '../../domain/UsesCases/GetContenedoresStatus';
import { ContenedorRepositoryImpl } from '../../data/Repository/ContenedorRepository';
import { ContenedorApiDataSource } from '../../data/DataSource/dataSource';

const apiDataSource = new ContenedorApiDataSource();
const contenedorRepository = new ContenedorRepositoryImpl(apiDataSource);
const getContenedoresUseCase = new GetContenedoresStatus(contenedorRepository);

export function useContenedoresViewModel() {
  const [contenedores, setContenedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContenedores = async () => {
      try {
        setLoading(true);
        // El ViewModel simplemente ejecuta el caso de uso ya configurado
        const data = await getContenedoresUseCase.execute();
        setContenedores(data);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContenedores();
  }, []);

  return { contenedores, loading, error };
}