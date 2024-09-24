
import { FeedbackCidades } from "@/components/feedbackCidades/feedbackCidades";
import { NotData } from "@/components/NotData";
import { convertTextToValue, returnFeedbackCities } from "@/utils/scripts";
import Rating from "@mui/material/Rating";
import Script from "next/dist/client/script";
import Link from "next/link";

import DropdownFeedback from "@/components/dropdownFeedback/dropdownFeedback";
import { FaRegChartBar } from "react-icons/fa";
async function getData() {
    const res = await fetch('https://ebcalc.net/api/feedbackCidades', { next: { revalidate: 3600 * 7 } })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const responseBody = await res.json()
    return responseBody
}

export default async function MediasCidades() {
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
            <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-10 rounded-lg mb-20 mt-4 h-full min-h-screen">
                <div className="w-full flex justify-center flex-col mb-4 ">
                    <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Compartilhe sua experiência</h1>
                    <div className="flex flex-col gap-6 mb-6">
                        <p className="text-gray-200 text-justify text-lg">Abaixo compartilhe as experiências vividas nas cidades em que passou. Sinta-se à vontade para falar das coisas boas e do que considera ruim, das dificuldades e facilidades de cada cidade. Não se preocupe pois tudo ficará anônimo. Após seu compartilhamento, uma média da avaliação será criada e divulgada para que outros possam ter ideia de como é cada cidade.</p>
                        <p className="text-gray-500 text-center text-md italic">"Antes que a luz se apague, antes que o sol se ponha, haverá alguém de estar, haverá alguém de ficar, para que outros venham, para que outros fiquem."<span>🔰</span></p>

                    </div>
                    <FeedbackCidades compact={false} />
                    <div className="w-full flex justify-evenly shadow-shape text-gray-300 rounded-md py-4 mt-4 bg-gradient-to-tr from-gray-950 to-gray-800">
                        <Link href={"/cidades"} className="uppercase relative hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 hover:text-white">Depoimentos</Link>
                        <div className="border-r border-green-700 " />
                        <Link href={"/cidades/medias"} className="uppercase relative hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 hover:text-white">Média das cidades</Link>
                    </div>
                    <div className="w-full flex justify-center flex-col mt-4 ">
                        <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Tabela de avaliações de cidades</h1>
                        {
                            returnFeedbackCities(data?.feedbacks).length === 0
                                ? <div className="h-screen">
                                    <NotData textoComponent={"Não foi possível carregar os dados ou não existe nenhum registro com esse filtro."} />
                                </div>
                                :
                                <div className="overflow-x-auto shadow-md sm:rounded-lg h-screen">
                                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-xs sm:text-sm text-left text-gray-400">
                                            <thead className="text-sm uppercase bg-green-800 text-white">
                                                <tr>
                                                    <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Cidade</th>
                                                    <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Avaliação</th>
                                                    <th scope="col" className="sm:py-3 sm:px-2 py-1 px-1"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="overflow-y-auto">
                                                {returnFeedbackCities(data?.feedbacks).map((city) =>
                                                    <tr key={city.city} className="border-b bg-gray-800 border-gray-700 text-sm">
                                                        <td className="sm:py-4 sm:px-6 py-1 px-2">{city.city.toUpperCase()}</td>
                                                        <td className="sm:py-4 sm:px-6 py-1 px-2 text-center flex gap-2">
                                                            <p className="flex items-center gap-2"><Rating name="size-large" precision={0.5} value={(city.saude + city.educacao + city.trabalho + city.seguranca + city.infraEstrutura + city.pnr + city.batalhao + city.custoVida) / 8} size="medium" readOnly /></p>
                                                            <DropdownFeedback city={city} />
                                                        </td>
                                                        <td className="sm:py-4 sm:px-6 py-1 px-2">
                                                            <Link className="flex text-sm text-white items-center justify-center gap-2 bg-blue-900/80 hover:bg-blue-900/20 transition-all duration-500 ease-out w-20 shadow-container rounded-sm" target="_blank" href={`https://cidades.ibge.gov.br/brasil/${convertTextToValue(city.sigla)}/${convertTextToValue(city.city.split("|")[0].trim())}/panorama`}><FaRegChartBar />IBGE</Link>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}