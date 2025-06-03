// Client-seitige Funktionen für Unsplash API
// Diese verwenden sichere server-seitige API-Routen anstatt den API-Key direkt zu exponieren

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  links: {
    download_location: string;
  };
  width: number;
  height: number;
}

export interface SearchPhotosResult {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

// Funktion zum Suchen von Fotos über sichere API-Route
export async function searchPhotos(
  query: string,
  page: number = 1,
  perPage: number = 12
): Promise<SearchPhotosResult | null> {
  try {
    const response = await fetch(
      `/api/unsplash/search?query=${encodeURIComponent(query)}&page=${page}&perPage=${perPage}`
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('API Fehler:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Fehler beim Suchen von Fotos:', error);
    return null;
  }
}

// Funktion zum Abrufen zufälliger Fotos über sichere API-Route
export async function getRandomPhotos(count: number = 12): Promise<UnsplashPhoto[] | null> {
  try {
    const response = await fetch(`/api/unsplash/random?count=${count}`);

    if (!response.ok) {
      const error = await response.json();
      console.error('API Fehler:', error);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Fehler beim Abrufen zufälliger Fotos:', error);
    return null;
  }
}

// Funktion zum Verfolgen von Downloads über sichere API-Route
export async function trackDownload(downloadLocation: string): Promise<void> {
  try {
    await fetch('/api/unsplash/track-download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ downloadLocation }),
    });
  } catch (error) {
    console.error('Fehler beim Verfolgen des Downloads:', error);
  }
}

// Hinweis: getPhoto würde eine zusätzliche API-Route benötigen
// Für jetzt entfernt, kann bei Bedarf hinzugefügt werden
