'use client'

import { routes } from '@/constants/routes'
import { useProModal } from '@/hooks/useProModal'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { Check, Zap } from 'lucide-react'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '../ui/dialog'

export const ProModal = () => {
   const [loading, setLoading] = useState(false)
   const proModal = useProModal()

   const onSubscribe = useCallback(async () => {
      try {
         setLoading(true)
         const response = await axios.get('/api/stripe')

         window.location.href = response.data.url
      } catch (error) {
         toast.error('Something went wrong')
      } finally {
         setLoading(false)
      }
   }, [])

   return (
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                  <div className="flex items-center gap-x-2 font-bold text-xl">
                     Upgrade para Genius
                     <Badge
                        variant="premium"
                        className="uppercase text-sm py-1"
                     >
                        pro
                     </Badge>
                  </div>
               </DialogTitle>
               <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                  {routes.slice(1, routes.length - 1).map((tool) => (
                     <Card
                        key={tool.href}
                        className="p-3 border-black/5 flex items-center justify-between"
                     >
                        <div className="flex items-center gap-x-4">
                           <div
                              className={cn(
                                 'p-2 w-fit rounded-md',
                                 tool.bgColor
                              )}
                           >
                              <tool.icon
                                 className={cn('w-6 h-6', tool.color)}
                              />
                           </div>
                           <div className="font-semibold text-sm">
                              {tool.label}
                           </div>
                        </div>
                        <Check className="text-primary w-5 h-5" />
                     </Card>
                  ))}
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button
                  disabled={loading}
                  onClick={onSubscribe}
                  size="lg"
                  variant="premium"
                  className="w-full"
               >
                  Upgrade
                  <Zap className="w-4 h-4 ml-2 fill-white" />
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
