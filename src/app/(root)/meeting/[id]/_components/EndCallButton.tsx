"use client";

import { Button } from "@/components/ui/button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

function EndCallButton() {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localparticipant = useLocalParticipant();


  const isMeetingOwner =
    localparticipant &&
    call?.state.createdBy &&
    call.state.createdBy.id === localparticipant.userId;

  if (!isMeetingOwner) return null;

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        call.endCall();
        router.push("/");
      }}
    >
      End Call for Everyone
    </Button>
  );
}

export default EndCallButton;
