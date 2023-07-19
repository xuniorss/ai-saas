'use client'

import { Card } from '@/components/ui/card'
import { routes } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
   const router = useRouter()

   return (
      <article>
         <section aria-label="info-page" className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
               Explore o poder da IA
            </h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
               Converse com a IA mais inteligente - Experimente o poder da IA
            </p>
         </section>
         <section
            aria-label="tools"
            className="px-4 md:px-20 lg:px-32 space-y-4"
         >
            {routes.slice(1, routes.length - 1).map((tool) => (
               <Card
                  onClick={() => router.push(tool.href)}
                  key={tool.href}
                  className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
               >
                  <div className="flex items-center gap-x-4">
                     <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                        <tool.icon className={cn('w-8 h-8', tool.color)} />
                     </div>
                     <h3 className="font-semibold">{tool.label}</h3>
                  </div>
                  <ArrowRight className="w-5 h-5" />
               </Card>
            ))}
         </section>
      </article>
   )
}
