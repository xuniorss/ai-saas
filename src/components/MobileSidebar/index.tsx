'use client'

import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Sidebar } from '../Sidebar'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

export const MobileSidebar = ({ apiLimitCount }: { apiLimitCount: number }) => {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => setIsMounted(true), [])

   if (!isMounted) return null

   return (
      <Sheet>
         <SheetTrigger>
            <Button
               aria-label="open/close sidebar"
               variant="ghost"
               size="icon"
               className="md:hidden"
            >
               <Menu />
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="p-0">
            <Sidebar apiLimitCount={apiLimitCount} />
         </SheetContent>
      </Sheet>
   )
}
