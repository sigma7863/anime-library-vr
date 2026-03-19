'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { aozoraBooks, AozoraBook } from '@/data/aozora'

interface SearchPanelProps {
  isOpen: boolean
  onClose: () => void
  onBookSelect: (book: AozoraBook) => void
}

export default function SearchPanel({ isOpen, onClose, onBookSelect }: SearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('すべて')

  const categories = ['すべて', ...Array.from(new Set(aozoraBooks.map(book => book.category)))]

  const filteredBooks = aozoraBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'すべて' || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (!isOpen) return null

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-[#FCF6EC] shadow-2xl z-40 flex flex-col border-l border-amber-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white p-4 flex justify-between items-center">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase opacity-70">Aozora Bunko</p>
          <h2 className="text-xl font-bold">図書検索</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-amber-800 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-amber-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="書名や著者で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full mt-3 px-3 py-2 border border-amber-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-sm text-gray-600 mb-3">
          {filteredBooks.length} 件見つかりました
        </div>
        
        <div className="space-y-3">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className="p-3 border border-amber-200 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors"
              onClick={() => {
                onBookSelect(book)
                onClose()
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  {book.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            見つかりませんでした
          </div>
        )}
      </div>
    </div>
  )
}
