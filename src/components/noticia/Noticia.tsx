'use client'
import { createClient } from "@/prismicio";
import { PrismicImage } from "@prismicio/react";
import Link from "next/link";
import { MdDoubleArrow, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Loader } from "../Loader/Loader";
import { Suspense, useEffect, useState } from "react";
import { convertDate, dividirArray } from "@/utils/scripts";
import { AllDocumentTypes } from '../../../prismicio-types';
export default async function Noticia() {
    const prismicClient = createClient();
    const [pageData, setPageData] = useState(0);
    const [loading, setLoading] = useState(false);
    const posts = await prismicClient.getAllByType<AllDocumentTypes>("ebcalcnoticia").catch(e => {
        console.error(e);
        return [];
    });

    function changePage(acao: "proximo" | "anterior") {
        let page = acao === "proximo" ? pageData + 1 : pageData - 1
        if (page < 0) return page = 0
        if (page > (dividirArray(posts, 3).length - 1)) return page = 0
        setPageData(page)
    }

    return (
        <>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-y-6 transition-all ease-in duration-500 w-full relative">
                <button onClick={() => changePage("anterior")} className=" hover:scale-110 hover:text-green-600 hover:bg-gray-900 transition-all ease-in duration-500 z-20 absolute left-0 bg-gray-950 shadow-shape rounded-full w-12 h-12 top-[50%] translate-y-full md:top-auto md:translate-y-28  -translate-x-1/2 text-white flex justify-center items-center"><MdOutlineKeyboardDoubleArrowLeft size={20} /></button>
                {dividirArray(posts, 3)[pageData]?.map(post => (
                    <div key={post.id} className="after:w-0 flex flex-1 relative sm:ml-0 bg-gray-900 sm:max-w-[460px] shadow-shape group rounded hover:transform hover:scale-105 z-0 hover:z-20  transition-all ease-in-out duration-500">
                        <PrismicImage field={post.data.image} className="w-full h-full overflow-hidden rounded shadow-container" />
                        <div className="group-hover:bg-black/80 absolute bottom-0 left-0 p-4 overflow-hidden hidden group-hover:block transition-all ease-in-out duration-500">
                            <h1 className=" text-white">{post.data.titulonoticia}</h1>
                            <p className=" text-gray-400 text-xs">{post.data.subtitulo}</p>
                            {loading ? <Loader /> : <Link onClick={() => setLoading(true)} className="text-gray-400 hover:text-white focus:outline-none hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-800 after:duration-500 transition-all duration-500 outline-none pr-2.5 border-r border-r-green-700 last:border-none flex items-center gap-2" href={`/noticias/${post.uid}`}><MdDoubleArrow />Ler mais</Link>}

                        </div>
                        <div className="absolute -bottom-5 left-0 px-4 py-1 bg-gray-950 shadow-shape rounded-b-lg -z-10 text-gray-400 text-xs">
                            {convertDate(post.last_publication_date)}
                        </div>

                    </div>
                ))}
                <button onClick={() => changePage("proximo")} className=" hover:scale-110 hover:text-green-600 hover:bg-gray-900 transition-all ease-in duration-500 z-20 absolute right-0 bg-gray-950 shadow-shape rounded-full w-12 h-12 top-[50%] translate-y-full md:top-auto md:translate-y-28 translate-x-1/2  text-white flex justify-center items-center"><MdOutlineKeyboardDoubleArrowRight size={20} /></button>

            </div>
            <div className="flex gap-2 justify-center">
                {
                    dividirArray(posts, 3).map((_, index) =>
                        <div key={index} onClick={() => setPageData(index)} className={`cursor-pointer w-6 h-3 bg-gray-950 border-1 border-green-600 shadow-shape rounded-md ${pageData === index && "bg-green-600 animate-bounce"}`} />
                    )
                }
            </div>
        </>
    )
}