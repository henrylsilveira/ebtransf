
import { createClient } from "@/prismicio";
import { PrismicImage } from "@prismicio/react";
import Link from "next/link";
import { MdDoubleArrow } from "react-icons/md";
import { Loader } from "../Loader/Loader";
import { Suspense } from "react";
export default async function Noticia() {
    const prismicClient = createClient();
    const posts = await prismicClient.getAllByType("ebcalcnoticia").catch(e => {
        console.error(e);
        return [];
    });

    return (
        <div className="flex items-center relative w-full">
            <button className=" z-20 bg-green-500">L</button>
            <div className="flex justify-center flex-col gap-12 mx-auto mt-4">
                <div className="flex shadow-shape rounded-xl bg-gray-900 w-60 mx-auto">
                    <h1 className="text-white text-lg font-bold px-9">Notícias Militares</h1>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-y-6 transition-all ease-in duration-500 w-full ">
                    {posts.slice(0, 5).map(post => (
                        <div key={post.id} className="flex flex-1 relative sm:ml-0 &:not[first-child]-ml-[200px] bg-gray-900 sm:max-w-[460px] w-[460px] shadow-shape group rounded hover:transform hover:scale-105 z-0 hover:z-20 hover:translate-x-8 hover:translate-y-8 transition-all ease-in-out duration-500">
                            <PrismicImage field={post.data.image} className="w-full h-full overflow-hidden rounded shadow-container" />
                            <div className="group-hover:bg-black/80 absolute bottom-0 left-0 p-4 overflow-hidden hidden group-hover:block transition-all ease-in-out duration-500">
                                <h1 className=" text-white">{post.data.titulonoticia}</h1>
                                <p className=" text-gray-400 text-xs">{post.data.subtitulo}</p>
                                <Link className="text-gray-400 hover:text-white focus:outline-none hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-800 after:duration-500 transition-all duration-500 outline-none pr-2.5 border-r border-r-green-700 last:border-none flex items-center gap-2" href={`/noticias/${post.uid}`}><MdDoubleArrow />Ler mais</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className=" z-20 bg-green-500">R</button>
        </div>

    )
}