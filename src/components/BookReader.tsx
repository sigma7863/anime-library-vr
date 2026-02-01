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
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/90 to-pink-900/90 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl max-w-4xl w-full h-3/4 flex flex-col border-4 border-amber-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-t-2xl flex justify-between items-center border-b-4 border-amber-700">
          <div>
            <h2 className="text-2xl font-bold mb-1">{book.title}</h2>
            <p className="text-sm opacity-90">{book.author}</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 transform hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-amber-50/50 to-orange-50/50">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl min-h-[400px] border-2 border-amber-200">
              <div className="absolute top-4 left-4 w-8 h-8 bg-pink-400 rounded-full opacity-20"></div>
              <div className="absolute top-8 right-6 w-6 h-6 bg-purple-400 rounded-full opacity-20"></div>
              <div className="absolute bottom-6 left-8 w-10 h-10 bg-amber-400 rounded-full opacity-20"></div>
              
              <pre className="text-gray-800 whitespace-pre-wrap font-serif text-lg leading-relaxed relative z-10">
                {content[currentPage]}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-b-2xl flex justify-between items-center border-t-4 border-amber-200">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <ChevronLeft size={18} />
            前のページ
          </button>
          
          <div className="text-center">
            <span className="text-sm text-gray-600 font-medium">
              {currentPage + 1} / {content.length} ページ
            </span>
            <div className="flex gap-1 mt-1 justify-center">
              {content.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentPage ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={nextPage}
            disabled={currentPage === content.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            次のページ
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
