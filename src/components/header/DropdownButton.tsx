'use client'
import React, { Suspense } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import LinkHeader from "./LinkHeader";
import { Loader } from "../Loader/Loader";

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
  <div>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className="flex relative items-center justify-center gap-1 text-lg text-gray-400 focus:outline-none hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 outline-none hover:text-gray-200 pr-2.5 border-r border-r-green-700 last:border-none">
          {title}
          <MdKeyboardArrowDown size={20} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-[#192132]/80 rounded-md px-3 py-2 text-gray-400 flex flex-col gap-1">
          {linkText.map((elem) => (
            <DropdownMenu.Item key={elem.text} className="focus:outline-none">
              <LinkHeader link={elem.link} text={elem.text} icon={elem.icon} />
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="fill-[#192132]" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  </div>

);
