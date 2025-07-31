
import CalcPecuniariaComponent from "@/components/calculadoras/CalcPecuniaria";
import Script from "next/script";

export default function CalcContraCheque() {

    return (
        <>
            <title>EBCalc - Calculadora Pecuniária</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <CalcPecuniariaComponent />
        </>
    )
}