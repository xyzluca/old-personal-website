import { UnsplashGallery } from "../components/unsplash-gallery";

export const metadata = {
  title: 'Gallery - Visual Stories',
  description: 'A curated collection of stunning photography that inspires and captivates.',
};

export default function GalleryPage() {
  return (
    <div className="fixed inset-0 overflow-auto bg-white dark:bg-black">
      <UnsplashGallery />
    </div>
  );
}