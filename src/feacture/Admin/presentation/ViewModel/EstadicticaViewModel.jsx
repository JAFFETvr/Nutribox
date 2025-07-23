import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
// Importa el nuevo caso de uso
import { UpdateContenedor } from '../../domain/UsesCases/UpdateContenedor';
import { GetContenedoresStatus } from '../../domain/UsesCases/GetContenedoresStatus';
import { ContenedorRepositoryImpl } from '../../data/Repository/ContenedorRepository';
import { ContenedorApiDataSource, productApiDataSource } from '../../data/DataSource/dataSource';

// --- Instanciación ---
const apiDataSource = new ContenedorApiDataSource();
const contenedorRepository = new ContenedorRepositoryImpl(apiDataSource);
const getContenedoresUseCase = new GetContenedoresStatus(contenedorRepository);
// Crea una instancia del nuevo caso de uso
const updateContenedorUseCase = new UpdateContenedor(contenedorRepository);


export function useContenedoresViewModel() {
  const [contenedores, setContenedores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      // No iniciamos el loading en recargas automáticas para una mejor UX
      // setLoading(true); 
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
      setLoading(false); // Solo se ejecuta la primera vez
    }
  }, []);

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 30000);
    return () => clearInterval(intervalId);
  }, [loadData]);

  const deleteContainer = async (containerId) => {
    // ... (código existente sin cambios)
  };

  // ========= NUEVA FUNCIÓN AÑADIDA =========
  const refillContainer = async (contenedor, nuevaCantidad) => {
    try {
      await updateContenedorUseCase.execute({ contenedor, nuevaCantidad });
      Swal.fire(
        '¡Rellenado!',
        `El dispensador #${contenedor.id} ha sido actualizado.`,
        'success'
      );
      // Recargamos los datos para reflejar el cambio en la UI
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
  // ==========================================

  return { contenedores, products, loading, error, deleteContainer, refillContainer };
}