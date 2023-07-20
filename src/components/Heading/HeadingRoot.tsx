import { ReactNode } from 'react'

interface HeadingRootProps {
   ariaLabel: string
   children: ReactNode
}

export const HeadingRoot = ({ ariaLabel, children }: HeadingRootProps) => {
   return (
      <section
         aria-label={`heading-${ariaLabel}`}
         className="px-4 lg:px-8 flex items-center gap-x-3 mb-8"
      >
         {children}
      </section>
   )
}
