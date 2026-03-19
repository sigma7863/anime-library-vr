'use client'

import { useState } from 'react'
import Experience from '@/components/Experience'
import SearchPanel from '@/components/SearchPanel'
import { Search, BookOpen } from 'lucide-react'
import { AozoraBook } from '@/data/aozora'

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<AozoraBook | null>(null)

  return (
    <div className="w-full h-screen relative">
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-[#F9F1E3]/90 text-[#3B2F28] p-5 rounded-2xl border border-amber-200 shadow-lg backdrop-blur">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-[#6F4B2E] text-amber-50 flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-[#7A6350]">Aozora Bunko</p>
            <h1 className="text-2xl font-semibold">図書館ブラウザ</h1>
          </div>
        </div>
        <p className="text-sm text-[#5A4B41] mb-3">静かな閲覧室を歩き、本を開いて読む。</p>
        <div className="text-xs grid grid-cols-2 gap-2 text-[#6A584B]">
          <p>WASD/矢印: 移動</p>
          <p>Shift: 走る</p>
          <p>クリック: 本を開く</p>
          <p>検索: 右上ボタン</p>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="absolute top-4 right-4 z-10 bg-[#6F4B2E] text-amber-50 p-3 rounded-full shadow-lg hover:bg-[#5C3E27] transition-colors"
        aria-label="検索を開く"
      >
        <Search size={20} />
      </button>

      {/* 3D Scene */}
      <Experience
        selectedBook={selectedBook}
        onBookSelect={(book) => setSelectedBook(book)}
        onCloseBook={() => setSelectedBook(null)}
      />

      {/* Search Panel */}
      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onBookSelect={(book) => {
          setSelectedBook(book)
          setIsSearchOpen(false)
        }}
      />
    </div>
  )
}
