// Ubicación: admin/data/Repository/SensorRepositoryImpl.js
import { SensorEntity } from "../../domain/Entities/SensorEntity";

// Mapper actualizado para incluir sensor_type
const fromApiToEntity = (apiObject) => {
  return new SensorEntity({
    id: apiObject.id,
    machineId: apiObject.machine_id,
    sensorType: apiObject.sensor_type, // <-- Mapeamos el nuevo campo
    value: apiObject.value_numeric,
    unit: apiObject.unit,
    timestamp: apiObject.timestamp,
  });
};

export class SensorRepositoryImpl {
  // ... el resto del archivo sigue igual
  constructor(remoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getSensorReadings() {
    const apiData = await this.remoteDataSource.getSensorReadings();
    return apiData.map(fromApiToEntity);
  }
}