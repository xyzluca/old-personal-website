import { NextRequest, NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';

// Server-seitige Unsplash API Instanz mit sicherem Access Key
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { downloadLocation } = await request.json();

    if (!downloadLocation) {
      return NextResponse.json(
        { error: 'downloadLocation ist erforderlich' },
        { status: 400 }
      );
    }

    await unsplash.photos.trackDownload({
      downloadLocation,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fehler beim Verfolgen des Downloads:', error);
    return NextResponse.json(
      { error: 'Interner Server-Fehler' },
      { status: 500 }
    );
  }
}
