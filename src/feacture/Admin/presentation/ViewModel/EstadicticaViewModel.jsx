import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
// Importa los casos de uso existentes
import { UpdateContenedor } from '../../domain/UsesCases/UpdateContenedor';
import { GetContenedoresStatus } from '../../domain/UsesCases/GetContenedoresStatus';
// ========= IMPORTACIÓN AÑADIDA =========
// Importa el caso de uso que acabamos de crear.
import { DeleteContenedor } from '../../domain/UsesCases/DeleteContenedor'; 
// =======================================
import { ContenedorRepositoryImpl } from '../../data/Repository/ContenedorRepository';
import { ContenedorApiDataSource, productApiDataSource } from '../../data/DataSource/dataSource';

// --- Instanciación ---
const apiDataSource = new ContenedorApiDataSource();
const contenedorRepository = new ContenedorRepositoryImpl(apiDataSource);
const getContenedoresUseCase = new GetContenedoresStatus(contenedorRepository);
const updateContenedorUseCase = new UpdateContenedor(contenedorRepository);
// ========= INSTANCIACIÓN AÑADIDA =========
// Crea la instancia para el caso de uso de eliminar.
const deleteContenedorUseCase = new DeleteContenedor(contenedorRepository);
// =========================================


export function useContenedoresViewModel() {
  const [contenedores, setContenedores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
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


  // ========= LÓGICA DE BORRADO IMPLEMENTADA =========
  const deleteContainer = async (containerId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteContenedorUseCase.execute(containerId);
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
  // =================================================

  const refillContainer = async (contenedor, nuevaCantidad) => {
    try {
      await updateContenedorUseCase.execute({ contenedor, nuevaCantidad });
      Swal.fire(
        '¡Rellenado!',
        `El dispensador #${contenedor.id} ha sido actualizado.`,
        'success'
      );
      await loadData();
    } catch (e) {
      Swal.fire(
        'Error',
        'No se pudo actualizar el dispensador.',
        'error'
      );
      console.error("Error al rellenar el contenedor:", e);
    }
  };

  return { contenedores, products, loading, error, deleteContainer, refillContainer };
}