'use client'
import CalcCombustivelViatura from "@/components/CalcCombustivelViatura";
import CalcGerador from "@/components/CalcGerador";
import Script from "next/script";
import { useState } from "react";
import { BsTruck } from "react-icons/bs";
import { PiEngine } from "react-icons/pi";

export default function calcCombustivel() {
    const [component, setComponent] = useState(<CalcCombustivelViatura />)

    function handleSwitchCalculation(tipo: string) {
        switch (tipo) {
            case 'viatura':
                return setComponent(<CalcCombustivelViatura />)
            case 'gerador':
                return setComponent(<CalcGerador />)
            default:
                break;
        }
    }
    return (
        <>
            <title>EBCalc - Calculadora Combustível</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="max-w-4xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
                <div className="flex flex-1 items-center justify-center mb-6 flex-col">
                    <h1 className="text-green-600 font-bold uppercase text-xl">Calculadora de Combustível</h1>
                    <p className="font-light text-white text-justify py-4">Essa calculadora tem como objetivo auxiliar o militar a calcular o valor aproximado de sua transferência ou de sua gratificação representação porém não se trata de uma ferramenta oficial.</p>
                </div>
                <div className="mb-8">
                    <div className="sm:hidden">
                        <select id="tabs" onChange={(e) => handleSwitchCalculation(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='transf'>Viatura</option>
                            <option value='grat'>Gerador</option>
                        </select>
                    </div>
                    <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                        <li className="w-full hover:text-green-600 text-white">
                            <button onClick={() => handleSwitchCalculation('viatura')} className={(component == <CalcCombustivelViatura /> ? 'active' : '') + "w-full p-4  bg-gray-100 gap-2 rounded-l-lg flex items-center focus:ring-2 justify-center focus:ring-green-600 focus:outline-none dark:bg-transparent dark:border dark:border-gray-500"} aria-current="page"><BsTruck />Viatura</button>
                        </li>
                        <li className="w-full hover:text-green-600 text-white">
                            <button onClick={() => handleSwitchCalculation('gerador')} className={(component == <CalcGerador /> ? 'active' : '') + "w-full p-4 bg-white rounded-r-lg gap-2 focus:ring-2 flex items-center focus:outline-none justify-center focus:ring-green-600 dark:border dark:border-gray-500  dark:bg-transparent"}><PiEngine />Gerador</button>
                        </li>
                    </ul>
                </div>
                {component}
            </div>
        </>
    )
}