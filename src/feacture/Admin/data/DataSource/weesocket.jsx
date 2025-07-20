import axios from 'axios';

const WS_URL = 'ws://127.0.0.1:8000/ws/sensores';
class WebSocketManager {
  constructor() {
    this.socket = null; this.listeners = new Set(); this.connect();
  }
  connect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;
    this.socket = new WebSocket(WS_URL);
    this.socket.onopen = () => console.log('✅ Conexión WebSocket establecida.');
    this.socket.onclose = () => setTimeout(() => this.connect(), 3000);
    this.socket.onerror = (error) => console.error('WebSocket error:', error);
    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.listeners.forEach(listener => listener(data));
      } catch (e) { console.error("Error al parsear mensaje:", e); }
    };
  }
  subscribe(callback) { this.listeners.add(callback); }
  unsubscribe(callback) { this.listeners.delete(callback); }
}
const sensorWebSocketManager = new WebSocketManager();

// --- DATASOURCE DE SENSORES (MODIFICADO PARA WEBSOCKET) ---
class SensorRemoteDataSource {
  constructor() {
    this.latestReadings = {}; this.subscribers = new Set();
    sensorWebSocketManager.subscribe(this.handleRawData.bind(this));
  }
  handleRawData(rawData) {
    // Asumimos que el WS envía un objeto o un array de objetos
    const readings = Array.isArray(rawData) ? rawData : [rawData];
    readings.forEach(reading => {
        // Usamos una clave única, por ejemplo, combinando machineId y sensorType
        const key = `${reading.machine_id}-${reading.sensor_type}`;
        this.latestReadings[key] = reading;
    });
    this.notifySubscribers();
  }
  notifySubscribers() {
    const allReadings = Object.values(this.latestReadings);
    this.subscribers.forEach(callback => callback(allReadings));
  }
  getSensorReadings(callback) {
    if (typeof callback !== 'function') return () => {};
    this.subscribers.add(callback);
    callback(Object.values(this.latestReadings));
    return () => this.subscribers.delete(callback);
  }
}
// Exportamos UNA ÚNICA INSTANCIA para que toda la app la use
export const sensorRemoteDataSource = new SensorRemoteDataSource();