// src/data/Repository/SensorRepositoryImpl.js

import { SensorEntity } from "../../domain/Entities/SensorEntity";
import { SensorRemoteDataSource } from "../DataSource/dataSource";
import { sensorWebSocketDataSource } from "../DataSource/weesocket";

const fromApiToEntity = (sensorDataObject) => {
  // ... (sin cambios aquí)
  return new SensorEntity({
    id: sensorDataObject.id,
    machineId: sensorDataObject.id_maquina || sensorDataObject.machine_id,
    sensorType: sensorDataObject.tipo || sensorDataObject.sensor_type,
    value: sensorDataObject.valor_numerico || sensorDataObject.value_numeric,
    unit: sensorDataObject.unidad || sensorDataObject.unit,
    timestamp: sensorDataObject.timestamp,
  });
};

export class SensorRepositoryImpl {
  constructor() {
    this.httpDataSource = new SensorRemoteDataSource();
    this.webSocketDataSource = sensorWebSocketDataSource;
  }

  async getInitialSensorReadings() {
    console.log("[Repository] Obteniendo carga inicial de datos (HTTP)...");
    const apiDataList = await this.httpDataSource.getSensorReadings();
    if (Array.isArray(apiDataList)) {
      return apiDataList.map(fromApiToEntity);
    }
    return [];
  }

  subscribeToSensorReadings(onEntityReceived) {
    const handleApiData = (apiData) => {
      console.log("%c[Repository] Dato CRUDO recibido del WS:", "color: orange;", apiData);

      if (apiData && apiData.type === 'sensor_data' && apiData.data) {
        // --- CORRECCIÓN ---
        // Se corrigió el nombre de la función de "fromApiToTntity" a "fromApiToEntity"
        const entity = fromApiToEntity(apiData.data); 
        
        console.log("%c[Repository] Entidad transformada y lista para enviar al ViewModel:", "color: green;", entity);
        
        onEntityReceived(entity); // Ahora esta línea SÍ se ejecutará
      } else {
        console.warn("[Repository] Se recibió un dato WS con formato inesperado.", apiData);
      }
    };
    
    return this.webSocketDataSource.subscribeToData(handleApiData);
  }

  subscribeToConnectionStatus(onStatusChange) {
    if (typeof this.webSocketDataSource.subscribeToStatus === 'function') {
      return this.webSocketDataSource.subscribeToStatus(onStatusChange);
    }
    // Es buena práctica retornar una función vacía para evitar errores de "unsubscribe is not a function"
    return () => {}; 
  }
}