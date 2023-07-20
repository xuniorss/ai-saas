'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'
import { Button } from '../ui/button'

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   label: string
   isDisabled?: boolean
   size?: 'icon' | 'default' | 'sm' | 'lg' | null | undefined
}

export const FormButton = ({
   label = '',
   isDisabled = false,
   className,
   size = 'default',
   ...rest
}: FormButtonProps) => {
   return (
      <Button
         {...rest}
         className={cn(
            'col-span-12 lg:col-span-2 w-full capitalize',
            className
         )}
         disabled={isDisabled}
         size={size}
      >
         {label}
      </Button>
   )
}
