import dbConnect from '@/lib/mongodb'
import Post, { IPost } from '@/lib/models/Post'

export type PlainPost = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: IPost['category']
  coverImage: string
  author: string
  published: boolean
  createdAt: string
  updatedAt: string
}

// Mongoose .lean() docs still carry ObjectId/Date instances — serialize them
// to plain strings so they're safe to pass from a Server Component into JSX
// and safe to JSON.stringify for JSON-LD.
function serialize(doc: any): PlainPost {
  return {
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    category: doc.category,
    coverImage: doc.coverImage || '',
    author: doc.author || 'Realestate Srinagar',
    published: !!doc.published,
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt ?? doc.createdAt).toISOString(),
  }
}

/** All published posts, newest first. Used by the blog index + sitemap. */
export async function getAllPosts(): Promise<PlainPost[]> {
  await dbConnect()
  const posts = await Post.find({ published: true }).sort({ createdAt: -1 }).lean()
  return posts.map(serialize)
}

/** Single published post by slug. Used by the post detail page. */
export async function getPostBySlug(slug: string): Promise<PlainPost | null> {
  await dbConnect()
  const post = await Post.findOne({ slug, published: true }).lean()
  return post ? serialize(post) : null
}

/** All slugs of published posts — used by generateStaticParams. */
export async function getAllSlugs(): Promise<string[]> {
  await dbConnect()
  const posts = await Post.find({ published: true }).select('slug').lean()
  return posts.map((p: any) => p.slug)
}