import Link from 'next/link'
import { getProjects, formatDate } from 'app/blog/utils'

export default function ProjectsPage() {
  const projects = getProjects()
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).valueOf() -
        new Date(a.metadata.publishedAt).valueOf()
    )

  return (
    <section>
      <div>
        {projects.map((proj) => (
          <Link
            key={proj.slug}
            href={`/projects/${proj.slug}`}
            
            className="flex flex-col space-y-1 mb-4"
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 ">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight text-2xl">
                {proj.metadata.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}