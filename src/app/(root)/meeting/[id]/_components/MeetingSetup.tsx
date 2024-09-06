"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(val:boolean)=>void}) => {
  const [isMicCamToggledOn, setMicCamToggledOn] =useState<boolean>(false);
  const call = useCall();

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.microphone.disable();
      call?.camera.disable();
    } else {
      call?.microphone.enable();
      call?.camera.enable();
    }
  }, [isMicCamToggledOn]);

  if(!call) return <></>

  return (
    <div className=" flex h-full py-4 w-full flex-col items-center justify-center gap-6">
      <h1 className=" text-2xl font-bold">Setup</h1>

      <VideoPreview className="sm:w-2/3 text-center bg-slate-700 rounded-md border-dotted border-2 border-primary" />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms2"
          checked={isMicCamToggledOn}
          onCheckedChange={(e) => setMicCamToggledOn(e === true)}
        />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Join Meeting with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className=" bg-green-500 hover:bg-green-700" onClick={()=>{
        call.join()
        setIsSetupComplete(false)
      }}>Join Meeting</Button>
    </div>
  );
};

export default MeetingSetup;
