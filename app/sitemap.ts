import { MetadataRoute } from 'next'
import { getBlogPosts, getProjects } from 'app/blog/utils'

export const baseUrl = 'https://lucakursawe.xyz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  let projects = getProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.metadata.publishedAt,
    changeFrequency: 'monthly' as const, 
    priority: 0.8,
  }))

  let routes = ['', '/blog', '/projects', '/experience', '/gallery'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  return [...routes, ...blogs, ...projects]
}
