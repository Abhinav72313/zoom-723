import CallList from '@/components/callList'
import React from 'react'

function Recordings() {
  return (
    <div className=' size-full flex flex-col gap-8 p-4'>
    <h1 className=' text-2xl font-bold'>Previous Meetings</h1>
    <CallList type='recordings'  />
  </div>
  )
}

export default Recordings