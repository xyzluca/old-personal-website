import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="space-y-6">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="block group hover:opacity-80 transition-opacity"
            href={`/blog/${post.slug}`}
          >
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {post.metadata.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {post.metadata.summary}
                </p>
              </div>
              <div className="flex-shrink-0 text-xs text-neutral-500 font-mono">
                {formatDate(post.metadata.publishedAt, false)}
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
