'use client'

import { cn } from '@/lib/utils'
import {
   Code,
   ImageIcon,
   LayoutDashboard,
   LucideIcon,
   MessageSquare,
   Music,
   Settings,
   VideoIcon,
} from 'lucide-react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['600'] })

type RouteProps = {
   label: string
   icon: LucideIcon
   href: string
   color?: string
}

const routes: RouteProps[] = [
   {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: 'text-sky-500',
   },
   {
      label: 'Conversação',
      icon: MessageSquare,
      href: '/conversation',
      color: 'text-violet-500',
   },
   {
      label: 'Geração de Imagem',
      icon: ImageIcon,
      href: '/image',
      color: 'text-pink-700',
   },
   {
      label: 'Geração de Vídeo',
      icon: VideoIcon,
      href: '/video',
      color: 'text-orange-700',
   },
   {
      label: 'Geração de Musical',
      icon: Music,
      href: '/music',
      color: 'text-emerald-500',
   },
   {
      label: 'Geração de Código',
      icon: Code,
      href: '/code',
      color: 'text-green-700',
   },
   {
      label: 'Configurações',
      icon: Settings,
      href: '/settings',
   },
]

export const Sidebar = () => {
   return (
      <aside className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
         <section aria-label="user-logo" className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
               <div className="relative w-8 h-8 mr-4">
                  <Image fill alt="Logo" src="/logo.png" />
               </div>
               <h1 className={cn('text-2xl font-bold', montserrat.className)}>
                  Genius
               </h1>
            </Link>
            <section aria-label="route-group" className="space-y-1">
               {routes.map((route) => (
                  <Link
                     key={route.href}
                     href={route.href}
                     className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
                  >
                     <span className="flex items-center flex-1">
                        <route.icon
                           className={cn('h-5 w-5 mr-3', route.color)}
                        />
                        {route.label}
                     </span>
                  </Link>
               ))}
            </section>
         </section>
      </aside>
   )
}
