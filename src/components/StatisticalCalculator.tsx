import React, { useState } from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';

// Definimos los tipos de medidas estadísticas que se pueden calcular
type Measure = 'media' | 'varianza' | 'mediana' | 'moda' | 'cuartiles' | 'todas';

const StatisticalCalculator: React.FC = () => {
  // Estados para manejar los datos de entrada, la medida seleccionada y el resultado
  const [data, setData] = useState<string>('');
  const [measure, setMeasure] = useState<Measure>('todas');
  const [result, setResult] = useState<string>('');

  // Función principal para calcular las estadísticas
  const calculateStatistics = () => {
    // Convertimos la cadena de entrada en un array de números
    const numbers = data.split(',').map(Number);
    
    // Validamos que todos los valores ingresados sean números
    if (numbers.some(isNaN)) {
      setResult('Por favor, ingrese solo números separados por comas.');
      return;
    }

    let output = '';

    // Función para calcular la media
    const calculateMean = () => {
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      return sum / numbers.length;
    };

    // Función para calcular la varianza
    const calculateVariance = () => {
      const mean = calculateMean();
      const squareDiffs = numbers.map(num => Math.pow(num - mean, 2));
      const variance = squareDiffs.reduce((acc, val) => acc + val, 0) / numbers.length;
      return variance;
    };

    // Función para calcular la mediana
    const calculateMedian = (arr: number[]) => {
      const sorted = [...arr].sort((a, b) => a - b);
      const middle = Math.floor(sorted.length / 2);
      if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
      }
      return sorted[middle];
    };

    // Función para calcular la moda
    const calculateMode = () => {
      const frequency: { [key: number]: number } = {};
      numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
      });
      const maxFrequency = Math.max(...Object.values(frequency));
      const modes = Object.keys(frequency).filter(key => frequency[Number(key)] === maxFrequency);
      return modes.length === numbers.length ? 'No hay moda' : modes.join(', ');
    };

    // Función para calcular los cuartiles
    const calculateQuartiles = () => {
      const sorted = [...numbers].sort((a, b) => a - b);
      const q2 = calculateMedian(sorted);
      const lowerHalf = sorted.slice(0, Math.floor(sorted.length / 2));
      const upperHalf = sorted.slice(Math.ceil(sorted.length / 2));
      const q1 = calculateMedian(lowerHalf);
      const q3 = calculateMedian(upperHalf);
      return [q1, q2, q3];
    };

    // Calculamos las estadísticas según la medida seleccionada
    if (measure === 'media' || measure === 'todas') {
      output += `Media: ${calculateMean().toFixed(2)}\n`;
    }
    if (measure === 'varianza' || measure === 'todas') {
      const variance = calculateVariance();
      output += `Varianza: ${variance.toFixed(2)}\n`;
      output += `Desviación Estándar: ${Math.sqrt(variance).toFixed(2)}\n`;
    }
    if (measure === 'mediana' || measure === 'todas') {
      output += `Mediana: ${calculateMedian(numbers).toFixed(2)}\n`;
    }
    if (measure === 'moda' || measure === 'todas') {
      output += `Moda: ${calculateMode()}\n`;
    }
    if (measure === 'cuartiles' || measure === 'todas') {
      const [q1, q2, q3] = calculateQuartiles();
      output += `Cuartiles: Q1 = ${q1.toFixed(2)}, Q2 = ${q2.toFixed(2)}, Q3 = ${q3.toFixed(2)}\n`;
    }

    setResult(output.trim());
  };

  return (
    <div className="space-y-6">
      {/* Campo de entrada para los datos */}
      <div>
        <label htmlFor="data" className="block text-sm font-medium text-gray-200 mb-1">
          Ingrese los datos (separados por comas):
        </label>
        <input
          type="text"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          placeholder="Ej: 1, 2, 3, 4, 5"
        />
      </div>
      {/* Selector de medida estadística */}
      <div>
        <label htmlFor="measure" className="block text-sm font-medium text-gray-200 mb-1">
          Seleccione la medida a calcular:
        </label>
        <select
          id="measure"
          value={measure}
          onChange={(e) => setMeasure(e.target.value as Measure)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        >
          <option value="todas">Todas las medidas</option>
          <option value="media">Media</option>
          <option value="varianza">Varianza y Desviación Estándar</option>
          <option value="mediana">Mediana</option>
          <option value="moda">Moda</option>
          <option value="cuartiles">Cuartiles</option>
        </select>
      </div>
      {/* Botón para calcular */}
      <button
        onClick={calculateStatistics}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center"
      >
        <BarChart2 className="mr-2" />
        Calcular
        <ArrowRight className="ml-2" />
      </button>
      {/* Sección de resultados */}
      {result && (
        <div className="mt-6 p-4 bg-gray-800 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Resultados:</h3>
          <pre className="whitespace-pre-wrap text-gray-300">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default StatisticalCalculator;