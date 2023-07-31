'use client'

import Script from "next/script";
import CalcTransferencia from "@/components/Transferencia";
import CalcRepresentacao from "@/components/Representacao";
import { useState } from 'react'
import React from "react";

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
      <div className="max-w-2xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
        <Script id="google-analytics">
          {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-W6B1SSXWE7');`}
        </Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
          crossOrigin="anonymous" />
        <div className="flex flex-1 items-center justify-center mb-6 flex-col">
          <h1 className="text-green-600 font-bold uppercase text-xl">Calculadora de Transferência e Gratificação de representação para Militares</h1>
          <p className="font-light text-green-600 text-justify py-4">Essa calculadora tem como objetivo auxiliar o militar a calcular o valor aproximado de sua transferência ou de sua gratificação representação porém não se trata de uma ferramenta oficial.</p>
        </div>
        <div className="mb-8">
          <div className="sm:hidden">
            <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Transferência</option>
              <option>Gratificação representação</option>
            </select>
          </div>
          <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            <li className="w-full">
              <button onClick={() => handleSwitchCalculation('transf')} className={(component == <CalcTransferencia /> ? 'active' : '') + "inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-2 focus:ring-green-600 focus:outline-none dark:bg-transparent dark:border dark:border-gray-500 dark:text-white"} aria-current="page">Transferência</button>
            </li>
            <li className="w-full">
              <button onClick={() => handleSwitchCalculation('grat')} className={(component == <CalcRepresentacao /> ? 'active' : '') + "inline-block w-full p-4 bg-white rounded-r-lg focus:ring-2 focus:outline-none focus:ring-green-600 dark:border dark:border-gray-500 dark:text-white dark:bg-transparent"}>Gratificação representação</button>
            </li>
          </ul>
        </div>
        {component}
      </div>
    </>
  )
}
