import * as XLSX from 'xlsx';

/**
 * Genera un archivo Excel con dos hojas: Ingresos Diarios y Productos Vendidos.
 * @param {Array} dailyIncomeData - Array de objetos { fecha, ingresos }.
 * @param {Array} productSalesData - Array de objetos { nombre, count }.
 */
export const exportSalesReport = (dailyIncomeData, productSalesData) => {
  // 1. Preparar datos para la hoja de Ingresos Diarios
  const incomeWorksheetData = dailyIncomeData.map(item => ({
    'Fecha': item.fecha,
    'Ingresos ($)': item.ingresos,
  }));
  const incomeWorksheet = XLSX.utils.json_to_sheet(incomeWorksheetData);

  // 2. Preparar datos para la hoja de Productos Vendidos
  const productWorksheetData = productSalesData.map(item => ({
    'Producto': item.nombre,
    'Unidades Vendidas': item.count,
  }));
  const productWorksheet = XLSX.utils.json_to_sheet(productWorksheetData);

  // Ajustar el ancho de las columnas (opcional, pero mejora la apariencia)
  incomeWorksheet['!cols'] = [{ wch: 20 }, { wch: 15 }];
  productWorksheet['!cols'] = [{ wch: 30 }, { wch: 20 }];

  // 3. Crear el libro de trabajo y añadir las hojas
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, incomeWorksheet, 'Ingresos Diarios');
  XLSX.utils.book_append_sheet(workbook, productWorksheet, 'Productos Vendidos');

  // 4. Generar el archivo y disparar la descarga
  const today = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
  XLSX.writeFile(workbook, `Corte_Ventas_${today}.xlsx`);
};