import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Post from '@/lib/models/Post'

// GET /api/blog/[id] — get a single post by id or slug
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect()

  const { id } = await context.params

  const post = await Post.findById(id).lean()

  if (!post) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(post)
}


// PUT /api/blog/[id] — update a post
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const secret = req.headers.get('x-admin-secret')

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  await dbConnect()

  const { id } = await context.params

  const body = await req.json()

  const post = await Post.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!post) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(post)
}

// DELETE /api/blog/[id] — delete a post
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const secret = req.headers.get('x-admin-secret')

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  await dbConnect()

  const { id } = await context.params

  const post = await Post.findByIdAndDelete(id)

  if (!post) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    message: 'Deleted successfully',
  })
}