import Script from "next/script";

export default function ManipularPDF() {

    return (
        <>
            <title>EBCalc - PDFs</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="max-w-4xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
                        <div className="flex flex-1 items-center justify-center mb-6 flex-col">
                            <h1 className="text-green-600 font-bold uppercase text-xl">Manipulador de PDFs</h1>
                        </div>
                        
                        
                    </div>
        </>
    )
}