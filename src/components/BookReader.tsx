'use client'

import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { AozoraBook } from '@/data/aozora'

interface BookReaderProps {
  book: AozoraBook
  onClose: () => void
}

const DEFAULT_CONTENT = [
  '本文の取得に失敗しました。しばらく待ってから再度お試しください。',
  '青空文庫の図書カードから本文を確認できます。',
]

const PAGE_CHARS = 1200

const paginateText = (text: string, maxChars: number) => {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  const pages: string[] = []
  let buffer = ''
  for (const paragraph of paragraphs) {
    const next = buffer ? `${buffer}\n\n${paragraph}` : paragraph
    if (next.length > maxChars && buffer) {
      pages.push(buffer)
      buffer = paragraph
      continue
    }
    buffer = next
  }
  if (buffer) pages.push(buffer)
  return pages
}

export default function BookReader({ book, onClose }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [pages, setPages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    let isActive = true
    const controller = new AbortController()

    const loadText = async () => {
      setCurrentPage(0)
      setIsLoading(true)
      setError(null)
      setPages([])
      try {
        const response = await fetch(`/api/aozora?url=${encodeURIComponent(book.textUrl)}`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error('本文の取得に失敗しました。')
        }
        const html = await response.text()
        if (!isActive) return
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const rawText = doc.body?.innerText || doc.body?.textContent || html
        const normalized = rawText
          .replace(/\r\n/g, '\n')
          .replace(/\n{3,}/g, '\n\n')
          .trim()
        const nextPages = paginateText(normalized, PAGE_CHARS)
        setPages(nextPages.length ? nextPages : [normalized])
      } catch (err) {
        if (!isActive) return
        setError('本文の取得に失敗しました。')
        setPages(DEFAULT_CONTENT)
      } finally {
        if (!isActive) return
        setIsLoading(false)
      }
    }

    loadText()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [book.id, book.textUrl])

  const content = pages.length ? pages[currentPage] : ''
  const pageCount = pages.length || 1

  const nextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#f2e8d5_0%,#b1845a_55%,#4c3a2f_100%)] flex items-center justify-center z-50 backdrop-blur-sm px-4">
      <div className="relative bg-gradient-to-br from-[#FBF3E4] via-[#F7EAD3] to-[#EBD7B3] rounded-[28px] shadow-2xl w-full max-w-5xl h-[82vh] flex flex-col border border-amber-200">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-[#3B2F28] text-amber-100 text-xs tracking-[0.35em]">
          AOZORA READER
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#6F4B2E] via-[#8C5D3C] to-[#6F4B2E] text-amber-50 p-6 rounded-t-[28px] flex justify-between items-center border-b border-amber-200">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase opacity-70">Aozora Bunko</p>
            <h2 className="text-3xl font-semibold mt-1">{book.title}</h2>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-sm opacity-90">{book.author}</p>
              <span className="text-[10px] uppercase tracking-[0.25em] bg-white/15 px-2 py-1 rounded-full">
                {book.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/15 hover:bg-white/25 rounded-full transition-all duration-200"
            aria-label="閉じる"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-5 overflow-hidden">
          <div className="h-full bg-[#FFF9EE] rounded-2xl border border-amber-200 shadow-inner flex flex-col">
            <div className="flex-1 px-10 py-8 overflow-y-auto">
              {isLoading ? (
                <div className="space-y-4 animate-pulse text-amber-900/60">
                  <div className="h-4 bg-amber-200/60 rounded w-3/4" />
                  <div className="h-4 bg-amber-200/50 rounded w-full" />
                  <div className="h-4 bg-amber-200/50 rounded w-5/6" />
                  <div className="h-4 bg-amber-200/40 rounded w-4/6" />
                  <div className="h-4 bg-amber-200/40 rounded w-3/6" />
                </div>
              ) : (
                <pre className="text-[#2F2620] whitespace-pre-wrap font-serif text-lg leading-relaxed">
                  {content}
                </pre>
              )}
              {error && (
                <p className="mt-4 text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#F3E2C8] to-[#F9EBD4] p-5 rounded-b-[28px] flex flex-wrap gap-4 justify-between items-center border-t border-amber-200">
          <button
            onClick={prevPage}
            disabled={currentPage === 0 || isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#6F4B2E] text-amber-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5C3E27] transition-colors"
          >
            <ChevronLeft size={18} />
            前のページ
          </button>

          <div className="text-center">
            <span className="text-sm text-[#5A4B41] font-medium">
              {currentPage + 1} / {pageCount} ページ
            </span>
            <div className="flex gap-1 mt-2 justify-center">
              {Array.from({ length: Math.min(pageCount, 12) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentPage ? 'bg-[#6F4B2E]' : 'bg-[#D7C4A8]'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === pageCount - 1 || isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#6F4B2E] text-amber-50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5C3E27] transition-colors"
          >
            次のページ
            <ChevronRight size={18} />
          </button>

          <div className="flex items-center gap-3 text-xs text-[#7A6350]">
            <span>青空文庫より</span>
            <a
              href={book.cardUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#5C3E27]"
            >
              図書カード
              <ExternalLink size={12} />
            </a>
            <a
              href={book.textUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#5C3E27]"
            >
              XHTML版
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
