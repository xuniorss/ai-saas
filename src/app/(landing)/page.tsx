import { LandingContent } from '@/components/LandingContent'
import { LandingHero } from '@/components/LandingHero'
import { LandingNavbar } from '@/components/LandingNavbar'

export default function LandingPage() {
   return (
      <article className="h-full">
         <LandingNavbar />
         <LandingHero />
         <LandingContent />
      </article>
   )
}
