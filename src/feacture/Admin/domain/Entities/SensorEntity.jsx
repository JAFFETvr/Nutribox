export class SensorEntity {
  constructor({ id, machineId, sensorType, value, unit, timestamp }) { // <-- Añadido sensorType
    this.id = id;
    this.machineId = machineId;
    this.sensorType = sensorType; // <-- Añadido sensorType
    this.value = value;
    this.unit = unit;
    this.timestamp = timestamp;
  }
}