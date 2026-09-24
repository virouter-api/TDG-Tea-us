import { asset } from "@/lib/asset";
import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TDG Tea — Proactive Wellness, One Sip at a Time',
  description: 'Vietnamese herbal tea for a healthier daily ritual. Six traditional blends, 100% natural herbs, no preservatives.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: asset("/icon-light-32x32.png"),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: asset("/icon-dark-32x32.png"),
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: asset("/icon.svg"),
        type: 'image/svg+xml',
      },
    ],
    apple: asset("/apple-icon.png"),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
