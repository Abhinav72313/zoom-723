"use client";

import { toast } from "@/hooks/use-toast";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import {
    CalendarArrowDown,
    CalendarArrowUp,
    Copy,
    ExternalLink,
    LucideVideo,
    Play,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function CallCard({
  call,
  type,
  callRecordings,
}: {
  call?: Call;
  type: "upcomming" | "ended" | "recordings";
  callRecordings?: CallRecording;
}) {
  const startsAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(call?.state.startsAt!.toISOString() || new Date()));

  const endedAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(call?.state.endedAt?.toISOString() || new Date()));
  const router = useRouter();

  return (
    <div className=" p-4 h-56 bg-secondary-foreground rounded-lg flex flex-col items-stretch justify-start gap-4">
      {type === "upcomming" && <CalendarArrowUp />}
      {type === "recordings" && <LucideVideo />}
      {type === "ended" && <CalendarArrowDown />}

      {call && type !== "recordings" && (
        <div className=" space-y-2">
          <h1 className=" text-4xl font-bold">
            {call.state.custom.description}
          </h1>
          <p>{type == "ended" ? endedAt : startsAt}</p>
        </div>
      )}

      {callRecordings && type === "recordings" && (
        <>
          <div className=" space-y-2">
            <h1 className=" text-xl text-nowrap text-ellipsis overflow-hidden font-bold">
              {callRecordings.filename}
            </h1>
            <p>{new Date(callRecordings.start_time).toLocaleDateString()}</p>
          </div>
          <div className=" flex gap-2 mt-auto">
            <Button
              className=" space-x-2"
              onClick={() => router.push(callRecordings.url)}
            >
              <Play size={20} />
              <p>Play</p>
            </Button>
            <Button
              className=" flex items-center gap-2 text-sm px-2"
              variant={"secondary"}
              onClick={() => {
                navigator.clipboard.writeText(callRecordings.url);
                toast({title:'Link Copied'})
              }}
            >
              <ExternalLink size={20} />
              <p >Share Link</p>
            </Button>
          </div>
        </>
      )}

      {call && type === "upcomming" && (
        <div className=" flex gap-2 mt-auto">
          <Button
            className=" w-32"
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`
              )
            }
          >
            Start
          </Button>
          <Button
            className=" flex items-center gap-4"
            variant={"secondary"}
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`
              );
            }}
          >
            <Copy size={20} />
            <p>Copy link</p>
          </Button>
        </div>
      )}
    </div>
  );
}

export default CallCard;
