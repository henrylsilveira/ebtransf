'use client'

import Script from "next/script";
import CalcTransferencia from "@/components/Transferencia";
import CalcRepresentacao from "@/components/Representacao";
import { useEffect, useState } from 'react'
import React from "react";
import Link from "next/link";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";
import { BsDatabaseCheck } from "react-icons/bs";
import { calcularDiferencaAtual } from "@/utils/scripts";
import { Links } from "@/components/Links";

interface calcDiaProps {
  dia?: number;
  mes?: number;
  ano?: number;
  totalDias?: number;
  message?: string;
}

export default function TempoServico() {
  const [dateOne, setDateOne] = useState("")
  const [dateTwo, setDateTwo] = useState("")
  const [calcDia, setCalcDia] = useState<calcDiaProps>({})

  useEffect(() => {
    if(dateTwo){
      setCalcDia(calcularDiferencaAtual(dateOne,dateTwo))
    }else{
      setCalcDia(calcularDiferencaAtual(dateOne))
    }
  }, [dateOne,dateTwo])

  return (
    <>
      <div className="max-w-2xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
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
          <h1 className="text-green-600 font-bold uppercase text-xl">Calculadora de tempo de serviço para Militares</h1>
          <p className="font-light text-white text-justify py-4">Essa calculadora tem como objetivo auxiliar o militar a calcular seu tempo aproximado de serviço e não se trata de uma ferramenta oficial.</p>
          <article className="font-light text-white text-justify py-4">
            Para calcular o tempo de serviço militar, você geralmente precisa considerar o seguinte:
            <ul>
              <li>Duração do Serviço: Descubra qual é a duração mínima do serviço militar obrigatório ou voluntário. Isso pode variar de alguns meses a vários anos.</li>
              <li>Data de Ingresso: Anote a data em que você se alistou ou foi convocado para o serviço militar.</li>
              <li>Data de Término: Determine a data em que seu serviço militar foi concluído ou será concluído, de acordo com as regras e regulamentos do serviço militar em seu país.</li>
              <li>Circunstâncias Especiais: Considere se você teve alguma licença, folga ou serviço ativo durante o período de serviço militar, pois essas circunstâncias podem afetar o cálculo do tempo de serviço.</li>
              <li>Documentação: Mantenha registros e documentos oficiais relacionados ao seu serviço militar, como ordens de serviço, cartas de dispensa, registros de pagamento e outros documentos que possam comprovar o tempo de serviço.</li>
            </ul>
            Com essas informações, você pode calcular o tempo de serviço militar subtraindo a data de início da data de término, levando em consideração qualquer período de licença ou serviço ativo interrompido. O serviço militar pode ser calculado de forma diferente para determinados fins, como benefícios de veteranos, aposentadoria militar e assim por diante.
          </article>
        </div>
        <div className="flex gap-4">
          <div className="relative z-0 mb-6 w-full group">
            <input type="date" name="primeiraData" onChange={(e) => setDateOne(e.target.value)} id="primeiraData" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="primeiraData" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data de praça</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="date" name="segundaData" onChange={(e) => setDateTwo(e.target.value)} id="segundaData" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="segundaData" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data de Término</label>
            <span className="text-xs text-red-500">Deixei em branco para considerar a data de hoje.</span>
          </div>
        </div>
        {dateOne ? (
          <p>{calcDia?.message ? (
            <div className="flex-1 flex">
              <FiAlertTriangle className="pr-1 text-2xl text-red-600" />
              <p className="font-bold text-red-600">{calcDia?.message}</p>
            </div>
          ) : (
            <div className="border border-green-600 rounded-md p-6 relative my-4">
              <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">TEMPO</h1>
              <p className="font-light text-white flex"><p className="font-bold pr-2">Tempo de serviço:</p>{`${calcDia?.ano} anos, ${calcDia?.mes} meses e ${calcDia?.dia} dias de serviço.`}</p>
              <p className="font-light text-white flex"><p className="font-bold pr-2">Total de dias:</p>{calcDia?.totalDias}</p>
            </div>
            )}</p>
        ) : null}

        <Links />
      </div>
    </>
  )
}
