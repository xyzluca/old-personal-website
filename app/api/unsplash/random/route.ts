import { NextRequest, NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';

// Server-seitige Unsplash API Instanz mit sicherem Access Key
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const count = parseInt(searchParams.get('count') || '12');

  try {
    const result = await unsplash.photos.getRandom({
      count,
      featured: true,
    });

    if (result.errors) {
      console.error('Unsplash API Fehler:', result.errors);
      return NextResponse.json(
        { error: 'Fehler bei der Unsplash API' },
        { status: 500 }
      );
    }

    // Wenn count > 1, gibt die API ein Array zurück, andernfalls ein einzelnes Objekt
    const photos = Array.isArray(result.response) ? result.response : [result.response];
    return NextResponse.json(photos);
  } catch (error) {
    console.error('Fehler beim Abrufen zufälliger Fotos:', error);
    return NextResponse.json(
      { error: 'Interner Server-Fehler' },
      { status: 500 }
    );
  }
}
