import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// POST /api/upload
// Signed Cloudinary upload — no upload preset needed.
// Uses API key + secret (server-side only, never exposed to browser).
//
// Required env vars in .env.local:
//   CLOUDINARY_CLOUD_NAME=your_cloud_name
//   CLOUDINARY_API_KEY=your_api_key
//   CLOUDINARY_API_SECRET=your_api_secret
//   ADMIN_SECRET=your_admin_secret  ← already have this

export async function POST(req: NextRequest) {
  // Only admins can upload
  const secret = req.headers.get('x-admin-secret')
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey    = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Missing Cloudinary env vars. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env.local' },
      { status: 500 }
    )
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10 MB.' }, { status: 400 })
    }

    // Build the signed request
    // Cloudinary signature: SHA-1 of "folder=...&timestamp=...{api_secret}"
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const folder    = 'realestate-srinagar/blog'

    const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto
      .createHash('sha1')
      .update(signaturePayload)
      .digest('hex')

    // Build the multipart form for Cloudinary
    const cloudForm = new FormData()
    cloudForm.append('file', file)
    cloudForm.append('timestamp', timestamp)
    cloudForm.append('api_key', apiKey)
    cloudForm.append('signature', signature)
    cloudForm.append('folder', folder)

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: cloudForm }
    )

    const cloudData = await cloudRes.json()

    if (!cloudRes.ok) {
      return NextResponse.json(
        { error: cloudData?.error?.message || 'Cloudinary upload failed' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      url: cloudData.secure_url,
      public_id: cloudData.public_id,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
  }
}