// components/ImageUpload.tsx
// Drop-in image uploader for the blog admin pages.
// Shows a file picker, drag-and-drop zone, upload progress, and preview.
// On success it calls onUpload(url) so the parent stores the Cloudinary URL.

'use client'

import { useRef, useState } from 'react'

interface Props {
  currentUrl: string          // existing image URL (for edit page pre-fill)
  onUpload: (url: string) => void
  onClear: () => void
}

export default function ImageUpload({ currentUrl, onUpload, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)   // 0-100 fake progress for UX
  const [error, setError] = useState('')

  async function upload(file: File) {
    setError('')
    setUploading(true)
    setProgress(10)

    const secret = sessionStorage.getItem('adminSecret') || ''
    const form = new FormData()
    form.append('file', file)

    // Fake progress ticks while waiting for the server
    const ticker = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 8 : p))
    }, 400)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-secret': secret },
        body: form,
        // No Content-Type header — browser sets multipart boundary automatically
      })

      const text = await res.text()
      const data = text ? (() => { try { return JSON.parse(text) } catch { return {} } })() : {}

      if (res.ok && data.url) {
        setProgress(100)
        onUpload(data.url)
      } else {
        setError(data.error || `Upload failed (${res.status})`)
      }
    } catch {
      setError('Network error — could not reach upload API.')
    } finally {
      clearInterval(ticker)
      setUploading(false)
      setTimeout(() => setProgress(0), 600)
    }
  }

  function handleFile(file: File | undefined | null) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP, etc.)')
      return
    }
    upload(file)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0])
    // Reset input so the same file can be re-selected after a clear
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {currentUrl ? (
        /* ── Preview ────────────────────────────────────────────────────── */
        <div className="relative overflow-hidden rounded border border-[#ECECEC]">
          <img
            src={currentUrl}
            alt="Cover preview"
            className="h-48 w-full object-cover"
          />
          {/* Overlay buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-full bg-white px-4 py-1.5 font-['Inter'] text-[12px] font-medium text-[#212121] hover:bg-[#F0F0F0] disabled:opacity-50"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={onClear}
              disabled={uploading}
              className="rounded-full bg-red-500 px-4 py-1.5 font-['Inter'] text-[12px] font-medium text-white hover:bg-red-600 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
          {/* Uploading overlay */}
          {uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60">
              <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-['Inter'] text-[12px] text-white">Uploading…</span>
            </div>
          )}
        </div>
      ) : (
        /* ── Drop zone ──────────────────────────────────────────────────── */
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed transition-colors ${
            dragging
              ? 'border-[#00523C] bg-[#E8F5E9]'
              : uploading
              ? 'border-[#ECECEC] bg-[#FAFAFA] cursor-not-allowed'
              : 'border-[#ECECEC] bg-[#FAFAFA] hover:border-[#00523C] hover:bg-[#F0FAF5]'
          }`}
        >
          {uploading ? (
            <>
              <div className="h-1.5 w-48 overflow-hidden rounded-full bg-[#ECECEC]">
                <div
                  className="h-full rounded-full bg-[#00523C] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-['Inter'] text-[12px] text-[#888888]">Uploading…</span>
            </>
          ) : (
            <>
              {/* Upload icon */}
              <svg className="h-8 w-8 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="font-['Inter'] text-[13px] text-[#888888]">
                <span className="font-medium text-[#00523C]">Click to upload</span> or drag and drop
              </p>
              <p className="font-['Inter'] text-[11px] text-[#AAAAAA]">JPG, PNG, WebP — max 10 MB</p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="font-['Inter'] text-[12px] text-red-500">{error}</p>
      )}
    </div>
  )
}