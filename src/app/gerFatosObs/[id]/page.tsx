import Script from "next/dist/client/script";

export default function Curso({ params }: { params: { id: string } }) {
  return (
    <>
      <title>EBCalc - Gerenciamento de Fatos Observados</title>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-W6B1SSXWE7');`}
      </Script>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
        crossOrigin="anonymous" />
      <div className="relative max-w-4xl w-10/12 sm:text-md text-sm mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
      </div>
    </>

  )
}