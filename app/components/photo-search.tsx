'use client';

import { useState } from 'react';

interface PhotoSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function PhotoSearch({ 
  onSearch, 
  placeholder = 'Suche nach Bildern...' 
}: PhotoSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ×
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            🔍
          </button>
        </div>
      </div>
    </form>
  );
}
