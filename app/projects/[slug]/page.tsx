import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { getProjects, formatDate } from 'app/blog/utils'

export async function generateStaticParams() {
  return getProjects().map((proj) => ({
    slug: proj.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const proj = getProjects().find((p) => p.slug === slug)
  if (!proj) return {}
  return {
    title: proj.metadata.title,
    description: proj.metadata.summary,
    openGraph: {
      title: proj.metadata.title,
      description: proj.metadata.summary,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${proj.slug}`
      // …any other OG fields you use for blog
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const proj = getProjects().find((p) => p.slug === slug)
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