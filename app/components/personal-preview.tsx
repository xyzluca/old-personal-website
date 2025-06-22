'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export function PersonalPreview() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/unsplash');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPhotos(data.slice(0, 4)); // Only show first 4 photos
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!photos.length) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">No photos available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo, index) => (
          <Link
            key={photo.id}
            href="/gallery"
            className="aspect-square relative overflow-hidden rounded-lg group hover:opacity-90 transition-opacity"
          >
            <Image
              src={photo.urls.regular}
              alt={photo.alt_description || `Gallery image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </Link>
        ))}
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
        <Link 
          href="https://www.instagram.com/" 
          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </Link>
        
        <Link 
          href="https://unsplash.com/@lucakursawe" 
          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Unsplash
        </Link>
      </div>
    </div>
  );
}
