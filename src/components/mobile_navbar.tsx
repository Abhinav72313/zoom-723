"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/lib/constants";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileNavbar() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <span className="p-1 align-middle md:hidden">
          <Menu className=" h-9 w-9" />
        </span>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className=" bg-secondary-foreground border-none space-y-6"
      >
        <div className=" flex items-center gap-x-4">
          <Image
            src={'/zoom.svg'}
            alt="logo"
            height={32}
            width={32}
            className=" object-contain"
          />
          <h1 className=" text-2xl font-bold">Zoom</h1>
        </div>

        <div className=" flex flex-col gap-2">


        {sidebarLinks.map((val) => {
          return (
            <SheetClose key={val.url} asChild>
              <Link
                href={val.url}
                key={val.title}
                className={`flex font-semibol items-center rounded-lg p-3 cursor-pointer ${
                  pathname == val.url ? "bg-primary" : ""
                } `}
              >
                <val.icon className="w-6 h-6 mr-2" />
                <span className="">{val.title}</span>
              </Link>
            </SheetClose>
          );
        })}
        </div>

      </SheetContent>
    </Sheet>
  );
}

export default MobileNavbar;
