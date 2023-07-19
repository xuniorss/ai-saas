'use client'

import { routes } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['600'] })

export const Sidebar = () => {
   const pathname = usePathname()

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
                     className={cn(
                        'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                        pathname === route.href
                           ? 'text-white bg-white/10'
                           : 'text-zinc-400'
                     )}
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
