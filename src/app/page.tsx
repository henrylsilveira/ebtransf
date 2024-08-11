'use client'
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

export default async function Home() {
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
              <div>
                <LazyDropdownMenu />

              </div>
            </div>
            <Noticia />
          </div>
        </Suspense>
      </div>
    </>
  )
}
