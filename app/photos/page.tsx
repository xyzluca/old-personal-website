'use client';

import { useState } from 'react';
import PhotoGallery from '@/app/components/photo-gallery';
import PhotoSearch from '@/app/components/photo-search';

export default function PhotosPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Foto Galerie
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie wunderschöne, hochwertige Fotos von{' '}
            <a 
              href="https://unsplash.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Unsplash
            </a>
            . Suchen Sie nach bestimmten Themen oder entdecken Sie kuratierte Sammlungen.
          </p>
        </div>

        <PhotoSearch onSearch={handleSearch} />

        <div className="mb-6">
          {searchQuery ? (
            <p className="text-gray-600 text-center">
              Suchergebnisse für: <span className="font-semibold">"{searchQuery}"</span>
            </p>
          ) : (
            <p className="text-gray-600 text-center">
              Entdecken Sie kuratierte Fotos
            </p>
          )}
        </div>

        <PhotoGallery 
          searchQuery={searchQuery}
          columns={3}
          photosPerPage={12}
        />

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Alle Fotos von{' '}
            <a 
              href="https://unsplash.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Unsplash
            </a>
            . Bitte beachten Sie die jeweiligen Urheberrechte der Fotografen.
          </p>
        </div>
      </div>
    </div>
  );
}
