export class Contenedor {
  constructor({
    id_maquina,
    id_producto,
    tipo,
    capacidad_maxima,
    cantidad_actual,
    temperatura,
    id_contenedor,
    ultima_recarga,
  }) {
    this.idMaquina = id_maquina;
    this.idProducto = id_producto;
    this.tipo = tipo;
    this.capacidadMaxima = capacidad_maxima;
    this.cantidadActual = cantidad_actual;
    this.temperatura = temperatura;
    this.id = id_contenedor;
    this.ultimaRecarga = new Date(ultima_recarga);
  }

  getNivelDeLlenado() {
    if (this.capacidadMaxima === 0) return 0;
    return (this.cantidadActual / this.capacidadMaxima) * 100;
  }
}