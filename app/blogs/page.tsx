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
      <h1 className="text-4xl font-extrabold mb-10 border-b pb-4 text-gray-900 dark:text-gray-100">
        Blog
      </h1>
      
      <main className="space-y-12">
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">Coming soon</p>
          </div>
        )}
        
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col md:flex-row gap-8 items-start pb-12 border-b border-gray-100 dark:border-gray-800 last:border-0">
            {/* Image Section */}
            <div className="relative w-full md:w-72 h-48 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
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
              <time className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                {formatDate(post.date, 'en-US')}
              </time>
              <h2 className="text-2xl font-bold mt-2 mb-3">
                <Link href={`/blog/${post.slug}`} className="text-gray-900 dark:text-gray-100 hover:text-pink-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                {post.summary}
              </p>
              <Link 
                href={`/blog/${post.slug}`} 
                className="text-pink-600 dark:text-pink-400 font-bold hover:underline"
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