'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { searchPhotos, getRandomPhotos, trackDownload, UnsplashPhoto } from '@/lib/unsplash';

interface PhotoGalleryProps {
  searchQuery?: string;
  columns?: number;
  photosPerPage?: number;
}

export default function PhotoGallery({ 
  searchQuery = '', 
  columns = 3, 
  photosPerPage = 12 
}: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      setError(null);

      try {
        let result;
        if (searchQuery.trim()) {
          const searchResult = await searchPhotos(searchQuery, 1, photosPerPage);
          result = searchResult?.results || [];
        } else {
          result = await getRandomPhotos(photosPerPage);
        }

        if (result) {
          setPhotos(result);
        } else {
          setError('Fehler beim Laden der Bilder');
        }
      } catch (err) {
        setError('Unerwarteter Fehler beim Laden der Bilder');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [searchQuery, photosPerPage]);

  const handlePhotoClick = (photo: UnsplashPhoto) => {
    setSelectedPhoto(photo);
  };

  const handleDownload = async (photo: UnsplashPhoto) => {
    try {
      // Download-Tracking gemäß Unsplash API-Richtlinien
      await trackDownload(photo.links.download_location);
      
      // Öffne das Bild in einem neuen Tab
      window.open(photo.urls.full, '_blank');
    } catch (error) {
      console.error('Fehler beim Herunterladen:', error);
    }
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: photosPerPage }).map((_, index) => (
          <div
            key={index}
            className="aspect-video bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105"
            onClick={() => handlePhotoClick(photo)}
          >
            <Image
              src={photo.urls.regular}
              alt={photo.alt_description || 'Unsplash Foto'}
              width={400}
              height={300}
              className="w-full h-auto object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-end justify-between p-4 opacity-0 group-hover:opacity-100">
              <div className="text-white text-sm">
                <p className="font-medium">{photo.user.name}</p>
                <p className="text-xs opacity-75">@{photo.user.username}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(photo);
                }}
                className="bg-white text-black px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal für vergrößerte Ansicht */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedPhoto.urls.regular}
              alt={selectedPhoto.alt_description || 'Unsplash Foto'}
              width={selectedPhoto.width}
              height={selectedPhoto.height}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={selectedPhoto.user.profile_image.medium}
                    alt={selectedPhoto.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{selectedPhoto.user.name}</p>
                    <p className="text-sm text-gray-600">@{selectedPhoto.user.username}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(selectedPhoto);
                  }}
                  className="bg-black text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
