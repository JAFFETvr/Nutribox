import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { GetContenedoresStatus } from '../../domain/UsesCases/GetContenedoresStatus';
import { ContenedorRepositoryImpl } from '../../data/Repository/ContenedorRepository';
import { ContenedorApiDataSource, productApiDataSource } from '../../data/DataSource/dataSource';

const apiDataSource = new ContenedorApiDataSource();
const contenedorRepository = new ContenedorRepositoryImpl(apiDataSource);
const getContenedoresUseCase = new GetContenedoresStatus(contenedorRepository);

export function useContenedoresViewModel() {
  const [contenedores, setContenedores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [contenedoresData, productsData] = await Promise.all([
        getContenedoresUseCase.execute(),
        productApiDataSource.getProducts()
      ]);
      setContenedores(contenedoresData);
      setProducts(productsData);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 30000);
    return () => clearInterval(intervalId);
  }, [loadData]);

  const deleteContainer = async (containerId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, ¡elimínalo!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await apiDataSource.deleteContainer(containerId);
        Swal.fire(
          '¡Eliminado!',
          'El dispensador ha sido eliminado.',
          'success'
        );
        await loadData();
      } catch (e) {
        Swal.fire(
          'Error',
          'No se pudo eliminar el dispensador.',
          'error'
        );
        console.error("Error al eliminar el contenedor:", e);
      }
    }
  };

  return { contenedores, products, loading, error, deleteContainer };
}