
export class GetSensorDashboardDataUseCase {
  constructor(sensorRepository) {
    this.sensorRepository = sensorRepository;
  }

  async execute() {
    // 1. Obtenemos todos los registros del repositorio como antes.
    const allSensorReadings = await this.sensorRepository.getSensorReadings();

    // CAMBIO CLAVE 1: Filtrar para procesar solo los registros de tipo 'moneda'.
    // Asumimos que la SensorEntity tiene una propiedad `sensorType`.
    // Si no la tiene, debemos añadirla en la Entity y en el Mapper del Repository.
    const coinReadings = allSensorReadings.filter(
      (reading) => reading.sensorType === 'moneda'
    );

    // 2. Procesamos los datos ya filtrados para la gráfica.
    const coinCounts = coinReadings.reduce((acc, current) => {
      acc[current.value] = (acc[current.value] || 0) + 1;
      return acc;
    }, {});
    
    // CAMBIO CLAVE 2: Calcular el ingreso total sumando el valor de cada moneda.
    const totalIncome = coinReadings.reduce(
      (sum, current) => sum + current.value,
      0 // El valor inicial de la suma es 0
    );

    // 3. Devolvemos los datos que la presentación necesita: la frecuencia y el total.
    // Ya no devolvemos la lista de transacciones.
    return {
      coinCounts,
      totalIncome,
    };
  }
}