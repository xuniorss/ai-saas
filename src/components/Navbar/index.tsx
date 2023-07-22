import { getApiLimitCount } from '@/lib/api-limit'
import { UserButton } from '@clerk/nextjs'

import { MobileSidebar } from '../MobileSidebar'

export const Navbar = async () => {
   const apiLimitCount = await getApiLimitCount()

   return (
      <header className="flex items-center p-4">
         <MobileSidebar apiLimitCount={apiLimitCount} />
         <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/" />
         </div>
      </header>
   )
}
