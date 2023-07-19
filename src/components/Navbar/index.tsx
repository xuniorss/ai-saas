import { UserButton } from '@clerk/nextjs'

import { MobileSidebar } from '../MobileSidebar'

export const Navbar = () => {
   return (
      <header className="flex items-center p-4">
         <MobileSidebar />
         <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/" />
         </div>
      </header>
   )
}
