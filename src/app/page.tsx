
import { Logo } from "@/components/Logo";
import Script from "next/script";

import { Loader } from "@/components/Loader/Loader";
import Noticia from "@/components/noticia/Noticia";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyDropdownMenu = dynamic(() => import("@/components/MenuHome"), {
  loading: () => <Loader />,
  ssr: false,
})

export default function Home() {
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
        <div className="flex flex-1 relative flex-col items-center justify-center bg-gray-950 w-screen  sm:h-full py-4 bg-[url('/bg.svg')] bg-no-repeat bg-center">
          <div className="w-[600px] flex items-center justify-center flex-col gap-6">
            <div>
              <Logo type="grande" />
            </div>
            <LazyDropdownMenu />
          </div>
          <div className="mx-2">
            <div className="flex items-center relative max-w-full">
              <div className="flex justify-center flex-col gap-12 mx-auto mt-4">
                <div className="flex shadow-shape rounded-xl bg-gray-900 w-60 mx-auto">
                  <h1 className="text-white text-lg font-bold px-9">Notícias Militares</h1>
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
  )
}
