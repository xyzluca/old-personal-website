import { UnsplashGallery } from "../components/unsplash-gallery";

export const metadata = {
  title: 'Personal - Visual Stories',
  description: 'A curated collection of photography capturing moments and perspectives.',
};

export default function GalleryPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Personal</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Visual stories through photography - capturing moments and perspectives.
        </p>
      </div>
      
      <UnsplashGallery />
    </section>
  );
}