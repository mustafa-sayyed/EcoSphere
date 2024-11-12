import React, { useState, useEffect } from 'react';

interface Species {
  name: string;
  description: string;
  image_url: string;
  year_extinct: string;
  cause_of_extinction: string;
}

interface ApiResponse {
  data: Species[];
  status: string;
}

const ExtinctSpecies = () => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://extinct-api.herokuapp.com/api/v1/animal/100')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then((response: ApiResponse) => {
        if (Array.isArray(response.data)) {
          setSpecies(response.data);
        } else {
          throw new Error('Invalid data format received');
        }
        setLoading(false);
      })
      .catch(err => {
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
              src={animal.image_url || "https://images.unsplash.com/photo-1584844308364-9e43f2cfaa6c?auto=format&fit=crop&q=80"}
              alt={animal.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1584844308364-9e43f2cfaa6c?auto=format&fit=crop&q=80";
              }}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{animal.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{animal.description}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Year Extinct:</span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{animal.year_extinct}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Cause:</span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{animal.cause_of_extinction}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtinctSpecies;