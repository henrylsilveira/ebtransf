'use client'

import Script from "next/script";
import CalcTransferencia from "@/components/transfGratRep/Transferencia";
import CalcRepresentacao from "@/components/transfGratRep/Representacao";
import { useState } from 'react'
import React from "react";
import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlinePrivacyTip } from "react-icons/md";
import { BsCalculator, BsDatabaseCheck } from "react-icons/bs";
import { Links } from "@/components/Links";


export default function Home() {
  return (
    <>
      <title>EBCalc</title>
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
          <h1 className="text-green-600 font-bold uppercase text-xl">Calculadoras e Ferramentas para Militares do Exército</h1>
          <article>
            <h1 className="text-green-600 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center"><MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Transferências</h1>
            <p className="font-light text-gray-300 text-justify py-4">
              As transferências dos militares do Exército se referem à movimentação de militares de um local ou unidade para outro dentro da estrutura da Força Terrestre do país. Essas transferências podem ocorrer por diversas razões e podem envolver mudanças de base, unidades, regiões ou até mesmo funções específicas. As transferências são uma prática comum nas forças armadas e podem ser motivadas por uma variedade de fatores, como necessidades operacionais, promoções, redistribuição de pessoal, aprimoramento da carreira, entre outros.
              As transferências podem ser solicitadas pelos próprios militares, quando desejam ou precisam ser movidos para uma nova localidade ou unidade, ou podem ser determinadas pela hierarquia militar para atender às demandas e necessidades organizacionais. Elas fazem parte da dinâmica de funcionamento das forças armadas e podem influenciar a vida e a carreira dos militares, incluindo suas famílias, considerando as mudanças de localidade.
            </p>

          </article>
          <article>
            <h1 className="text-green-600 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center"><MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Gratificação de Representação</h1>
            <p className="font-light text-gray-300 text-justify py-4">
              A "Gratificação de Representação" é um tipo de remuneração ou benefício que pode ser concedido a certos cargos ou posições dentro de uma organização, incluindo as forças armadas. Ela é destinada a compensar os custos adicionais associados à representação oficial de um indivíduo ou ao desempenho de funções que envolvem responsabilidades específicas de representação.

              No contexto militar, a Gratificação de Representação pode ser concedida a militares que ocupam cargos ou posições que exigem interações frequentes com outras organizações, representação em eventos oficiais, representação do Exército ou da unidade perante o público ou outros deveres similares que vão além das tarefas regulares de um militar.

              Essa gratificação pode incluir benefícios financeiros adicionais, como um adicional no salário, ou outros tipos de compensações, como alojamento diferenciado, ajuda de custo para viagens ou outras formas de apoio para cumprir as responsabilidades de representação.

              Lembrando que as políticas e práticas podem variar entre diferentes organizações e países, então é importante consultar os regulamentos e informações específicas da instituição em questão para obter detalhes precisos sobre como a Gratificação de Representação é implementada e quem é elegível para recebê-la.</p>

          </article>
        </div>

        <Links />
      </div>
    </>
  )
}
