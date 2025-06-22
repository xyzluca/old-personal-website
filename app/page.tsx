import { BlogPosts } from "app/components/posts";
import { PersonalPreview } from "app/components/personal-preview";

export default function Page() {
  const currentTime = new Date().toLocaleTimeString('de-DE', {
    timeZone: 'Europe/Berlin',
    hour12: false
  });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section id="intro" className="space-y-6">
        <div>
          <h1 className="text-6xl font-bold tracking-tight mb-2">
            Luca Kursawe
          </h1>
          <h2 className="text-2xl text-neutral-600 dark:text-neutral-400 font-medium">
            Creative Technologist
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-2xl">
          Hey, I'm Luca a Computer Science student at RH Köln, working across web 
          development, design, and data analysis. I enjoy solving real problems in creative, 
          visual ways — whether that's building frontend projects, analyzing data, or making 
          photography and video content.
        </p>
      </section>

      {/* Writing Section */}
      <section id="writing" className="space-y-6">
        <h3 className="text-sm font-medium tracking-wider uppercase text-neutral-500">
          Writing
        </h3>
        <div className="space-y-4">
          <BlogPosts />
        </div>
      </section>

      {/* Personal Section with Gallery */}
      <section id="personal" className="space-y-6">
        <h3 className="text-sm font-medium tracking-wider uppercase text-neutral-500">
          Personal
        </h3>
        <PersonalPreview />
      </section>

      {/* Contact Section */}
      <section id="contact" className="space-y-6">
        <h3 className="text-sm font-medium tracking-wider uppercase text-neutral-500">
          Contact
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300">
          You can contact me using the form or via the links below.
        </p>
        
        <form className="space-y-4 max-w-md">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Send message
          </button>
        </form>

        <div className="flex flex-col space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <a href="mailto:lucakursawe@gmail.com" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            Email lucakursawe@gmail.com
          </a>
          <a href="https://github.com/xyzluca" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            GitHub @xyzluca
          </a>
          <a href="https://www.linkedin.com/in/lucakursawe" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            LinkedIn /in/lucakursawe
          </a>
        </div>
      </section>

      {/* Footer Info */}
      <section className="flex flex-col space-y-4 text-sm text-neutral-500 pt-8 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">GERMANY</p>
            <p className="text-2xl">26°C</p>
          </div>
          <div>
            <p className="font-medium">EST. 2001</p>
            <p className="text-lg font-mono">{currentTime} GMT+2</p>
          </div>
        </div>
      </section>
    </div>
  );
}
