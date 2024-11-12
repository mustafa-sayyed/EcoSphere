import React, { useState } from 'react';
import { Car, Home, Plane, ShoppingBag } from 'lucide-react';

const CarbonCalculator = () => {
  const [values, setValues] = useState({
    transportation: 0,
    household: 0,
    food: 0,
    shopping: 0
  });

  const calculateTotal = () => {
    return Object.values(values).reduce((acc, curr) => acc + curr, 0);
  };

  const getFootprintCategory = (total: number) => {
    if (total < 6) return 'Low';
    if (total < 12) return 'Medium';
    return 'High';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Carbon Footprint Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Transportation</h3>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={values.transportation}
              onChange={(e) => setValues({ ...values, transportation: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span>0 km/day</span>
              <span>100+ km/day</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Household</h3>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={values.household}
              onChange={(e) => setValues({ ...values, household: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span>Efficient</span>
              <span>Wasteful</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Travel</h3>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={values.food}
              onChange={(e) => setValues({ ...values, food: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span>No Flights</span>
              <span>Frequent Flyer</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Shopping</h3>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={values.shopping}
              onChange={(e) => setValues({ ...values, shopping: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span>Minimal</span>
              <span>Excessive</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Your Carbon Footprint
        </h3>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {calculateTotal().toFixed(1)} tons CO₂/year
          </div>
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Category: <span className="font-semibold">{getFootprintCategory(calculateTotal())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;