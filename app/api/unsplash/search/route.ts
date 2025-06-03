import { NextRequest, NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';

// Server-seitige Unsplash API Instanz mit sicherem Access Key
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '12');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter ist erforderlich' },
      { status: 400 }
    );
  }

  try {
    const result = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('Unsplash API Fehler:', result.errors);
      return NextResponse.json(
        { error: 'Fehler bei der Unsplash API' },
        { status: 500 }
      );
    }

    return NextResponse.json(result.response);
  } catch (error) {
    console.error('Fehler beim Suchen von Fotos:', error);
    return NextResponse.json(
      { error: 'Interner Server-Fehler' },
      { status: 500 }
    );
  }
}
