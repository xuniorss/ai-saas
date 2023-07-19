import {
   Code,
   ImageIcon,
   LayoutDashboard,
   LucideIcon,
   MessageSquare,
   Music,
   Settings,
   VideoIcon,
} from 'lucide-react'

type RouteProps = {
   label: string
   icon: LucideIcon
   href: string
   color?: string
   bgColor?: string
}

export const routes: RouteProps[] = [
   {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: 'text-sky-500',
   },
   {
      label: 'Conversação',
      icon: MessageSquare,
      href: '/conversation',
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10',
   },
   {
      label: 'Geração de Imagem',
      icon: ImageIcon,
      href: '/image',
      color: 'text-pink-700',
      bgColor: 'bg-pink-700/10',
   },
   {
      label: 'Geração de Vídeo',
      icon: VideoIcon,
      href: '/video',
      color: 'text-orange-700',
      bgColor: 'bg-orange-700/10',
   },
   {
      label: 'Geração de Musical',
      icon: Music,
      href: '/music',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
   },
   {
      label: 'Geração de Código',
      icon: Code,
      href: '/code',
      color: 'text-green-700',
      bgColor: 'bg-green-700/10',
   },
   {
      label: 'Configurações',
      icon: Settings,
      href: '/settings',
   },
]
