import { NextRequest } from 'next/server'

const allowedHosts = new Set(['www.aozora.gr.jp', 'aozora.gr.jp'])

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url')
  if (!urlParam) {
    return new Response('Missing url parameter', { status: 400 })
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(urlParam)
  } catch {
    return new Response('Invalid url parameter', { status: 400 })
  }

  if (!allowedHosts.has(targetUrl.hostname) || !targetUrl.pathname.startsWith('/cards/')) {
    return new Response('Blocked url', { status: 403 })
  }

  const response = await fetch(targetUrl.toString(), {
    cache: 'force-cache',
  })

  if (!response.ok) {
    return new Response('Failed to fetch text', { status: 502 })
  }

  const buffer = await response.arrayBuffer()
  const decoder = new TextDecoder('shift_jis')
  const decoded = decoder.decode(buffer)

  return new Response(decoded, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
