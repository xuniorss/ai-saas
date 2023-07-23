'use client'

import { routes } from '@/constants/routes'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import TypewriterComponent from 'typewriter-effect'
import { Button } from '../ui/button'

export const LandingHero = () => {
   const { isSignedIn } = useAuth()

   return (
      <section className="text-white font-bold py-36 text-center space-y-5">
         <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>A melhor ferramenta de IA para</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
               <TypewriterComponent
                  options={{
                     strings: routes
                        .slice(1, routes.length - 1)
                        .map((str) => `${str.label}.`),
                     autoStart: true,
                     loop: true,
                  }}
               />
            </div>
         </div>
         <h3 className="text-sm md:text-xl font-light text-zinc-400">
            Crie conteúdo usando IA 10 vezes mais rápido.
         </h3>
         <div>
            <Link
               aria-label={`ir para ${isSignedIn ? 'dashboard' : 'login'}`}
               href={isSignedIn ? '/dashboard' : '/sign-up'}
            >
               <Button
                  variant="premium"
                  className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
               >
                  Comece a gerar gratuitamente
               </Button>
            </Link>
         </div>
         <h5 className="text-zinc-400 text-xs md:text-sm font-normal">
            Não é necessário cartão de crédito
         </h5>
      </section>
   )
}
