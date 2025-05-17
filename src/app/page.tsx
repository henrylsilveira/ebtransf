import { Logo } from "@/components/Logo/Logo";
import Script from "next/script";

import { Loader } from "@/components/Loader/Loader";
import Noticia from "@/components/noticia/Noticia";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";

const LazyDropdownMenu = dynamic(() => import("@/components/MenuHome"), {
  loading: () => <Loader />,
  ssr: false,
});

export default function Home() {
  return (
    <>
      <title>EBCalc</title>
      <div className="w-screen h-screen">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
          crossOrigin="anonymous"
        />
        <div className="flex flex-1 relative flex-col items-center justify-center z-10 bg-gray-950 w-screen  sm:h-full py-4 bg-[url('/bg.svg')] bg-no-repeat bg-center">
          <div className="w-[600px] flex items-center justify-center flex-col gap-10">
            <div>
              <Logo type="grande" />
            </div>
            <LazyDropdownMenu />
          </div>
          <div className="mx-2">
            <div className="flex items-center relative max-w-full">
              <div className="flex justify-center flex-col gap-12 mx-auto mt-4">
                <div className="flex mx-auto relative justify-center">
                  <h1 className="text-white text-lg font-bold px-9 py-2 z-[2] shadow-shape rounded-xl bg-gray-900 uppercase">
                    Notícias Militares
                  </h1>
                  <div className="absolute bg-green-950 h-8 -bottom-6 rounded-b-xl z-0 shadow-shape hover:bg-green-800 transition ease-in-out duration-500 cursor-pointer">
                    <Link href="/noticias/todasNoticias" className="px-2 py-2 flex items-center text-white uppercase text-xs">
                      ver todas
                    </Link>
                  </div>
                </div>

                <Suspense fallback={<Logo />}>
                  <Noticia />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
