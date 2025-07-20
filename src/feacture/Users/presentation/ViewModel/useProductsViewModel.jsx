import { useState, useEffect } from 'react';
import { DispenseProduct } from '../../domain/UsesCases/Dispensar';
import { JugosRepositoryImpl } from '../../data/Reporsitory/ProductRepositoryImpl';
import Swal from 'sweetalert2';

export const useProductsViewModel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0.00);

  useEffect(() => {
    const loadData = async () => {
      try {
        const repository = new JugosRepositoryImpl();
        const [productsData, balanceData] = await Promise.all([
          repository.getAll(),
          repository.getBalance()
        ]);
        setProducts(productsData);
        setBalance(balanceData.balance);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDispense = async (productId, amountToDispense, price) => {
    if (balance < price) {
      Swal.fire({
        title: 'Saldo Insuficiente',
        text: `Tu saldo de $${balance.toFixed(2)} no es suficiente para esta compra de $${price.toFixed(2)}.`,
        icon: 'error',
        confirmButtonColor: '#d33'
      });
      return false;
    }

    try {
      const repository = new JugosRepositoryImpl();
      const dispenseUseCase = new DispenseProduct(repository);
      
      const payload = {
        id_maquina: 1,
        id_producto: productId,
        cantidad_dispensada: amountToDispense,
      };

      await dispenseUseCase.execute(payload);
      setBalance(prevBalance => prevBalance - price);
      return true;
    } catch (error) {
      console.error("Error en la dispensación:", error);
      Swal.fire({
        title: 'Error de la Máquina',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#d33'
      });
      return false;
    }
  };

  return { products, loading, balance, handleDispense };
};