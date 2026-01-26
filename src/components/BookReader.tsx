'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface BookReaderProps {
  book: {
    id: string
    title: string
    author: string
    content?: string[]
  }
  onClose: () => void
}

const defaultContent = [
  "第一章\n\n昔々、あるところに……",
  "第二章\n\n時が流れ、季節は巡り……",
  "第三章\n\nそして、物語は新たな章へ……",
  "第四章\n\n運命の歯車は回り始める……",
  "最終章\n\nすべての始まりと終わり……"
]

export default function BookReader({ book, onClose }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const content = book.content || defaultContent

  const nextPage = () => {
    if (currentPage < content.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-amber-50 rounded-lg shadow-2xl max-w-4xl w-full h-3/4 flex flex-col">
        {/* Header */}
        <div className="bg-amber-900 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-sm opacity-80">{book.author}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-inner min-h-[400px]">
              <pre className="text-gray-800 whitespace-pre-wrap font-serif text-lg leading-relaxed">
                {content[currentPage]}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-amber-100 p-4 rounded-b-lg flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-800 transition-colors"
          >
            <ChevronLeft size={16} />
            前のページ
          </button>
          
          <span className="text-sm text-gray-600">
            {currentPage + 1} / {content.length} ページ
          </span>
          
          <button
            onClick={nextPage}
            disabled={currentPage === content.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-800 transition-colors"
          >
            次のページ
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
