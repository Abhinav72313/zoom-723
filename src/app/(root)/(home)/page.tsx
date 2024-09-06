import MeetingList from '@/components/meetingtypelist'

function Home() {
  const now = new Date()
  const time = now.toLocaleString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true})
  const date = (new Intl.DateTimeFormat('en-US',{dateStyle:'full'})).format(now)

  return (
    <div className=' space-y-4 size-full'>
    
        <div className=' rounded-lg w-full h-[300px] bg-hero bg-cover relative'>
          <div className=' z-10 absolute top-5 left-10 p-4 py-2 font-thin text-sm  bg-slate-700 rounded-lg w-fit '>
            Upcoming meeting at 12:30 pm
          </div>
          <div className=' z-10 absolute bottom-5 left-10 p-4 space-y-2'>
            <p className=' text-6xl font-bold'>

            {time}
            </p>
            <p className=' font-semibold text-muted-foreground'>
              {date}
            </p>
            
          </div>
        </div>
        <MeetingList />
    </div>

  )
}

export default Home