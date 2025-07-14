// admin/presentation/ViewModel/useSensorDashboardViewModel.js
import { useState, useEffect, useMemo } from 'react';
import { GetSensorDashboardDataUseCase } from '../../domain/UsesCases/GetSensorDashboardDataUseCase';
import { SensorRepositoryImpl } from '../../data/Repository/SensorRepositoryImpl';
import { SensorRemoteDataSource } from '../../data/DataSource/dataSource';

export const useVentasViewModel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // CAMBIO CLAVE: El estado inicial ahora espera un total, no transacciones.
  const [dashboardData, setDashboardData] = useState({ coinCounts: {}, totalIncome: 0 });

  const getSensorDashboardDataUseCase = useMemo(() => {
    const dataSource = new SensorRemoteDataSource();
    const repository = new SensorRepositoryImpl(dataSource);
    return new GetSensorDashboardDataUseCase(repository);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getSensorDashboardDataUseCase.execute();
        setDashboardData(data);
      } catch (e) {
        setError('No se pudieron cargar los datos.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [getSensorDashboardDataUseCase]);

  // CAMBIO CLAVE: Retornamos totalIncome en lugar de transactions.
  return {
    isLoading,
    error,
    coinCounts: dashboardData.coinCounts,
    totalIncome: dashboardData.totalIncome,
  };
};