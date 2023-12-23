'use client'
import Link from "next/link";
import { ReactElement, useState } from "react";
import { Loader } from "./Loader/Loader";

interface ButtonProps{
    Icon: ReactElement,
    text?: string,
    link: string
    name?: string
}

export function Button({ Icon, text, link, name}: ButtonProps){
    const [loading, setLoading] = useState(false)

    function handleLoading(){
        setLoading(true)
        setTimeout(() => setLoading(false),3000)
    }

    return (
        <Link onClick={handleLoading} aria-label={name} className="text-sm justify-center items-center border-0 p-2 flex" href={link}>
            {loading ? <Loader /> : (<div className="flex items-center">{Icon}<p>{text}</p></div>)}
        </Link>
    )
}