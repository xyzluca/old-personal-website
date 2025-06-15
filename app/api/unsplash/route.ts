import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  const UNSPLASH_USERNAME = process.env.UNSPLASH_USERNAME;

  if (!UNSPLASH_ACCESS_KEY || !UNSPLASH_USERNAME) {
    return NextResponse.json(
      { error: 'Unsplash credentials not configured' },
      { status: 500 }
    );
  }

  try {
    // Using the correct endpoint for user photos
    const response = await fetch(
      `https://api.unsplash.com/users/${UNSPLASH_USERNAME}/photos?per_page=30&order_by=latest`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          'Accept-Version': 'v1'
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Unsplash API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the data to include only what we need
    const photos = data.map((photo: any) => ({
      id: photo.id,
      urls: {
        regular: photo.urls.regular,
        full: photo.urls.full
      },
      alt_description: photo.alt_description || photo.description || 'Unsplash photo',
      user: {
        name: photo.user.name
      }
    }));

    return NextResponse.json(photos, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos', details: error.message },
      { status: 500 }
    );
  }
}