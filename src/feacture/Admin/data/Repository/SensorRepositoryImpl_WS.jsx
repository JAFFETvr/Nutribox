import { SensorEntity } from "../../domain/Entities/SensorEntity";

const fromApiToEntity = (apiObject) => {
  return new SensorEntity({
    id: apiObject.id,
    machineId: apiObject.machine_id,
    sensorType: apiObject.sensor_type,
    value: apiObject.value_numeric,
    unit: apiObject.unit,
    timestamp: apiObject.timestamp,
  });
};

export class SensorRepositoryImpl_WS {
  constructor(webSocketDataSource) {
    this.webSocketDataSource = webSocketDataSource;
    this.webSocketDataSource.connect();
  }

  subscribeToSensorReadings(onDataReceived) {
    const mappingCallback = (apiData) => {
        if (Array.isArray(apiData)) {
            const entities = apiData.map(fromApiToEntity);
            onDataReceived(entities);
        } else if (apiData && typeof apiData === 'object') {
            const entity = fromApiToEntity(apiData);
            onDataReceived(entity);
        }
    };
    
    this.webSocketDataSource.subscribe(mappingCallback);

    return () => {
      this.webSocketDataSource.unsubscribe(mappingCallback);
    };
  }
}