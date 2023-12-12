
import CalcContraChequeComponent from "@/components/CalcContracheque";
import { Loader } from "@/components/Loader/Loader";
import Script from "next/script";
import { Suspense } from "react";

export default function CalcContraCheque() {

    return (
        <>
            <title>EBCalc - Calculadora Contracheque</title>
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
                <CalcContraChequeComponent />
            </Suspense>
        </>
    )
}