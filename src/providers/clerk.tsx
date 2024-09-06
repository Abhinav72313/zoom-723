'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

function Clerk({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  return (
    <ClerkProvider 
      appearance={{
        layout:{
            logoImageUrl:'/zoom.svg',
        },
        baseTheme: resolvedTheme == "dark" ? dark : experimental__simple,
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export default Clerk;
