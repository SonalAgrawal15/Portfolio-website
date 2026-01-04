import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const displayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* 1. Header Section */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl dark:text-gray-100">
          Blog
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          A collection of my thoughts on strategy, technology, and career.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 py-12">
        {/* 2. Left Sidebar: "At a Glance" list */}
        <aside className="hidden md:block w-1/4 sticky top-24 self-start">
          <h2 className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 mb-6">
            Recent Posts
          </h2>
          <nav className="flex flex-col space-y-5">
            {posts.slice(0, 8).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors leading-tight"
              >
                {post.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* 3. Right Content: Vertical list of cards */}
        <main className="flex-1 space-y-12">
          {!displayPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { slug, date, title, summary, tags, images } = post
            return (
              <article 
                key={slug} 
                className="group flex flex-col lg:flex-row gap-8 items-start pb-10 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                {/* Blog Image Container (Mirroring Project Card style) */}
                <div className="relative w-full lg:w-80 h-52 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                  <Link href={`/blog/${slug}`} className="w-full h-full block">
                    <Image
                      src={images?.[0] || '/static/images/twitter-card.png'} // Fallback image
                      alt={title}
                      width={500}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, 'en-US')}</time>
                      <span className="text-gray-300">|</span>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100 hover:text-pink-600 transition-colors">
                        {title}
                      </Link>
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                    {summary}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-pink-600 hover:text-pink-700 dark:text-pink-400 font-bold flex items-center gap-1 group/btn"
                    >
                      Read full article
                      <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </main>
      </div>
    </div>
  )
}