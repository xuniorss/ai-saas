import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface HeadingIconProps {
   bgColor?: string
   iconColor?: string
   icon: LucideIcon
}

export const HeadingIcon = ({
   bgColor = '',
   iconColor = '',
   icon: Icon,
}: HeadingIconProps) => {
   return (
      <div className={cn('p-2 w-fit rounded-md', bgColor)}>
         <Icon className={cn('w-10 h-10', iconColor)} />
      </div>
   )
}
