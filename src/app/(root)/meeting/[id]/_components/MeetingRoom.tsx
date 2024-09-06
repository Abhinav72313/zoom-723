"use client";

import Loader from "@/components/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LayoutDashboard, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setlayout] = useState<CallLayoutType>("speaker-right");
  const [showParticipantsList, setShowParticipantsList] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const isPersonal = !!searchParams.get("personal")
  const router = useRouter();
  const CallLayout = () => {
    switch (layout) {
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"right"} />;
      default:
        return <PaginatedGridLayout ParticipantViewUI={null} />;
    }
  };

  const { useCallCallingState} = useCallStateHooks()
  const callingstate = useCallCallingState()

  if(callingstate === CallingState.LEFT) return <div className=" flex items-center justify-center p-10 text-center">Call Ended</div>

  if(callingstate !== CallingState.JOINED) return <Loader />

  return (
    <section className=" relative h-screen w-full overflow-hidden pt-8">
      <div className=" relative flex size-full justify-center items-center">
        <div className=" size-full max-w-[1200px] flex items-center justify-center relative">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2 px-4 py-2 rounded-lg', {
            'show-block': showParticipantsList,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipantsList(false)} />
        </div>
      </div>

      <div className=" fixed bottom-0 flex w-full items-center justify-center flex-wrap gap-4">
        <CallControls onLeave={() => router.push("/")} />
        <DropdownMenu>
          <DropdownMenuTrigger className=" p-2 rounded-full overflow-clip bg-slate-700">
            <LayoutDashboard size={20} className="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" space-y-2 bg-secondary-foreground text-primary-foreground border-none">
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => setlayout("grid")}
            >
              Grid Layout
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => setlayout("speaker-left")}
            >
              Speaker Left Layout
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => setlayout("speaker-right")}
            >
              Speaker Right Layout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          className=" p-2 bg-slate-700 rounded-full"
          onClick={() => setShowParticipantsList((prev) => !prev)}
        >
          <Users />
        </button>
        {!isPersonal && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
