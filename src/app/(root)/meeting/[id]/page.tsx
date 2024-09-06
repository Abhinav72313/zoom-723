"use client";

import Loader from "@/components/loader";
import { useGetCallbyId } from "@/hooks/useGetCallbyId";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { ReactElement, useState } from "react";
import MeetingRoom from "./_components/MeetingRoom";
import MeetingSetup from "./_components/MeetingSetup";


const Meeting = ({params}:{params:{id:string}}): ReactElement => {

  const [isSetup, setisSetup] = useState<boolean>(true);
  const {call} = useGetCallbyId(params.id)
  if(!call) return <Loader />

  return (
    <main className="h-full w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetup ? <MeetingSetup setIsSetupComplete={setisSetup} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
