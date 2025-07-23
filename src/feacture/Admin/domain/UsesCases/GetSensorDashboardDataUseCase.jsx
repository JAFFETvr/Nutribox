
export class GetSensorDashboardDataUseCase {
  constructor(sensorRepository) {
    this.sensorRepository = sensorRepository;
  }

  async execute() {
    const allSensorReadings = await this.sensorRepository.getSensorReadings();

    const coinReadings = allSensorReadings.filter(
      (reading) => reading.sensorType === 'moneda'
    );
    
  
    let totalIncome = 0;
    const coinCounts = {};
    
    const dailyTotals = { Lunes: 0, Martes: 0, Miércoles: 0, Jueves: 0, Viernes: 0, Sábado: 0, Domingo: 0 };
    

    const getDayName = (dateString) => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const date = new Date(dateString);
        return days[date.getDay()];
    };

    for (const reading of coinReadings) {
      coinCounts[reading.value] = (coinCounts[reading.value] || 0) + 1;

      totalIncome += reading.value;
      
      
      const dayName = getDayName(reading.timestamp); 
      if (dailyTotals.hasOwnProperty(dayName)) {
        dailyTotals[dayName] += reading.value;
      }
    }

    const diasOrdenados = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const ventasPorDia = diasOrdenados.map(dia => ({
      fecha: dia,
      ingresos: dailyTotals[dia]
    }));

    return {
      coinCounts,
      totalIncome,
      ventasPorDia, 
    };
  }
}