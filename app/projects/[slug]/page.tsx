import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { getProjects, formatDate } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  return getProjects().map((proj) => ({
    slug: proj.slug,
  }))
}

export function generateMetadata({ params }) {
  const proj = getProjects().find((p) => p.slug === params.slug)
  if (!proj) return {}
  return {
    title: proj.metadata.title,
    description: proj.metadata.summary,
    openGraph: {
      title: proj.metadata.title,
      description: proj.metadata.summary,
      url: `${baseUrl}/projects/${proj.slug}`
      // …any other OG fields you use for blog
    },
  }
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const proj = getProjects().find((p) => p.slug === params.slug)
  if (!proj) notFound()

  return (
    <section>
      <h1 className="title font-semibold text-4xl tracking-tighter">
        {proj.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(proj.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={proj.content} />
      </article>
    </section>
  )
}