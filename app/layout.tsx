import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AC IG Finder',
  description: 'Created by FSgt Pradeesh and Sgt Suhirthan',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
