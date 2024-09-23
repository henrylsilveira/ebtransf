import { estados } from "@/utils/dados/cidades";
import Link from "next/link";
import { Dispatch, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { FeedbackCidades } from "../feedbackCidades/feedbackCidades";
import { FaRegChartBar, FaRoute } from "react-icons/fa";
import { EstadosCidadesCoordProps } from "@/types/types";
import { estados_cidades_coord } from "@/utils/dados/brasil_cidades";
import { convertTextToValue } from "@/utils/scripts";
import { convertHour } from '../../utils/scripts';
import { NotData } from "../NotData";
export default function SelectCidades({ setEstadoOrigem, setEstadoDestino, setCidadeOrigem, setCidadeDestino, estadoOrigem, estadoDestino, cidadeOrigem, cidadeDestino }: { setEstadoOrigem: Dispatch<React.SetStateAction<string>>, setEstadoDestino: Dispatch<React.SetStateAction<string>>, setCidadeOrigem: Dispatch<React.SetStateAction<string>>, setCidadeDestino: Dispatch<React.SetStateAction<string>>, estadoOrigem: string, estadoDestino: string, cidadeOrigem: string, cidadeDestino: string }) {
    const [result, setResult] = useState({} as any | false)
    const [cidades, setCidades] = useState({} as {
        cidadeOrigem: EstadosCidadesCoordProps | false
        cidadeDestino: EstadosCidadesCoordProps | false
    })
    async function calculaDistancia() {
        const cidadeOrigemResult: EstadosCidadesCoordProps | boolean = estados_cidades_coord.filter((cidade) => cidade.city?.toLowerCase().includes(cidadeOrigem.toLowerCase()) )[0] ? estados_cidades_coord.filter((cidade) => cidade.city?.toLowerCase().includes(cidadeOrigem.toLowerCase()))[0] : false
        const cidadeDestinoResult: EstadosCidadesCoordProps | boolean = estados_cidades_coord.filter((cidade) => cidade.city?.toLowerCase().includes(cidadeDestino.toLowerCase()) )[0] ? estados_cidades_coord.filter((cidade) => cidade.city?.toLowerCase().includes(cidadeDestino.toLowerCase()))[0] : false
        setCidades({
            cidadeOrigem: cidadeOrigemResult,
            cidadeDestino: cidadeDestinoResult
        })
        if (cidadeOrigemResult !== false && cidadeDestinoResult !== false) {
            const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${cidadeOrigemResult.lng},${cidadeOrigemResult.lat};${cidadeDestinoResult.lng},${cidadeDestinoResult.lat}?alternatives=false&geometries=geojson&language=pt&overview=simplified&steps=true&access_token=pk.eyJ1IjoiaGVucnlsZWFvIiwiYSI6ImNtMWYzYnZtZzJsc3Mya216a3ZxbHJlMmsifQ.tWUPbbqY-s0RtICObKE75g`)
            setResult(await res.json())
        }else{
            setResult(false)
        }
    }

    return (
        <div className="flex flex-col gap-4 border border-green-600 rounded-md p-4 mt-4 relative">
            <h1 className="left-4 -top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Local / Destino</h1>
            <div className="grid grid-cols-1 w-full">
                <div className="grid grid-cols-2">
                    <div className="relative z-0  w-full group p-2 ">
                        <select name="estado" id="estado" onChange={(e) => { setEstadoOrigem(e.target.value) }} className="leading-tight block py-2.5 px-0 w-full text-md text-white focus:bg-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                            <option></option>
                            {estados.map(estado =>
                                <option key={estado.sigla} value={estado.nome}>{estado.nome} / {estado.sigla}</option>
                            )}
                        </select>
                        <label htmlFor="estado" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado Origem</label>
                    </div>
                    <div className="relative z-0  w-full group p-2">
                        <select name="cidade" id="cidade" onChange={(e) => { setCidadeOrigem(e.target.value) }} className="leading-tight block py-2.5 px-0 w-full text-md text-white focus:bg-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                            <option></option>
                            {estados_cidades_coord.filter(cidade => cidade.admin_name === estadoOrigem).sort((x, y) => {
                                let a = x.city_ascii,
                                    b = y.city_ascii;
                                return a == b ? 0 : a > b ? 1 : -1;
                            }).map(cidade =>
                                <option key={cidade.id} value={cidade.city}>{cidade.city}</option>
                            )}
                        </select>
                        <label htmlFor="cidade" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade Origem</label>
                    </div>

                    <FeedbackCidades compact={true} />

                </div>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2">
                        <div className="relative z-0  w-full group p-2">
                            <select name="estado" id="estado" onChange={(e) => { setEstadoDestino(e.target.value) }} className="leading-tight block py-2.5 px-0 w-full text-md text-white focus:bg-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option></option>
                                {estados.map(estado =>
                                    <option key={estado.sigla} value={estado.nome}>{estado.nome} / {estado.sigla}</option>
                                )}
                            </select>
                            <label htmlFor="estado" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado Destino</label>
                        </div>
                        <div className="relative z-0  w-full group p-2">
                            <select name="cidade" id="cidade" onChange={(e) => { setCidadeDestino(e.target.value) }} className="leading-tight block py-2.5 px-0 w-full text-md text-white focus:bg-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option></option>
                                {estados.filter(estado => estado.nome === estadoDestino).map(estado =>
                                    estado.cidades.map((cidade, index) =>
                                        <option key={index} value={cidade}>{cidade}</option>
                                    ))}
                            </select>
                            <label htmlFor="cidade" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade Destino</label>
                        </div>
                        <Link href="/cidades" className="absolute -right-6 bg-green-600 w-6 rounded-r-2xl h-10 flex justify-center hover:bg-green-800 shadow-container hover:shadow-inner cursor-pointer hover:w-40 transition-all ease-in-out hover:rounded-3xl group">
                            <p className="px-2 hidden group-hover:flex text-white text-xs items-center">Veja os feedbacks</p>
                            <button className="w-2 mr-4 "><HiOutlineInformationCircle className="text-white h-5 w-5" /></button>
                        </Link>
                    </div>

                </div>
            </div>
            {(cidades.cidadeOrigem || cidades.cidadeDestino) ?
                <div className="flex flex-col bg-gray-950 p-2 rounded-md shadow-container text-xs md:text-base">
                    <div className="grid grid-cols-[2fr_1fr_2fr] border-b border-green-800 py-4 px-2">
                        {cidades.cidadeOrigem ?
                            <div className="flex flex-col">
                                <p className="text-green-800 font-semibold text-2xl">{cidades.cidadeOrigem.admin_name}</p>
                                <p className="text-gray-600 font-semibold text-md">{cidades.cidadeOrigem.city} - {cidades.cidadeOrigem.sigla_state}</p>
                                <p className="text-gray-600 font-semibold text-md">População: {cidades.cidadeOrigem.population.toLocaleString('pt-BR')}</p>
                                <Link className="mt-4 flex text-sm text-white items-center justify-center gap-2 bg-blue-900/80 hover:bg-blue-900/20 transition-all duration-500 ease-out w-20 shadow-container rounded-sm" target="_blank" href={`https://cidades.ibge.gov.br/brasil/${convertTextToValue(cidades.cidadeOrigem.sigla_state)}/${convertTextToValue(cidades.cidadeOrigem.city)}/panorama`}><FaRegChartBar />IBGE</Link>
                            </div> : <NotData textoComponent={"Cidade não encontrada!"} />
                        }
                        <div className="text-white text-2xl flex justify-center items-center">
                            X
                        </div>
                        {cidades.cidadeDestino ?
                            <div>
                                <p className="text-green-800 font-semibold text-2xl">{cidades.cidadeDestino.admin_name}</p>
                                <p className="text-gray-600 font-semibold text-md">{cidades.cidadeDestino.city} - {cidades.cidadeDestino.sigla_state}</p>
                                <p className="text-gray-600 font-semibold text-md">População: {cidades.cidadeDestino.population.toLocaleString('pt-BR')}</p>
                                <Link className="mt-4 flex text-sm text-white items-center justify-center gap-2 bg-blue-900/80 hover:bg-blue-900/20 transition-all duration-500 ease-out w-20 shadow-container rounded-sm" target="_blank" href={`https://cidades.ibge.gov.br/brasil/${convertTextToValue(cidades.cidadeDestino.sigla_state)}/${convertTextToValue(cidades.cidadeDestino.city)}/panorama`}><FaRegChartBar />IBGE</Link>
                            </div> : <NotData textoComponent={"Cidade não encontrada!"} />
                        }

                    </div>
                    {(result && cidades.cidadeOrigem && cidades.cidadeDestino) ? <div className="mx-auto mt-4 ">
                        <p className="text-green-800 text-lg font-semibold">Distância: { result !== undefined && (result?.routes[0]?.distance / 1000).toFixed(2)} km</p>
                        <p className="text-gray-600 text-lg font-semibold">Duração: {result !== undefined && convertHour(result?.routes[0]?.duration)}</p>
                    </div> : <NotData textoComponent={"Não foi possível retornar as informações!"} />
                    }

                </div> : <></>}

            <button onClick={() => calculaDistancia()} className="flex shadow-shape gap-2 py-2 justify-center items-center px-4 text-white/80  hover:bg-blue-900/20  rounded-lg "><FaRoute />Calcular Distância</button>
        </div>
    )
}