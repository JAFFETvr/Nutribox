export class UpdateContenedor {
  constructor(contenedorRepository) {
    this.repository = contenedorRepository;
  }

  async execute({ contenedor, nuevaCantidad }) {
    // ========= NUEVA LÓGICA DE VALIDACIÓN =========
    // Regla de negocio: si es 'fruta', la cantidad no puede ser mayor a 10.
    if (contenedor.tipo === 'fruta' && nuevaCantidad > 10) {
      // Lanzamos un error que detiene la ejecución.
      // Este error puede ser capturado en el ViewModel para mostrar una alerta.
      throw new Error("La cantidad para contenedores de fruta no puede ser mayor a 10.");
    }
    // ===============================================

    let cantidadFinal = nuevaCantidad;

    // Regla de negocio existente: si es 'jugo', la recarga siempre es a la capacidad máxima.
    if (contenedor.tipo === 'jugo') {
      cantidadFinal = contenedor.capacidadMaxima;
    }

    const payload = {
      id_maquina: contenedor.idMaquina,
      id_producto: contenedor.idProducto,
      tipo: contenedor.tipo,
      capacidad_maxima: contenedor.capacidadMaxima,
      cantidad_actual: cantidadFinal,
      temperatura: contenedor.temperatura,
    };
    
    return this.repository.updateContainer(contenedor.id, payload);
  }
}