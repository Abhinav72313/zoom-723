import CallList from '@/components/callList'
import React from 'react'

function Upcomming() {

  return (
  <div className=' size-full flex flex-col gap-8 p-4'>
    <h1 className=' text-2xl font-bold'>Upcomming Meetings</h1>
    <CallList type='upcomming' />
  </div>
  )
}

export default Upcomming