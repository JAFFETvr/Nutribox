import { useState, useEffect, useCallback } from 'react';

import { ProductRepositoryImpl } from '../../data/Repository/repository';
import { GetProductsUseCase } from '../../domain/UsesCases/GetProductsUseCase';
import { AddProductUseCase } from '../../domain/UsesCases/AddProductUseCase';
import { DeleteProductUseCase } from '../../domain/UsesCases/DeleteProductUseCase';
import { UpdateProductUseCase } from '../../domain/UsesCases/UpdateProductUseCase';

const productRepository = new ProductRepositoryImpl();
const getProductsUseCase = new GetProductsUseCase();
const addProductUseCase = new AddProductUseCase();
const deleteProductUseCase = new DeleteProductUseCase();
const updateProductUseCase = new UpdateProductUseCase();

export const useInventoryViewModel = () => {
  // --- Estados del componente ---
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // --- Lógica de Carga de Productos ---
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedProducts = await getProductsUseCase.execute(productRepository);
      setProducts(fetchedProducts);
    } catch (e) {
      setError('Error: No se pudieron cargar los productos.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efecto que carga los productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // --- Funciones CRUD (expuestas a la UI) ---
  const addProduct = async (productData) => {
    try {
      await addProductUseCase.execute(productData, productRepository);
      closeModal();
      await loadProducts(); // Recargar para ver el nuevo producto
    } catch (e) {
      console.error("Fallo al añadir el producto", e);
      alert(`Error al añadir el producto: ${e.message}`);
    }
  };
  
  const deleteProduct = async (productId) => {
    // Log para depurar
    console.log(`%c[ViewModel] Función deleteProduct llamada con ID: ${productId}`, 'color: orange; font-weight: bold;');
    try {
      await deleteProductUseCase.execute(productId, productRepository);
      // Log para depurar
      console.log('%c[ViewModel] Eliminación exitosa (según la API). Recargando productos...', 'color: orange; font-weight: bold;');
      await loadProducts(); // Recargar para que el producto desaparezca de la UI
    } catch (e) {
      console.error("Fallo al eliminar el producto", e);
      alert("Error al eliminar el producto.");
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      await updateProductUseCase.execute(productId, productData, productRepository);
      closeModal();
      await loadProducts(); // Recargar para ver los cambios
    } catch (e) {
      console.error("Fallo al actualizar el producto", e);
      alert(`Error al actualizar el producto: ${e.message}`);
    }
  };

  // --- Lógica del Modal ---
  const openModal = (product = null) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null); // Limpiar estado de edición al cerrar
  };

  // --- Objeto devuelto por el Hook ---
  return {
    products,
    isLoading,
    error,
    isModalOpen,
    productToEdit,
    openModal,
    closeModal,
    addProduct,
    deleteProduct,
    updateProduct,
  };
};