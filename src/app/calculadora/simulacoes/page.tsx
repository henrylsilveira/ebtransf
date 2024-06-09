import { ModalTransferencia } from "@/components/modalTransferencia/ModalTransferencia";
import { NotData } from "@/components/NotData";
import { api } from "@/services/axios";
import { DadosTransferencia } from "@/types/types";
import Script from "next/dist/client/script";
import { useEffect, useState } from "react";

async function getData() {
    const res = await fetch('https://ebcalc.net/api/transferencia',{ next: { revalidate: 3600 * 7 } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
//    console.log(res.json())
    return res.json()
  }

export default async function Simulacoes() {
    // const { data } = await api.get(`/transferencia`)
    const data = await getData()
    return (
        <>
            <title>EBCalc - Simulações
            </title>
            <Script async src="https://www.googletagmanager.com/gtag/js?nome=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-2 sm:p-10 rounded-lg mb-20 mt-4">
                <div className="w-full flex justify-center flex-col mb-4">
                    <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Tabela de transferências</h1>
                </div>
                {
                    data?.transferencias?.length === 0
                        ? <NotData textoComponent={"Não foi possível carregar as transferências salvas."} />
                        :

                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-xs sm:text-sm text-left text-gray-400">
                                    <thead className="text-xs uppercase bg-green-800 text-white">
                                        <tr>
                                            <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">P/G</th>
                                            <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Estado Origem</th>
                                            <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Cidade Origem</th>
                                            <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Estado Destino</th>
                                            <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Cidade Destino</th>
                                            <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.transferencias?.map((transf: DadosTransferencia) =>
                                            <tr className="border-b bg-gray-800 border-gray-700">
                                                <td className="sm:py-4 sm:px-6 py-1 px-2">{transf.pg.toUpperCase()}</td>
                                                <td className="sm:py-4 sm:px-6 py-1 px-2">{transf.estadoOrigem}</td>
                                                <td className="sm:py-4 sm:px-6 py-1 px-2">{transf.cidadeOrigem}</td>
                                                <td className="sm:py-4 sm:px-6 py-1 px-2">{transf.estadoDestino}</td>
                                                <td className="sm:py-4 sm:px-6 py-1 px-2">{transf.cidadeDestino}</td>
                                                <td className="sm:py-4 sm:px-6 py-1 px-2"><ModalTransferencia transferencia={transf} /></td>
                                            </tr>
                                        )}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}