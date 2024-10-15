import React from 'react';
import { Calculator } from 'lucide-react';
import StatisticalCalculator from './components/StatisticalCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-100 flex items-center justify-center">
          <Calculator className="mr-2" />
          Calculadora Estadística
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-300">
          Por Rogelio Xalix
        </h2>
        <StatisticalCalculator />
      </div>
    </div>
  );
}

export default App;