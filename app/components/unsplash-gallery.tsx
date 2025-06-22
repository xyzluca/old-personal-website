'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

export function UnsplashGallery() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/unsplash');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received photos:', data); // Debug log
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError('Failed to load photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const openLightbox = (photo: UnsplashPhoto) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedPhoto]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="text-xl font-medium text-neutral-600 dark:text-neutral-400">
            Curating beautiful moments...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">📷</div>
          <p className="text-xl text-red-500 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!photos.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">🖼️</div>
          <p className="text-xl font-medium text-neutral-600 dark:text-neutral-400">
            No photos found
          </p>
        </div>
      </div>
    );
  }

  // Generate random heights for Pinterest-style layout
  const getRandomHeight = (index: number) => {
    const heights = ['h-64', 'h-72', 'h-80', 'h-96', 'h-[28rem]', 'h-[32rem]'];
    return heights[index % heights.length];
  };

  return (
    <>
      {/* Pinterest-style Gallery */}
      <div className="w-full">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="break-inside-avoid group cursor-pointer mb-6"
              onClick={() => openLightbox(photo)}
            >
              <div className={`relative overflow-hidden rounded-lg hover:opacity-90 transition-opacity duration-300 ${getRandomHeight(index)}`}>
                <Image
                  src={photo.urls.regular}
                  alt={photo.alt_description || 'Gallery image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-800 dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
            
            {/* Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedPhoto.urls.full}
                alt={selectedPhoto.alt_description || 'Selected image'}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized
              />
            </div>
            
            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 text-neutral-800 dark:text-white text-center space-y-2">
              <p className="font-medium text-lg">Captured by {selectedPhoto.user.name}</p>
              {selectedPhoto.alt_description && (
                <p className="text-sm opacity-80 max-w-2xl mx-auto">{selectedPhoto.alt_description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}