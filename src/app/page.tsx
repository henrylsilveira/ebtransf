'use client'
import { Logo } from "@/components/Logo";
import { createClient } from "@/prismicio";
import { PrismicImage } from "@prismicio/react";
import Link from "next/link";
import Script from "next/script";
import { MdDoubleArrow } from "react-icons/md";

import MenuHome from "@/components/MenuHome";
import DropdownButton from "@/components/header/DropdownButton";
import { Suspense } from "react";
import { Loader } from "@/components/Loader/Loader";

export default async function Home() {
  const prismicClient = createClient();
  const [posts] = await Promise.all([
    await prismicClient.getAllByType("ebcalcnoticia").catch(e => {
      console.error(e);
      return [];
    }),
  ])

  return (
    <>
      <title>EBCalc</title>
      <div className="w-screen h-screen">
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
        </Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
          crossOrigin="anonymous" />
        <Suspense fallback={<Loader loadingPage />}>
          <div className="flex flex-1 flex-col items-center justify-center bg-gray-950 w-screen h-screen overflow- bg-[url('/bg.svg')] bg-no-repeat bg-center">
            <div className="relative w-[600px] h-[600px] flex items-center justify-center flex-col gap-6">
              <div>
                <Logo type="grande" />
              </div>
              <MenuHome />
            </div>
            <div className="flex justify-center flex-col gap-12 mx-auto">
              <div className="flex shadow-shape rounded-xl bg-gray-900 w-60 mx-auto">
                <h1 className="text-white text-lg font-bold px-9">Notícias Militares</h1>
              </div>
              <div className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-1 ml-[400px] gap-y-6">
                {posts.map(post => (
                  <div key={post.id} className="flex flex-1 relative -ml-[200px] bg-gray-900 w-[460px] shadow-shape group rounded hover:transform hover:scale-105 z-0 hover:z-20 hover:translate-x-8 hover:translate-y-8 transition-all ease-in-out duration-500">
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
          </div>
        </Suspense>
      </div>
    </>
  )
}
