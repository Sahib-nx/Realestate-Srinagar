import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <p className="font-['Newsreader'] text-3xl text-[#212121]">Post not found</p>
      <Link
        href="/blog"
        className="font-['Inter'] text-[13px] uppercase tracking-[0.05em] text-[#00523C] underline-offset-4 hover:underline"
      >
        ← Back to Blog
      </Link>
    </div>
  )
}