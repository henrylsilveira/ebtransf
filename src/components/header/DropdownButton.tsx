'use client'
import { ReactNode } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import LinkHeader from "./LinkHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
export default ({
  title,
  linkText,
}: {
  title: string;
  linkText:
  {
    text: string;
    link: string;
    icon: ReactNode;
  }[]
  ;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button type="button" className="flex relative items-center justify-center gap-1 text-lg text-gray-400 focus:outline-none hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 outline-none hover:text-gray-200 pr-2.5 border-r border-r-green-700 last:border-none">
        {title}
        <MdKeyboardArrowDown size={20} />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-gray-900 rounded-md px-3 py-2 text-gray-400 flex flex-col gap-1 shadow-shape">
      {linkText.map((elem) => (
        <DropdownMenuItem key={elem.text} className="focus:outline-none focus:bg-none">
          <LinkHeader link={elem.link} text={elem.text} icon={elem.icon} />
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
