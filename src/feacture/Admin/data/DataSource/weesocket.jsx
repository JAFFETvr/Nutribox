// La URL base del WebSocket, sin parámetros.
const WEBSOCKET_BASE_URL = 'ws://34.201.177.84:8000/ws/sensores';

class SensorWebSocketDataSource {
  constructor() {
    this.socket = null;
    this.dataSubscribers = [];
    this.statusSubscribers = [];
    this.isConnecting = false;
    this.connectionState = 'disconnected';
  }

  updateStatus(newStatus) {
    this.connectionState = newStatus;
    this.statusSubscribers.forEach(callback => callback(newStatus));
  }

  connect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    // --- INICIO DE LA MODIFICACIÓN ---

    // 1. Obtener el token ANTES de intentar conectar.
    const token = localStorage.getItem('authToken');

    // 2. Si no hay token, no intentar conectar y marcar como error.
    if (!token) {
      console.error("[WebSocket] No se encontró 'authToken' en localStorage. Conexión cancelada.");
      this.updateStatus('error'); // Notifica a la UI que hubo un problema.
      return;
    }

    // 3. Construir la URL final con el token como parámetro de consulta.
    // encodeURIComponent es importante por si el token tiene caracteres especiales.
    const finalWebSocketUrl = `${WEBSOCKET_BASE_URL}?token=${encodeURIComponent(token)}`;

    this.isConnecting = true;
    this.updateStatus('connecting');
    console.log('[WebSocket] Conectando a:', finalWebSocketUrl); // Log para depurar

    // 4. Usar la URL final para crear la instancia del WebSocket.
    this.socket = new WebSocket(finalWebSocketUrl);
    
    // --- FIN DE LA MODIFICACIÓN ---

    this.socket.onopen = () => {
      this.isConnecting = false;
      this.updateStatus('connected');
      console.log('%c[WebSocket] Conexión establecida.', 'color: green; font-weight: bold;');
      // YA NO es necesario enviar el token por aquí, la autenticación ya se hizo.
    };

    this.socket.onmessage = (event) => {
      try {
        const sensorData = JSON.parse(event.data);
        this.dataSubscribers.forEach(callback => callback(sensorData));
      } catch (error) {
        console.error('[WebSocket] Error al procesar mensaje:', error);
      }
    };

    this.socket.onerror = (error) => {
      this.isConnecting = false;
      this.updateStatus('error');
      console.error('[WebSocket] Ocurrió un error en la conexión.', error);
    };

    this.socket.onclose = (event) => {
      this.isConnecting = false;
      this.updateStatus('disconnected');
      console.warn(`[WebSocket] Conexión cerrada. Código: ${event.code}. Razón: ${event.reason}. Reconectando en 5s...`);
      setTimeout(() => this.connect(), 5000);
    };
  }

  subscribeToData(callback) {
    this.dataSubscribers.push(callback);
  }

  unsubscribeFromData(callback) {
    this.dataSubscribers = this.dataSubscribers.filter(sub => sub !== callback);
  }

  subscribeToStatus(callback) {
    this.statusSubscribers.push(callback);
    callback(this.connectionState);
  }

  unsubscribeFromStatus(callback) {
    this.statusSubscribers = this.statusSubscribers.filter(sub => sub !== callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.onclose = null; 
      this.socket.close(1000, "Cierre manual por el cliente"); // Código 1000 para cierre normal
    }
  }
}

export const sensorWebSocketDataSource = new SensorWebSocketDataSource();