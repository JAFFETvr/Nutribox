import { useState, useEffect } from 'react';
import { SensorRepositoryImpl } from '../../data/Repository/SensorRepositoryImpl';
const sensorRepository = new SensorRepositoryImpl();
const MAX_TEMP_RECORDS = 30;

export const useContenedoresViewModel = () => {
  const [data, setData] = useState([]); 
  const [ultrasonicoData, setUltrasonicoData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isLoading, setIsLoading] = useState(true);

  const processInitialData = (initialEntities) => {
    const initialTempReadings = initialEntities
      .filter(entity => entity.sensorType && entity.sensorType.toLowerCase() === 'temperatura')
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const last30Readings = initialTempReadings.slice(0, MAX_TEMP_RECORDS);

    const formattedInitialData = last30Readings.map(entity => ({
      id_contenedor: entity.machineId,
      temperatura: entity.value,
      timestamp: new Date(entity.timestamp).toLocaleTimeString(),
    })).reverse();

    setData(formattedInitialData);

    const initialUltrasonicData = initialEntities
        .filter(entity => entity.sensorType && entity.sensorType.toLowerCase() === 'ultrasonico')
        .slice(-50)
        .map(entity => ({
            timestamp: new Date(entity.timestamp).toLocaleTimeString(),
            distancia: entity.value
        }));
    setUltrasonicoData(initialUltrasonicData);
  };

  const updateDataWithNewEntity = (sensorEntity) => {
    // --- LOG PARA CONFIRMAR QUE LA ENTIDAD LLEGÓ AL VIEWMODEL ---
    console.log("[ViewModel] Recibida nueva entidad para actualizar:", sensorEntity);
    
    if (!sensorEntity || !sensorEntity.sensorType) return;
    
    const sensorType = sensorEntity.sensorType.toLowerCase();

    if (sensorType === 'temperatura') {
      const newTempReading = {
        id_contenedor: sensorEntity.machineId,
        temperatura: sensorEntity.value,
        timestamp: new Date(sensorEntity.timestamp).toLocaleTimeString(),
      };
      
      setData(prevData => {
        const updatedData = [...prevData, newTempReading];
        if (updatedData.length > MAX_TEMP_RECORDS) {
          return updatedData.slice(1);
        }
        return updatedData;
      });
    } 
    else if (sensorType === 'ultrasonico') {
      const newReading = {
        timestamp: new Date(sensorEntity.timestamp).toLocaleTimeString(),
        distancia: sensorEntity.value,
      };
      // Aquí usamos una ventana deslizante para ultrasónico también, manteniendo los últimos 50
      setUltrasonicoData(prev => [...prev.slice(1), newReading]);
    }
  };


  useEffect(() => {
    let unsubscribeFromData;
    let unsubscribeFromStatus;

    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const initialEntities = await sensorRepository.getInitialSensorReadings();
        processInitialData(initialEntities);
        console.log(`[ViewModel] Carga inicial completada.`);
      } catch (error) {
        console.error("[ViewModel] Falló la carga inicial:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();

    unsubscribeFromData = sensorRepository.subscribeToSensorReadings(updateDataWithNewEntity);
    unsubscribeFromStatus = sensorRepository.subscribeToConnectionStatus(setConnectionStatus);

    return () => {
      if (typeof unsubscribeFromData === 'function') unsubscribeFromData();
      if (typeof unsubscribeFromStatus === 'function') unsubscribeFromStatus();
    };
  }, []);

  return { data, ultrasonicoData, connectionStatus, isLoading };
};