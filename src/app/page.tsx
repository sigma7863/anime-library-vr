'use client'

import { useState } from 'react'
import Experience from '@/components/Experience'
import SearchPanel from '@/components/SearchPanel'
import { Search } from 'lucide-react'

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="w-full h-screen relative">
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 text-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Anime Library VR</h1>
        <p className="text-sm mb-2">学校図書室シミュレーター</p>
        <div className="text-xs space-y-1">
          <p>WASD/矢印キー: 移動</p>
          <p>Shift: 走る</p>
          <p>クリック: 本を開く</p>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="absolute top-4 right-4 z-10 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
      >
        <Search size={20} />
      </button>

      {/* 3D Scene */}
      <Experience />

      {/* Search Panel */}
      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onBookSelect={(bookId) => {
          console.log(`Selected book: ${bookId}`)
          // TODO: Implement book highlighting/navigation
        }}
      />
    </div>
  )
}
