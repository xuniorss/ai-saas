'use client'

import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'

export const CrispChat = () => {
   useEffect(() => Crisp.configure('bad11c28-5884-4661-bd9b-c80e353dd723'), [])

   return null
}
