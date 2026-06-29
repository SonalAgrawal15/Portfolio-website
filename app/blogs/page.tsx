import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import Image from '@/components/Image'
import { formatDate } from 'pliny/utils/formatDate'

export default async function BlogPage() {
  // This version fetches everything in data/blog without a strict name filter
  const posts = allCoreContent(sortPosts(allBlogs))

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-10 border-b pb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Blog
      </h1>

      <main className="space-y-12">
        {posts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500">Coming soon</p>
          </div>
        )}

        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col items-start gap-8 border-b border-gray-100 pb-12 last:border-0 md:flex-row dark:border-gray-800"
          >
            {/* Image Section */}
            <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 md:w-72 dark:border-gray-700 dark:bg-gray-800">
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.images?.[0] || '/static/images/twitter-card.png'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
            </div>

            {/* Content Section */}
            <div className="flex-1">
              <time className="text-sm font-medium tracking-widest text-gray-500 uppercase">
                {formatDate(post.date, 'en-US')}
              </time>
              <h2 className="mt-2 mb-3 text-2xl font-bold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-900 transition-colors hover:text-pink-600 dark:text-gray-100"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">{post.summary}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="font-bold text-pink-600 hover:underline dark:text-pink-400"
              >
                Read Full Post →
              </Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}
