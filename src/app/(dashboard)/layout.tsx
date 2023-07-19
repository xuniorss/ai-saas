import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
   return (
      <div className="h-full relative">
         <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] bg-gray-900">
            <Sidebar />
         </div>
         <main className="md:pl-72">
            <Navbar />
            {children}
         </main>
      </div>
   )
}
