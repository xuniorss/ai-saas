'use client'

import { MAX_FREE_COUNTS } from '@/constants'
import { Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Progress } from '../ui/progress'

interface FreeCounterProps {
   apiLimitCount: number
}

export const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
   const [isMouted, setIsMounted] = useState(false)

   useEffect(() => setIsMounted(true), [])

   return (
      <section className="px-3">
         <Card className="bg-white/10 border-0">
            <CardContent className="py-6">
               <div className="text-center text-sm text-white mb-4 space-y-2">
                  <p>
                     {apiLimitCount} / {MAX_FREE_COUNTS} Gerações Gratuitas
                  </p>
                  <Progress
                     className="h-3"
                     value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                  />
               </div>
               <Button
                  aria-label="button-upgrade-plan"
                  className="w-full"
                  variant="premium"
               >
                  Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
               </Button>
            </CardContent>
         </Card>
      </section>
   )
}
