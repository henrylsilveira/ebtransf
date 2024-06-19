'use client'

import Script from "next/script";
import React from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { adcDisp, adcHab, adcLocEsp, adcMil, ajudaCusto, cubagemDistancia, diarias, postosGrad, reserva, soldos } from "@/utils/valores";
import { formataValor } from '../../utils/scripts';
import { Links } from "@/components/Links";


export default function Home() {
  return (
    <>
      <title>EBCalc - Tabela de base de cálculos</title>
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
          <h1 className="text-green-600 font-bold uppercase text-xl">Dados utilizados para cálculos</h1>

          <article>
            <h1 id="#postGrad" className="text-green-600 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center">
              <MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Postos / Graduações
            </h1>
            <div className="text-xs sm:text-md flex flex-col justify-center relative overflow-x-auto shadow-container sm:rounded-lg mt-4">
              <table className="w-100 sm:w-full text-left text-gray-400">
                <thead className="  uppercase text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-800 text-center text-white">
                      Posto / Graduação
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-white">
                      Soldo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {postosGrad.map((postos, index) => (
                    <tr key={postos + `${index}`} className="border-b border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap  text-white bg-gray-800 flex flex-1 justify-center">
                        {postos}
                      </th>
                      <td className="px-6 py-4 text-center">
                        {formataValor(soldos[index])}
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
          <article>
            <h1 id="#adicionais" className="text-green-600 mt-6 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center">
              <MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Adicionais
            </h1>
            <div className="text-xs sm:text-md flex flex-col justify-center relative overflow-x-auto shadow-container sm:rounded-lg mt-4">
              <table className="w-100 sm:w-full text-left text-gray-400">
                <thead className=" uppercase text-gray-400">
                  <tr>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-white bg-gray-800 text-center">
                      Adicional Disponibilidade
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-white text-center">
                      Adicional Militar
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-white bg-gray-800 text-center">
                      Adicional Habilitação
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-white text-center">
                      Adicional Localização Especial
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adcDisp.map((disp, index) => (
                    <tr key={disp + `${index}`} className="border-b border-gray-700">
                      <td className="px-6 py-4 text-center bg-gray-800">
                        {disp + "%"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {adcMil[index] ? adcMil[index] + '%' : ''}
                      </td>
                      <td className="px-6 py-4 text-center bg-gray-800">
                        {adcHab[index] ? adcHab[index] + '%' : ''}
                      </td>
                      <td className="px-6 py-4  text-center">
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
          <article>
            <h1 id="#distCubagem" className="text-green-600 mt-6 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center">
              <MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Cubagem por distância
            </h1>
            <div className="text-xs sm:text-md flex flex-col justify-center relative overflow-x-auto shadow-container sm:rounded-lg mt-4">
              <table className="w-100 sm:w-full text-left text-gray-400">
                <thead className=" uppercase text-gray-400">
                  <tr>
                    <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                      Distância
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-center text-white">
                      Valor do M³
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cubagemDistancia.map((dist, index) => (
                    <tr key={dist + `${index}`} className="border-b border-gray-700">
                      <td className="px-6 py-4 text-center bg-gray-800">
                        {dist.distanciaMenor + ' até ' + dist.distanciaMaior + ' Km'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {formataValor(dist.valor)}
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
          <article className="w-full overflow-x-auto">
            <h1 id="#distCubagem" className="text-green-600 mt-6 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center">
              <MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Diárias
            </h1>
            <div className="text-xs sm:text-md flex flex-col justify-center relative shadow-container sm:rounded-lg mt-4">
              <table className=" sm:w-full text-left text-gray-400 overflow-x-auto">
                <thead className=" uppercase text-gray-400">
                  <tr>
                    <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                      Posto / Graduação
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-center text-white">
                      Deslocamentos Brasília/Manaus/Rio de Janeiro/São Paulo
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                      Deslocamentos outras capitais
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-center text-white">
                      Demais deslocamentos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diarias.map((diaria, index) => (
                    <tr key={diaria + `${index}`} className="border-b border-gray-700">
                      <td className="px-6 py-4 text-center bg-gray-800">
                        {diaria.PostGrad}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {formataValor(diaria.tipo1)}
                      </td>
                      <td className="px-6 py-4 text-center bg-gray-800">
                        {formataValor(diaria.tipo2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {formataValor(diaria.tipo3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <span className="text-xs text-gray-600 italic m-2 text-center">*Valores de indenização de diárias aos militares. Decreto nº 4307, de 18 de julho de 2002.</span>
              </div>
            </div>
          </article>
          <article>
            <h1 id="#distCubagem" className="text-green-600 mt-6 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center">
              <MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />Ajuda de Custo
            </h1>
            <div className="text-xs sm:text-md flex flex-col justify-center relative overflow-x-auto shadow-container sm:rounded-lg mt-4">
              <table className="w-100 sm:w-full text-left text-gray-400">
                <thead className=" uppercase text-gray-400">
                  <tr>
                    <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                      Situação
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-center text-white">
                      Ida
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                      Volta
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ajudaCusto.map((custo, index) => (
                    <tr key={custo + `${index}`} className="border-b border-gray-700">
                      <td className="px-6 py-4 text-center bg-gray-800">
                        {custo.situacao}
                      </td>
                      <td className="px-6 py-4 text-center">
                        x{custo.ida}
                      </td>
                      <td className="px-6 py-4 text-center bg-gray-800">
                        x{custo.volta}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                      Situação
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3 text-center text-white">
                      Oficial
                    </th>
                    <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                      Praça
                    </th>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-6 py-4 text-center bg-gray-800">
                      {reserva.situacao}
                      {reserva.condicao}
                    </td>
                    <td className="px-6 py-4 text-center">
                      x{reserva.tipo1}
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-800">
                      x{reserva.tipo2}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <span className="text-xs text-gray-600 italic m-2 text-center">*LEI Nº 13.954, DE 16 DE DEZEMBRO DE 2019.</span>
              </div>
            </div>
          </article>

        </div>

        <Links />
      </div>
    </>
  )
}
