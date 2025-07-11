import { useState, useEffect } from 'react';
import { GetAllProducts } from '../../domain/UsesCases/GetAllProducts';
import { JugosRepositoryImpl } from '../../data/Reporsitory/ProductRepositoryImpl';

export const useProductsViewModel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const repository = new JugosRepositoryImpl();
        const getAll = new GetAllProducts(repository);
        const result = await getAll.execute();
        setProducts(result);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading };
};