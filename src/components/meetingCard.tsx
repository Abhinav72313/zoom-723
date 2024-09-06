"use client";


import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HomeCardProps {
  className?: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({
  className,
  Icon,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <section
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full h-64 rounded-lg cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className=" p-2 backdrop-blur-lg bg-white/30 w-fit rounded-lg">
        <Icon className="h-12 w-12" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
