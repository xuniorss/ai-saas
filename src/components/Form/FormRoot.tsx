'use client'

import { cn } from '@/lib/utils'
import { FormHTMLAttributes, ReactNode } from 'react'

interface FormRootProps extends FormHTMLAttributes<HTMLFormElement> {
   children: ReactNode
}

export const FormRoot = ({ children, className, ...rest }: FormRootProps) => {
   return (
      <form
         {...rest}
         className={cn(
            'rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2',
            className
         )}
      >
         {children}
      </form>
   )
}
