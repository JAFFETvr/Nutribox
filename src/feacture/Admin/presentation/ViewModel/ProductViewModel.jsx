import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';

import { ProductRepositoryImpl } from '../../data/Repository/repository';
import { GetProductsUseCase } from '../../domain/UsesCases/GetProductsUseCase';
import { AddProductUseCase } from '../../domain/UsesCases/AddProductUseCase';
import { DeleteProductUseCase } from '../../domain/UsesCases/DeleteProductUseCase';
import { UpdateProductUseCase } from '../../domain/UsesCases/UpdateProductUseCase';

import { ContenedorApiDataSource } from '../../data/DataSource/dataSource';
import { showCreateContainerModal } from '../UL/Componets/CreateContainerModal';

const productRepository = new ProductRepositoryImpl();
const getProductsUseCase = new GetProductsUseCase();
const addProductUseCase = new AddProductUseCase();
const deleteProductUseCase = new DeleteProductUseCase();
const updateProductUseCase = new UpdateProductUseCase();

const contenedorDataSource = new ContenedorApiDataSource();

export const useInventoryViewModel = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

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

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = async (productData) => {
    try {
      await addProductUseCase.execute(productData, productRepository);
      closeModal();
      await loadProducts();
    } catch (e) {
      console.error("Fallo al añadir el producto", e);
      alert(`Error al añadir el producto: ${e.message}`);
    }
  };
  
  const addProductAndCreateContainer = async (productData) => {
    try {
      // --- LA VALIDACIÓN SE HACE AQUÍ, DESPUÉS DE LA CONFIRMACIÓN DEL PRIMER MODAL ---
      closeModal(); // Primero cerramos el modal de producto para que la UI se sienta fluida.

      const existingContainers = await contenedorDataSource.getContenedores();
      const fruitContainersCount = existingContainers.filter(c => c.tipo === 'fruta').length;
      const juiceContainersCount = existingContainers.filter(c => c.tipo === 'jugo').length;

      if (productData.tipo === 'fruta' && fruitContainersCount >= 2) {
        return Swal.fire({ // Usamos return para asegurar que el flujo se detiene
          icon: 'error',
          title: 'Límite Alcanzado',
          text: 'Ya existen 2 dispensadores de fruta. No se puede crear un nuevo producto de este tipo.'
        });
      }

      if (productData.tipo === 'jugo' && juiceContainersCount >= 2) {
        return Swal.fire({ // Usamos return para asegurar que el flujo se detiene
          icon: 'error',
          title: 'Límite Alcanzado',
          text: 'Ya existen 2 dispensadores de jugo. No se puede crear un nuevo producto de este tipo.'
        });
      }

      // Si la validación pasa, AHORA sí creamos el producto.
      const newProductFromAPI = await addProductUseCase.execute(productData, productRepository);
      
      const completeNewProduct = {
        ...newProductFromAPI,
        tipo: productData.tipo
      };

      await Swal.fire({
        icon: 'success',
        title: '¡Producto Creado!',
        text: `El producto "${completeNewProduct.nombre}" se ha añadido. Ahora, configura su dispensador.`,
        timer: 2500,
        showConfirmButton: false
      });

      const result = await showCreateContainerModal(completeNewProduct);
      
      if (result.isConfirmed) {
        const containerData = result.value;
        await contenedorDataSource.createContainer(containerData);
        await Swal.fire(
          '¡Operación Completa!',
          `Se ha creado un nuevo dispensador y se ha asignado al producto.`,
          'success'
        );
      } else {
        await Swal.fire(
            'Producto Creado sin Dispensador',
            'El producto se ha creado, pero no se le asignó un dispensador.',
            'info'
        );
      }
      await loadProducts();
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('%c[API Error] Detalles del error 422 del backend:', 'color: red; font-weight: bold;', error.response.data);
        const errorDetails = JSON.stringify(error.response.data, null, 2);
        Swal.fire({
          icon: 'error',
          title: 'Error de Validación (422)',
          html: `<pre style="text-align: left; background-color: #f3f4f6; padding: 1rem; border-radius: 8px;">${errorDetails}</pre>`,
        });
      } else {
        const errorMessage = error.message || 'Ocurrió un error.';
        Swal.fire({
          icon: 'error',
          title: 'Error en el Proceso',
          text: errorMessage
        });
      }
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteProductUseCase.execute(productId, productRepository);
      await loadProducts();
    } catch (e) {
      console.error("Fallo al eliminar el producto", e);
      alert("Error al eliminar el producto.");
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      await updateProductUseCase.execute(productId, productData, productRepository);
      closeModal();
      await loadProducts();
    } catch (e) {
      console.error("Fallo al actualizar el producto", e);
      alert(`Error al actualizar el producto: ${e.message}`);
    }
  };

  // La función openModal no se toca, debe funcionar como siempre.
  const openModal = (product = null) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

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
    addProductAndCreateContainer,
  };
};