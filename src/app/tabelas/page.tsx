'use client'

import Script from "next/script";
import CalcTransferencia from "@/components/Transferencia";
import CalcRepresentacao from "@/components/Representacao";
import { useState } from 'react'
import React from "react";
import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlinePrivacyTip } from "react-icons/md";
import { BsCalculator } from "react-icons/bs";
import { adcDisp, adcHab, adcLocEsp, adcMil, postosGrad, soldo, soldos } from "@/utils/valores";
import { formataValor } from '../../utils/scripts';


export default function Home() {
  const [component, setComponent] = useState(<CalcTransferencia />)

  function handleSwitchCalculation(tipo: string) {
    switch (tipo) {
      case 'transf':
        return setComponent(<CalcTransferencia />)
      case 'grat':
        return setComponent(<CalcRepresentacao />)
      default:
        break;
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
        </Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
          crossOrigin="anonymous" />
        <div className="flex flex-1 items-center justify-center mb-6 flex-col">
          <h1 className="text-green-600 font-bold uppercase text-xl">Transferência e Gratificação de representação para Militares do Exército</h1>
          
          <article>
            <h1 className="text-green-600 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center"><MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Dados utilizados para cálculos</h1>
            <div className="relative overflow-x-auto shadow-container sm:rounded-lg mt-4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
                      Posto / Graduação
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Soldo
                    </th>
                    <th scope="col" className="px-6 py-3  bg-gray-50 dark:bg-gray-800 text-center">
                    Adicional Militar
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                    Adicional Habilitação
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-center">
                    Adicional Disponibilidade
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                    Adicional Localização Especial
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {postosGrad.map((postos, index) => (
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 flex flex-1 justify-center">
                        {postos}
                      </th>
                      <td className="px-6 py-4 text-center">
                        {formataValor(soldos[index])}
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
                        {adcMil[index] ? adcMil[index] + '%' : ''}
                      </td>
                      <td className="px-6 py-4 text-center">
                      {adcHab[index] ? adcHab[index] + '%' : ''}
                      </td>
                      <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
                      {adcDisp[index] ? adcDisp[index] + '%' : ''}
                      </td>
                      <td className="px-6 py-4 text-center">
                      {adcLocEsp[index] ? adcLocEsp[index] + '%' : ''}
                      </td>
                    </tr>
                  ))}
                  
                  
                </tbody>
                
                
              </table>
              <div>
                  <span className="text-xs text-gray-600 italic m-2 text-center">*Essa tabela contém soldo e adicionais necessários para os cálculos de transferência e representação. Última atualização em Agosto de 2023.</span>
              </div>
            </div>
          </article>

        </div>

        <div className="mt-4 hover:text-green-600 text-white">
          <Link className="text-sm border justify-center items-center border-green-600 rounded-lg p-2 flex " href="/calculadora"><BsCalculator className="pr-1 text-2xl" />Calculadora</Link>
        </div>
        <div className="mt-4 hover:text-green-600 text-white">
          <Link className="text-sm border justify-center items-center border-green-600 rounded-lg p-2 flex " href="/privacyPolicy"><MdOutlinePrivacyTip className="pr-1 text-2xl" />Política de Privacidade</Link>
        </div>
      </div>
    </>
  )
}
