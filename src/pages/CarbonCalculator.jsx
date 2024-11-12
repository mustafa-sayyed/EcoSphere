import React, { useState } from 'react';
import { Car, Home, Plane, ShoppingBag, Utensils, Lightbulb, Trash2, Factory } from 'lucide-react';

const CarbonCalculator = () => {
  const [values, setValues] = useState({
    transportation: 0,
    household: 0,
    flights: 0,
    shopping: 0,
    diet: 0,
    energy: 0,
    waste: 0,
    lifestyle: 0
  });

  const calculateTotal = () => {
    const weights = {
      transportation: 2.3,
      household: 1.8,
      flights: 2.5,
      shopping: 1.2,
      diet: 1.5,
      energy: 1.7,
      waste: 0.8,
      lifestyle: 1.2
    };

    return Object.entries(values).reduce((acc, [key, value]) => {
      return acc + (value * weights[key]);
    }, 0);
  };

  const getFootprintCategory = (total) => {
    if (total < 15) return { label: 'Low', color: 'text-green-500' };
    if (total < 25) return { label: 'Medium', color: 'text-yellow-500' };
    return { label: 'High', color: 'text-red-500' };
  };

  const getRecommendations = (total) => {
    const recommendations = [
      'Use public transportation or bike when possible',
      'Switch to energy-efficient appliances',
      'Reduce meat consumption',
      'Start composting',
      'Use renewable energy sources',
      'Minimize single-use plastics',
      'Shop second-hand',
      'Plant trees or support reforestation projects'
    ];

    return recommendations.slice(0, total > 25 ? 8 : total > 15 ? 6 : 4);
  };

  const categories = [
    { id: 'transportation', icon: Car, label: 'Daily Transportation', min: '0 km', max: '100+ km' },
    { id: 'household', icon: Home, label: 'Household Size', min: 'Studio', max: 'Large House' },
    { id: 'flights', icon: Plane, label: 'Air Travel', min: 'None', max: 'Frequent' },
    { id: 'shopping', icon: ShoppingBag, label: 'Shopping Habits', min: 'Minimal', max: 'Excessive' },
    { id: 'diet', icon: Utensils, label: 'Diet Type', min: 'Vegan', max: 'Meat Daily' },
    { id: 'energy', icon: Lightbulb, label: 'Energy Usage', min: 'Efficient', max: 'Wasteful' },
    { id: 'waste', icon: Trash2, label: 'Waste Generation', min: 'Minimal', max: 'High' },
    { id: 'lifestyle', icon: Factory, label: 'Consumer Goods', min: 'Minimal', max: 'Luxury' }
  ];

  const total = calculateTotal();
  const footprint = getFootprintCategory(total);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Detailed Carbon Footprint Calculator
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(({ id, icon: Icon, label, min, max }) => (
          <div key={id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{label}</h3>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={values[id]}
              onChange={(e) => setValues({ ...values, [id]: Number(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span>{min}</span>
              <span>{max}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Your Carbon Footprint
        </h3>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {total.toFixed(1)} tons CO₂/year
          </div>
          <div className="text-lg mb-6">
            Category: <span className={`font-semibold ${footprint.color}`}>{footprint.label}</span>
          </div>

          <div className="w-full max-w-2xl">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Recommendations to Reduce Your Footprint:
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              {getRecommendations(total).map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;