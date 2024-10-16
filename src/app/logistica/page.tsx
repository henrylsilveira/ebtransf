'use client'
import CalcCombustivelViatura from "@/components/calculadoras/CalcCombustivelViatura";
import { Combustivel } from "@/components/logistica/combustivel/Combustivel";
import { LogisticaApoio } from "@/components/logistica/paa/LogisticaApoio";
import Script from "next/script";
import { useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { PiAirplane, PiBuildings, PiEngine } from "react-icons/pi";
import { LuFuel } from "react-icons/lu";
import { Rancho } from "@/components/logistica/rancho/Rancho";
import { Instalacao } from "@/components/logistica/instalacao/Instalacao";
import { toast } from "react-toastify";
import { api } from "@/services/axios";
import { MenuAjuda } from "@/components/logistica/ajuda/page";
import Link from "next/link";

export default function Logistica() {

    const [component, setComponent] = useState(<Instalacao />)

    function handleSwitchCalculation(tipo: string) {
        switch (tipo) {
            case 'instalacao':
                return setComponent(<Instalacao />)
            case 'combustivel':
                return setComponent(<Combustivel enviar={atualizarBancoDados} />)
            case 'rancho':
                return setComponent(<Rancho enviar={atualizarBancoDados} />)
            case 'apoio':
                return setComponent(<LogisticaApoio enviar={atualizarBancoDados} />)
            default:
                break;
        }
    }

    async function atualizarBancoDados(data: {
        data: {},
        tipo: string;
        id: string;
    }) {

        if (data.data == false || data.tipo == "" || data.id == "") {
            toast.info("Informe o Token!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });

        } else {
            try {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(api.put("/instalacao", { data }));
                    }, 300);
                })
                toast.success("Registros salvos no banco com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            } catch (error) {
                toast.error("Erro no envio do registro!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            }
        }

    }

    return (
        <>
            <title>EBCalc - Ferramenta de Logística</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="relative max-w-4xl w-10/12 sm:text-md text-sm mx-auto shadow-container p-10 rounded-lg mb-20 mt-6 max-h-full min-h-screen">
                <div className="flex flex-1 items-center justify-center mb-6 flex-col">
                    <h1 className="text-green-600 font-bold uppercase text-xl">Controle de Logística</h1>
                    <p className="font-light text-white text-justify py-4">Essa ferramenta tem como objetivo auxiliar na gestão de instalações, para que seja mais simples visualizar os materiais existentes e sua entrada e saída.</p>
                </div>
                <div className="absolute top-2 left-2">
                    <Link className="hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md" href="/logistica/painelCentral">Visualizar Dados</Link>
                </div>
                <div className="absolute top-2 right-2">
                    <MenuAjuda />
                </div>
                <div className="mb-8">
                    <div className="sm:hidden">
                        <select id="tabs" onChange={(e) => handleSwitchCalculation(e.target.value)} className="bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='instalacao'>Instalação</option>
                            <option value='combustivel'>Combustível</option>
                            <option value='rancho'>Rancho</option>
                            <option value='apoio'>Apoio</option>
                        </select>
                    </div>
                    <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                        <li className="w-full hover:text-green-600 text-white bg-transparent">
                            <button onClick={() => handleSwitchCalculation('instalacao')} className={(component == <Instalacao /> ? 'active' : '') + "w-full p-4  bg-gray-900 border border-gray-500 gap-2 rounded-l-lg flex items-center focus:ring-2 justify-center focus:ring-green-600 focus:outline-none dark:bg-transparent dark:border dark:border-gray-500"} aria-current="page"><PiBuildings />Instalação</button>
                        </li>
                        <li className="w-full hover:text-green-600 text-white bg-transparent">
                            <button onClick={() => handleSwitchCalculation('combustivel')} className={(component == <Combustivel enviar={atualizarBancoDados} /> ? 'active' : '') + "w-full p-4  bg-gray-900 border border-gray-500 gap-2 flex items-center focus:ring-2 justify-center focus:ring-green-600 focus:outline-none dark:bg-transparent dark:border dark:border-gray-500"}><LuFuel />Combustivel</button>
                        </li>
                        <li className="w-full hover:text-green-600 text-white bg-transparent">
                            <button onClick={() => handleSwitchCalculation('rancho')} className={(component == <Rancho enviar={atualizarBancoDados} /> ? 'active' : '') + "w-full p-4  bg-gray-900 border border-gray-500 gap-2 flex items-center focus:ring-2 justify-center focus:ring-green-600 focus:outline-none dark:bg-transparent dark:border dark:border-gray-500"}><MdOutlineFoodBank />Rancho</button>
                        </li>
                        <li className="w-full hover:text-green-600 text-white bg-transparent">
                            <button onClick={() => handleSwitchCalculation('apoio')} className={(component == <LogisticaApoio enviar={atualizarBancoDados} /> ? 'active' : '') + "w-full p-4 bg-gray-900 border border-gray-500 rounded-r-lg gap-2 focus:ring-2 flex items-center focus:outline-none justify-center focus:ring-green-600 dark:border dark:border-gray-500  dark:bg-transparent"}><PiAirplane />Apoio</button>
                        </li>
                    </ul>
                </div>
                {component}
            </div>
        </>
    )
}