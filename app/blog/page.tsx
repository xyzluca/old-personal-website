import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Writing',
  description: 'Read my thoughts on technology, design, and creativity.',
}

export default function Page() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Writing</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Thoughts on technology, design, and creative problem-solving.
        </p>
      </div>
      
      <BlogPosts />
    </section>
  )
}