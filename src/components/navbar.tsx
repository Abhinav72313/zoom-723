import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import MobileNavbar from "./mobile_navbar";

function Navbar() {
  return (
    <nav className=" h-[4.5rem] sticky flex items-center justify-between p-4 bg-secondary-foreground w-screen pr-8">
      <div className=" flex items-center gap-x-2">
          <div className=" max-md:hidden relative h-10 w-10 aspect-auto">
            <Image src={'/zoom.svg'} alt="logo" fill className=" object-contain" />
          </div>
          
        <MobileNavbar />
        <h1 className=" text-4xl font-bold">Zoom</h1>
      </div>
     <UserButton /> 
    </nav>
  );
}

export default Navbar;
