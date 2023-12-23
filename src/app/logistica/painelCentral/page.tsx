'use client'
import Script from "next/script";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { api } from "@/services/axios";
import { DadosBancoProps, LogisticaCombustivelProps, TokenProps } from "@/types/types";
import { Loader } from "@/components/Loader/Loader";
import { Material } from "@/components/logistica/paa/Material";
import saveAs from "file-saver";
import Link from "next/link";

export default function PainelCentral() {
    
    const [dados, setDados] = useState<DadosBancoProps>()
    const [tokens, setTokens] = useState<TokenProps[]>([])
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<TokenProps>({
        nomeToken: "",
        token: "",
    });
    useEffect(() => {
        var registros = localStorage.getItem("listTokens")
        if (registros !== null) {
            setTokens(JSON.parse(registros))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("listTokens", JSON.stringify(tokens))
    }, [tokens])

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    function apagarDados() {
        localStorage.removeItem("listTokens")
        setTokens([])
    }

    async function pegarDados(token?: string) {
        setLoading(true);
        try {
            if (token) {
                const result = await api.get(`/instalacao/${token}`)
                setDados(result.data.data)
            } else {
                const result = await api.get(`/instalacao/${formData.token}`)
                setDados(result.data.data)
                const registros = JSON.stringify([...tokens, formData])
                setTokens(JSON.parse(registros));
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(localStorage.setItem("listTokens", registros));
                    }, 300);
                })
            }
        } catch (e) {
            console.error
        }
        setLoading(false);
    }

    function exportaRegistros(tipo: "combustivel" | "apoio" | "rancho" | "farmacia") {
        setLoading(true);
        var fileName = ""
        var fileName2 = ""
        var fileToSave = new Blob
        var fileToSave2 = new Blob
        switch (tipo) {
            case "combustivel":
                fileName = `${new Date().toLocaleString() + "-" + "DadosCombustiveis"}.comb`;
                fileName2 = `${new Date().toLocaleString() + "-" + "DadosEntradaSaidaCombustivel"}.regComb`;
                // Create a blob of the data
                fileToSave = new Blob([JSON.stringify(dados?.combustivel.tiposCombustivel)], {
                    type: 'application/comb'
                });
                fileToSave2 = new Blob([JSON.stringify(dados?.combustivel.registroEntradaSaida)], {
                    type: 'application/regComb'
                });
                break;
            case "apoio":
                fileName = `${new Date().toLocaleString() + "-" + "logisticaApoio"}.logApoio`;
                fileName2 = `${new Date().toLocaleString() + "-" + "logisticaApoioMaterial"}.logApoioMat`;
                // Create a blob of the data
                fileToSave = new Blob([JSON.stringify(dados?.apoio.tiposMaterial)], {
                    type: 'application/logApoio'
                });
                fileToSave2 = new Blob([JSON.stringify(dados?.apoio.registroEntradaSaida)], {
                    type: 'application/logApoioMat'
                });
                break;
            case "rancho":
                fileName = `${new Date().toLocaleString() + "-" + "DadosRancho"}.rancho`;
                fileName2 = `${new Date().toLocaleString() + "-" + "DadosEntradaSaidaRancho"}.regRancho`;
                // Create a blob of the data
                fileToSave = new Blob([JSON.stringify(dados?.rancho.tiposRancho)], {
                    type: 'application/rancho'
                });
                fileToSave2 = new Blob([JSON.stringify(dados?.rancho.registroEntradaSaida)], {
                    type: 'application/regRancho'
                });
                break;
            default:
                break;
        }

        // Save the file
        saveAs(fileToSave, fileName);
        saveAs(fileToSave2, fileName2);
        setLoading(false);
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
            <div className=" relative max-w-screen-xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
                <div className="flex items-center justify-center mb-6 flex-col">
                <div className="absolute top-2 left-2">
                    <Link className="hover:bg-green-800 text-xs bg-transparent border border-green-700 uppercase text-white py-2 px-6 rounded-md" href="/logistica">Logística</Link>
                </div>
                    <div>
                        <h1 className="text-green-600 font-bold uppercase text-xl mb-4">Painel Logístico</h1>
                        <div className=" flex flex-col my-2 w-full gap-4">
                            <div className="relative z-0 w-full group flex items-center">
                                <input type="text" name="nomeToken" onChange={handleChange} id="nomeToken" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="nomeToken" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome </label>
                            </div>
                            <div className="relative z-0 w-full group flex items-center">
                                <input type="text" name="token" onChange={handleChange} id="token" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="token" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token </label>
                            </div>
                            <div className="w-full flex justify-between text-center gap-2">
                                <button type="button" onClick={() => apagarDados()} className="hover:bg-red-800 text-xs w-full bg-transparent border border-red-700 uppercase text-white py-2 px-2 rounded-md justify-center flex"><p className="flex"><MdOutlineClose className="mx-auto w-4 h-4" />Apagar</p></button>
                                <button type="button" onClick={() => pegarDados()} className="hover:bg-blue-800 items-center text-xs w-full bg-transparent border border-blue-700 uppercase text-white py-2 px-2 rounded-md justify-center flex gap-2">Buscar</button>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-green-600 font-bold uppercase text-xl mb-4">Token registrados</h1>
                    <div className="grid xs:grid-cols-5 grid-cols-2 gap-4">
                        {tokens.map(token =>
                            <button type="button" key={token.token} onClick={() => pegarDados(token.token)} className="hover:bg-blue-800 w-32 justify-center text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-2 rounded-md flex gap-2">{token.nomeToken}</button>)}
                    </div>
                </div>
                {loading
                    ? <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                        <Loader loadingPage />
                    </div> :
                    <div className="border-t border-green-700 pt-2 flex flex-col gap-6">
                        {dados?.combustivel.tiposCombustivel.length !== 0 || dados?.combustivel.registroEntradaSaida.length !== 0 ?
                            <div>
                                {dados?.combustivel ?
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <div className="flex justify-between my-2">
                                            <h1 className="text-green-600 font-bold uppercase text-xl">Combustível</h1>
                                            {Object.keys(dados?.combustivel).length === 0 ?  (
                                                <button type="button" disabled  onClick={() => exportaRegistros("combustivel")} className="opacity-50 cursor-not-allowed hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button>
                                                ):
                                                <button type="button" onClick={() => exportaRegistros("combustivel")} className="hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button>

                                            }
                                        </div>
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
                                                        Disponibilidade %
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="">
                                                {dados.combustivel.tiposCombustivel?.map((registro, index) => (
                                                    <tr key={index + registro.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                                                        <td className={`px-6 py-4

                                                    " + ${Number((Number((dados.combustivel.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                            return total + (+item.quantidade);
                                                        }, 0)) - (dados.combustivel.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                            return total + (+item.quantidade);
                                                        }, 0))) * 100 / registro.total).toFixed(1)) > 50 ? "text-green-500" : "text-red-500"}`}>
                                                            {(Number((dados.combustivel.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                                return total + (+item.quantidade);
                                                            }, 0)) -
                                                                (dados.combustivel.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                                    return total + (+item.quantidade);
                                                                }, 0))) * 100 / registro.total).toFixed(1) + " %"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    : null}
                            </div>
                            : <p>Dados não existentes</p>
                        }
                        {dados?.rancho.tiposRancho?.length !== 0 || dados?.rancho.registroEntradaSaida?.length !== 0 ?
                            <div>
                                {dados?.rancho ?
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <div className="flex justify-between my-2">
                                            <h1 className="text-green-600 font-bold uppercase text-xl">Rancho</h1>
                                            {Object.keys(dados?.rancho).length === 0 ?  (
                                                <button type="button" disabled  onClick={() => exportaRegistros("rancho")} className="opacity-50 cursor-not-allowed hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button>
                                                ):
                                                <button type="button" onClick={() => exportaRegistros("rancho")} className="hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button>
                                            }
                                        </div>
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
                                                {dados.rancho.tiposRancho?.map((registro, index) => (
                                                    <tr key={registro + registro.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                                                            {dados.rancho ?
                                                                (Number((
                                                                    (dados.rancho.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                                        return total + (+item.quantidade);
                                                                    }, 0)) -
                                                                    (dados.rancho.registroEntradaSaida?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                                        return total + (+item.quantidade);
                                                                    }, 0)))) * 1000 / (registro.valorEtapa * dados.rancho.efetivo)).toFixed(0) + " Dias" : <></>}
                                                        </td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                    : null}
                            </div>
                            : <p>Dados não existentes</p>
                        }
                        {dados?.apoio.tiposMaterial?.length !== 0 || dados?.apoio.registroEntradaSaida.length !== 0 ?
                            <div>
                                {dados?.apoio ?
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <div className="flex justify-between my-2">
                                            <h1 className="text-green-600 font-bold uppercase text-xl">Apoio</h1>
                                            {Object.keys(dados?.apoio).length === 0 ?  (
                                                <button type="button" disabled  onClick={() => exportaRegistros("apoio")} className="opacity-50 cursor-not-allowed hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button>
                                                ):
                                                <button type="button" onClick={() => exportaRegistros("apoio")} className=" hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button>
                                            }
                                        </div>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Data
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Código
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Tipo
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Destino
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Peso Total
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dados?.apoio.tiposMaterial?.map((registro, index) => (
                                                    <tr key={index + registro.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {registro.data}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {registro.id}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {registro.tipo}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {registro.destino}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {registro.peso}
                                                        </td>
                                                        <td className="py-4">
                                                            <Material materiais={dados?.apoio.registroEntradaSaida} id={registro.id} painel />
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Total
                                                    </th>
                                                    <td className="px-6 py-4">

                                                    </td>
                                                    <td className="px-6 py-4">

                                                    </td>
                                                    <td className="px-6 py-4">

                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {dados.apoio.tiposMaterial ? dados.apoio.tiposMaterial?.reduce((total, item) => {
                                                            return total + (+item.peso);
                                                        }, 0) + "kg" : 0 + "kg"}
                                                    </td>
                                                    <td className="px-6 py-4">

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    : null}
                            </div>
                            : <p>Dados não existentes</p>
                        }
                    </div>}
            </div>
        </>
    )
}