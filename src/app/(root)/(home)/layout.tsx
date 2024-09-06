import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" w-full h-full">
      <Navbar />
      <div className=" flex ">
        <Sidebar />
        <div className=" min-h-screen p-4 flex flex-1 flex-col">
          <div className=" w-full">{children}</div>
        </div>
      </div>
    </main>
  );
}

export default HomeLayout;
