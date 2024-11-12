import React, { useState } from 'react';
// import { X } from 'lucide-react';

const NewsItem = ({ title, description, content, image, url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80";

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200">
        <img
          src={image || fallbackImage}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Read More
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <img
                src={image || fallbackImage}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">{content}</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Read full article →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsItem;