import { useState, useEffect, useMemo } from 'react';
// Importamos todo lo necesario
import { GetSensorDashboardDataUseCase } from '../../domain/UsesCases/GetSensorDashboardDataUseCase';
import { SensorRepositoryImpl } from '../../data/Repository/SensorRepositoryImpl';
import { SensorRemoteDataSource, productApiDataSource } from '../../data/DataSource/dataSource';

export const useVentasViewModel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para datos de ingresos
  const [dashboardData, setDashboardData] = useState({
    coinCounts: {}, totalIncome: 0, ventasPorDia: [],
  });
  // Nuevo estado para datos de ventas de productos
  const [productSales, setProductSales] = useState({
    topSold: [], leastSold: [],
  });

  const getSensorDashboardDataUseCase = useMemo(() => {
    const dataSource = new SensorRemoteDataSource();
    const repository = new SensorRepositoryImpl(dataSource);
    return new GetSensorDashboardDataUseCase(repository);
  }, []);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);
        
        // Obtenemos todos los datos en paralelo
        const [incomeData, productos, ventas] = await Promise.all([
          getSensorDashboardDataUseCase.execute(),
          productApiDataSource.getProducts(),
          productApiDataSource.getSales()
        ]);

        // Procesamos datos de ingresos
        setDashboardData(incomeData);

        // --- Lógica de procesamiento de ventas de productos (movida desde el componente) ---
        const productMap = new Map(productos.map(p => [p.id, p.nombre]));
        const salesFrequency = new Map();
        ventas.forEach(venta => {
          const currentCount = salesFrequency.get(venta.id_producto) || 0;
          salesFrequency.set(venta.id_producto, currentCount + 1);
        });

        const frequencyData = [];
        salesFrequency.forEach((count, id_producto) => {
          const nombre = productMap.get(id_producto);
          if (nombre) {
            frequencyData.push({ id: id_producto, nombre, count });
          }
        });

        const topSelling = [...frequencyData].sort((a, b) => b.count - a.count);
        
        const soldProductIds = new Set(frequencyData.map(p => p.id));
        const unsoldProducts = productos
            .filter(p => !soldProductIds.has(p.id))
            .map(p => ({ id: p.id, nombre: p.nombre, count: 0 }));

        const leastSelling = [...frequencyData, ...unsoldProducts].sort((a, b) => a.count - b.count);
        
        setProductSales({ topSold: topSelling, leastSold: leastSelling });
        // --- Fin de la lógica de procesamiento ---

      } catch (e) {
        setError('No se pudieron cargar los datos.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAllData();
  }, [getSensorDashboardDataUseCase]);

  return {
    isLoading,
    error,
    // Datos de ingresos
    totalIncome: dashboardData.totalIncome,
    ventasPorDia: dashboardData.ventasPorDia,
    // Nuevos datos de productos
    productSales,
  };
};