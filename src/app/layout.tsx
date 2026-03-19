import type { Metadata } from 'next'
import { Cormorant_Garamond, Zen_Kaku_Gothic_New } from 'next/font/google'
import './globals.css'

const displayFont = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const bodyFont = Zen_Kaku_Gothic_New({
  variable: '--font-body',
  subsets: ['latin', 'japanese'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: '青空文庫 図書館ブラウザ',
  description: '青空文庫の本を、図書館空間で読むブラウザ体験。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
