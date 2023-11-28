'use client'
import CalcCombustivelViatura from "@/components/CalcCombustivelViatura";
import { Combustivel } from "@/components/logistica/combustivel/Combustivel";
import { LogisticaApoio } from "@/components/logistica/paa/LogisticaApoio";
import Script from "next/script";
import { useEffect, useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { PiAirplane, PiEngine } from "react-icons/pi";
import { LuFuel } from "react-icons/lu";
import { Rancho } from "@/components/logistica/rancho/Rancho";
import { Instalacao } from "@/components/logistica/instalacao/Instalacao";
import { toast } from "react-toastify";
import { api } from "@/services/axios";
import { DadosBancoProps, LogisticaCombustivelProps } from "@/types/types";
import { LogisticaCombustivel } from "@/components/logistica/combustivel/LogisticaCombustivel";

export default function PainelCentral() {
    const [dados, setDados] = useState<DadosBancoProps>()
    const [tokens, setTokens] = useState([])
    const [token, setToken] = useState("")

    useEffect(() => {
        var registros = localStorage.getItem("listTokens")
        if (registros !== null) {
            setTokens(JSON.parse(registros))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("listTokens", JSON.stringify(tokens))
    }, [tokens])

    async function pegarDados() {
        try {
            const result = await api.get(`/instalacao/${token}`)
            setDados(result.data.data)
            const registros = JSON.stringify([...tokens, token])
            setTokens(JSON.parse(registros));
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(localStorage.setItem("listTokens", registros));
                }, 300);
            })
        } catch (e) {
            console.error
        }
    }
    return (
        <>
            <title>EBCalc - Ferramenta de Logística | Painel Central</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="max-w-screen-xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
                <div className="flex items-center justify-center mb-6 flex-col">
                    <div className="">
                        <h1 className="text-green-600 font-bold uppercase text-xl">Painel Logístico</h1>
                        <div className=" flex flex-col my-2 w-full gap-4">
                            <div className="relative z-0 w-full group flex items-center">
                                <input type="text" name="token" onChange={(e) => setToken(e.target.value)} id="token" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="token" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token </label>
                            </div>
                            <div>
                                <button type="button" onClick={() => pegarDados()} className="hover:bg-blue-800 items-center text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-2 rounded-md flex gap-2">Buscar</button>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-green-600 font-bold uppercase text-xl">Token registrados</h1>
                    {tokens.map(token =>
                        <button type="button" onClick={() => { }} className="hover:bg-blue-800 items-center text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-2 rounded-md flex gap-2">{token}</button>)}
                </div>
                <div className="flex flex-col gap-6">
                    {dados?.combustivel ?
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Código
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tipo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Quantidade
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Capacidade
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="">
                                    {dados.combustivel.tiposCombustivel.map((registro, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {registro.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {registro.tipo}
                                            </td>
                                            <td className="px-6 py-4">
                                                {(dados.combustivel.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                    return total + (+item.quantidade);
                                                }, 0)) -
                                                    (dados.combustivel.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                        return total + (+item.quantidade);
                                                    }, 0))} l
                                            </td>
                                            <td className="px-6 py-4">
                                                {registro.total} l
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        : null}

                    {dados?.rancho ?
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Código
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tipo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Quantidade
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Capacidade
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Valor Etapa
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Dias Restantes
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {dados.rancho.tiposRancho.map((registro, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {registro.id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {registro.tipo}
                                            </td>
                                            <td className="px-6 py-4">
                                                {(dados.rancho.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                    return total + (+item.quantidade);
                                                }, 0)) -
                                                    (dados.rancho.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                        return total + (+item.quantidade);
                                                    }, 0))} kg
                                            </td>
                                            <td className="px-6 py-4">
                                                {registro.total} kg
                                            </td>
                                            <td className="px-6 py-4">
                                                {registro.valorEtapa} g
                                            </td>
                                            <td className="px-6 py-4">
                                                {(Number((
                                                    (dados.rancho.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                        return total + (+item.quantidade);
                                                    }, 0)) -
                                                    (dados.rancho.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                        return total + (+item.quantidade);
                                                    }, 0)))) * 1000 / (registro.valorEtapa * dados.rancho.efetivo)).toFixed(0) + " Dias"}
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        : null}
                </div>
            </div>
        </>
    )
}