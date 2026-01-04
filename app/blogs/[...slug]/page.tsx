import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from '@/components/Link'

export default async function Page({ params }: { params: Promise < { slug: string } >}) {
  const {slug} = await params;
    const post = allBlogs.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12 text-center">
        <time className="text-gray-500 text-sm font-semibold uppercase">{new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</time>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-gray-900 dark:text-gray-100 leading-tight">
          {post.title}
        </h1>
      </header>
      
      {/* The MDX Content is rendered here */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-pink">
        <MDXLayoutRenderer code={post.body.code} components={components} />
      </div>
      
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <Link href="/blog" className="text-pink-600 font-bold hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}