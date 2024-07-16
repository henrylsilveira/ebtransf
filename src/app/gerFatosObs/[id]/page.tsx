
import { CardFatoObs } from "@/components/card/card";
import { PopoverFatosObs } from "@/components/gerFatosObs/popoverFatosObs/PopoverFatosObs";
import RenderCardComponent from "@/components/gerFatosObs/renderCards/RenderCards";
import { NotData } from "@/components/NotData";
import { api } from "@/services/axios";
import { Fato } from "@/types/types";
import Script from "next/dist/client/script";

export default async function Curso({ params }: { params: { id: string } }) {
  const { data } = await api.get(`/fatosObservados/${params.id}`)
  
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
      <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-10 rounded-lg mb-20 mt-6 h-screen">
      
        {data ? <RenderCardComponent key={params.id} data={data}  /> : <NotData textoComponent={"Não existe dados desse token!"} />}
      </div>
    </>

  )
}