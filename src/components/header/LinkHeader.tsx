import Link from "next/link";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";
import { MdDoubleArrow } from "react-icons/md";

export default function LinkHeader({
  text,
  link,
  icon,
}: {
  text: string;
  link: string;
  icon: ReactNode;
}) {
  return (
    <Link
      className="flex gap-1 hover:text-gray-200 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative"
      href={link}
    >
      {icon}
      {text}
    </Link>
  );
}
