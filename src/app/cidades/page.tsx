
import CardFeedbackCidades from "@/components/feedbackCidades/CardFeedbackCidades";
import { FeedbackCidades } from "@/components/feedbackCidades/feedbackCidades";
import { NotData } from "@/components/NotData";
import { api } from "@/services/axios";
import { FeedbackCidadesProps } from "@/types/types";
import { formatarDataHora } from "@/utils/scripts";
import Script from "next/dist/client/script";

async function getData() {
    const res = await fetch('https://ebcalc.net/api/feedbackCidades',{ next: { revalidate: 3600 * 7 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
//    console.log(res.json())
    return res.json()
  }

export default async function Cidades() {
    // const { data } = await api.get(`/feedbackCidades`)
    const data = await getData()
    return (
        <>
            <title>EBCalc - Cidades</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?nome=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-10 rounded-lg mb-20 mt-4">
                <div className="w-full flex justify-center flex-col mb-4">
                    <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Compartilhe sua experiência</h1>
                    <div className="flex flex-col gap-6 mb-6">
                        <p className="text-gray-200 text-justify text-lg">Abaixo compartilhe as experiências vividas nas cidades em que passou. Sinta-se à vontade para falar das coisas boas e do que considera ruim, das dificuldades e facilidades de cada cidade. Não se preocupe pois tudo ficará anônimo. Após seu compartilhamento, uma média da avaliação será criada e divulgada para que outros possam ter ideia de como é cada cidade.</p>
                        <p className="text-gray-500 text-center text-md italic">"Antes que a luz se apague, antes que o sol se ponha, haverá alguém de estar, haverá alguém de ficar, para que outros venham, para que outros fiquem."<span>🔰</span></p>
                        
                    </div>
                    <FeedbackCidades compact={false} />
                </div>
                <div className="w-full flex justify-center flex-col mt-4">
                    <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Busque a experiência de outras pessoas</h1>
                    {data?.feedbacks?.length !== 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data?.feedbacks?.map((cidade: FeedbackCidadesProps) =>
                            cidade.texto === "" ? null : <CardFeedbackCidades key={cidade.date} id={cidade.id} date={formatarDataHora(cidade.date)} estado={cidade.estado} cidade={cidade.cidade} texto={cidade.texto} saude={cidade.saude} educacao={cidade.educacao} trabalho={cidade.trabalho} seguranca={cidade.seguranca} infraEstrutura={cidade.infraEstrutura} pnr={cidade.pnr} custoVida={cidade.custoVida} batalhao={cidade.batalhao} />
                        )}

                    </div> : <NotData textoComponent={"Ainda não existe dados ou não foram encontrados!"} />}

                </div>
            </div>
        </>
    )
}