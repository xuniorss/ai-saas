import './globals.css'

import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Genius',
   description: 'AI Plataform',
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <ClerkProvider>
         <html lang="pt-BR">
            <body className={cn('antialiased', inter.className)}>
               {children}
            </body>
         </html>
      </ClerkProvider>
   )
}
