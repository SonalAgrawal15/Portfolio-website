import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from '@/components/Link'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = allBlogs.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12 text-center">
        <time className="text-sm font-semibold text-gray-500 uppercase">
          {new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' })}
        </time>
        <h1 className="mt-4 text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl dark:text-gray-100">
          {post.title}
        </h1>
      </header>

      {/* The MDX Content is rendered here */}
      <div className="prose prose-lg dark:prose-invert prose-pink max-w-none">
        <MDXLayoutRenderer code={post.body.code} components={components} />
      </div>

      <div className="mt-16 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
        <Link href="/blog" className="font-bold text-pink-600 hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}
