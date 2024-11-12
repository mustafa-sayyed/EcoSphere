import React, { useState, useEffect } from 'react';

const ExtinctSpecies = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://extinct-api.herokuapp.com/api/v1/animal/100')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then((response) => {
        // Filter out species that do not have a valid image
        if (response.status === 'success' && Array.isArray(response.data)) {
          const filteredData = response.data.filter(
            (animal) => animal.imageSrc && animal.imageSrc !== 'false' && animal.imageSrc.trim() !== ''
          );
          setSpecies(filteredData);
        } else {
          throw new Error('Invalid data format received');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load extinct species data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Extinct Species</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {species.map((animal, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <img
              src={animal.imageSrc}
              alt={animal.commonName}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1584844308364-9e43f2cfaa6c?auto=format&fit=crop&q=80";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{animal.commonName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{animal.shortDesc}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Binomial Name:</span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{animal.binomialName}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Last Recorded:</span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{animal.lastRecord}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Location:</span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{animal.location}</span>
                </p>
                <a
                  href={animal.wikiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtinctSpecies;
