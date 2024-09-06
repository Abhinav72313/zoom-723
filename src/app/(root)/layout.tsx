import { StreamProvider } from "@/providers/stream";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StreamProvider>
      {children}
    </StreamProvider>
  );
}

export default RootLayout;
