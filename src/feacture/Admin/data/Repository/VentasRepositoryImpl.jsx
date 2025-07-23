// src/data/Repository/SensorRepositoryImpl.js

import { SensorEntity } from "../../domain/Entities/SensorEntity";
// Ya no es necesario importar los DataSources aquí si los recibimos en el constructor.

const fromApiToEntity = (sensorDataObject) => {
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
  // --- CORRECCIÓN 1: El constructor ahora recibe sus dependencias ---
  // Esto hace que la clase sea más flexible y fácil de probar (testing).
  constructor(httpDataSource, webSocketDataSource) {
    this.httpDataSource = httpDataSource;
    this.webSocketDataSource = webSocketDataSource;
  }

  // --- CORRECCIÓN 2: El método ahora coincide con el nombre que busca el Caso de Uso ---
  async getSensorReadings() {
    console.log("[Repository] Obteniendo carga de datos (HTTP)...");
    const apiDataList = await this.httpDataSource.getSensorReadings(); // Usamos la dependencia inyectada
    if (Array.isArray(apiDataList)) {
      return apiDataList.map(fromApiToEntity);
    }
    return [];
  }

  subscribeToSensorReadings(onEntityReceived) {
    const handleApiData = (apiData) => {
      if (apiData?.type === 'sensor_data' && apiData.data) {
        const entity = fromApiToEntity(apiData.data);
        onEntityReceived(entity);
      }
    };
    return this.webSocketDataSource.subscribeToData(handleApiData);
  }

  subscribeToConnectionStatus(onStatusChange) {
    if (typeof this.webSocketDataSource.subscribeToStatus === 'function') {
      return this.webSocketDataSource.subscribeToStatus(onStatusChange);
    }
    return () => {};
  }
}