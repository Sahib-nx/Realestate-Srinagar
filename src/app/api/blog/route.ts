import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Post from '@/lib/models/Post'

// GET /api/blog — fetch all published posts (public)
// GET /api/blog?admin=true — fetch all posts including drafts (admin)
export async function GET(req: NextRequest) {
  await dbConnect()
  const isAdmin = req.nextUrl.searchParams.get('admin') === 'true'

  const filter = isAdmin ? {} : { published: true }
  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean()

  return NextResponse.json(posts)
}

// POST /api/blog — create a new post
export async function POST(req: NextRequest) {
  // Simple admin check via secret header
  const secret = req.headers.get('x-admin-secret')
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()
  const body = await req.json()

  // Auto-generate slug from title
  if (!body.slug && body.title) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      + '-' + Date.now()
  }

  try {
    const post = await Post.create(body)
    return NextResponse.json(post, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}