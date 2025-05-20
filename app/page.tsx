import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <p className="mb-8 text-2xl font-semibold tracking-tighter">
        Luca Kursawe
      </p>
      <p className="mb-4">
        {` I'm a Creative Technologist and Computer Science student at RH Köln, working across web development, design, and data analysis.
I enjoy solving real problems in creative, visual ways — whether that's building frontend projects, analyzing data, or making photography and video content.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
