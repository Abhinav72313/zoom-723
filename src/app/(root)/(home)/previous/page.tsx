import CallList from "@/components/callList";
import React from "react";

function Previous() {
  return (
    <div className=" size-full flex flex-col gap-8 p-4">
      <h1 className=" text-2xl font-bold">Previous Meetings</h1>
      <CallList type="ended" />
    </div>
  );
}

export default Previous;
