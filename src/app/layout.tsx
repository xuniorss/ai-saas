import { ModalProvider } from '@/components/ModalProvider'
import { ToastProvider } from '@/components/ToastProvider'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'

import { CrispProvider } from '@/components/CrispProvider'
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
            <CrispProvider />
            <body className={cn('antialiased', inter.className)}>
               <ModalProvider />
               <ToastProvider />
               {children}
            </body>
         </html>
      </ClerkProvider>
   )
}
