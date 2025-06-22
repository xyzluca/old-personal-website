import Link from 'next/link'
import { getProjects, formatDate } from 'app/blog/utils'

export const metadata = {
  title: 'Work',
  description: 'Explore my projects and creative work.',
}

export default function ProjectsPage() {
  const projects = getProjects()
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).valueOf() -
        new Date(a.metadata.publishedAt).valueOf()
    )

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Work</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          A collection of projects showcasing creative technology solutions.
        </p>
      </div>
      
      <div className="space-y-6">
        {projects.map((proj) => (
          <Link
            key={proj.slug}
            href={`/projects/${proj.slug}`}
            className="block group hover:opacity-80 transition-opacity"
          >
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {proj.metadata.title}
                </h3>
                {proj.metadata.summary && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {proj.metadata.summary}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0 text-xs text-neutral-500 font-mono">
                {formatDate(proj.metadata.publishedAt, false)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}