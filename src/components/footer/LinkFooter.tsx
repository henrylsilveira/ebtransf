import Link from "next/link";
import { MdDoubleArrow } from "react-icons/md";

export default function LinkFooter({ text, link }: { text: string, link: string }) {
    return (
        <ul className="flex">
            <span
                className="flex items-center relative hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 group-hover:-translate-x-2.5 group-hover:scale-110"
            > <MdDoubleArrow className="text-green-800" /><Link href={link}>{text}</Link></span>

        </ul>
    )
}