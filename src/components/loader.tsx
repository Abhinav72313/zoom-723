import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loader({className}:{className?:string}) {
  return (
    <div className={cn(' w-screen h-screen p-4 flex items-center justify-center',className)}>
        <Loader2 className='h-12 w-12 animate-spin' />
    </div>
  )
}
