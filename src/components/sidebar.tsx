"use client";

import { sidebarLinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className=" min-h-full bg-secondary-foreground w-fit px-2 py-8 top-0 left-0 max-md:hidden ">
      <div className=" flex flex-col gap-2">
        {sidebarLinks.map((val) => {
          return (
            <Link
              href={val.url}
              key={val.title}
              className={`flex font-semibol min-w-48 items-center rounded-lg p-3 cursor-pointer ${
                pathname == val.url ? "bg-primary" : ""
              } `}
            >
              <val.icon className="w-6 h-6 mr-2" />
              <span className="">{val.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
