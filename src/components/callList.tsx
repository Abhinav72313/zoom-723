'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import CallCard from './callcard'
import Loader from './loader'
import { useEffect, useState } from 'react'
import { CallRecording } from '@stream-io/video-react-sdk'

function CallList({type}:{type:'upcomming'|'ended'|'recordings'}) {
    const { endedCalls,Recordings,upcommingCalls,isloading} = useGetCalls()

    const getCalls = ()=>{
        switch (type) {
            case 'upcomming':
                return upcommingCalls
            case 'ended':
                return endedCalls
            case 'recordings':
                return Recordings
            default:
                return []
        }
    }

    const getNoCallsMessage = ()=>{
        switch (type) {
            case 'upcomming':
                return 'No upcomming calls'
            case 'ended':
                return 'No ended calls'
            case 'recordings':
                return 'No recordings'
            default:
                return ''
        }
    }

    const [callRecordings, setCallRecordings] = useState<CallRecording[]>([])

    useEffect(()=>{
        const fetchRecordings = async ()=>{

            const callData = await Promise.all(Recordings.map((meeting)=>{
                return meeting.queryRecordings()
            }))

            const recordings = callData.filter(call=>call.recordings.length > 0).flatMap(call=>call.recordings)

            setCallRecordings(recordings)
        }

        if(type == 'recordings') fetchRecordings()
    },[type,Recordings])

    const calls = getCalls();
    const noCallMessage = getNoCallsMessage()

    if(isloading) return <Loader className=' size-full' />

    console.log(callRecordings)

  return (
    <div className=' grid gap-10 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row'>
        {type !== 'recordings' && (calls.length > 0 ? calls.map(call=>{
            return(
                <CallCard key={call.id} call={call} type={type}/>
            )
        }):noCallMessage)}

        {callRecordings && callRecordings.map(call=>{
            return (
                <CallCard key={call.url} type={type} callRecordings={call}/>
            )
        })}
    </div>
  )
}

export default CallList