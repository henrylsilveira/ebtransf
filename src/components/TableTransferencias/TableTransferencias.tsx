'use client'
import { DadosTransferencia } from "@/types/types";
import { parseISODate, returnCitiesDestino, returnCitiesOrigem, returnCountCities } from "@/utils/scripts";
import { TbPlaneArrival, TbPlaneDeparture } from "react-icons/tb";
import { NotData } from "../NotData";
import { useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";

export default function TableTransferencias({ data }: { data: DadosTransferencia[] }) {
    const year = new Date().getFullYear()
    const [citiesFilter, SetCitiesFilter] = useState("")
    const [anoFilter, SetAnoFilter] = useState(year)

    return (
        <>
            <div className="w-full flex justify-center flex-col mb-4">
                <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Tabela de Análise de transferências</h1>
            </div>
            <div className="flex flex-1 flex-col mx-auto max-w-4xl w-full sm:text-md text-sm shadow-container sm:p-4 rounded-lg mb-2 ">
                <div className="flex flex-1 justify-between ">
                    <div className="flex flex-col gap-2 items-center md:flex-row p-4 xl:p-0">
                        <p className="text-green-600 font-bold">Transferências simuladas:</p>
                        <p className="text-white text-6xl md:text-sm">{data?.length}</p>
                    </div>
                    <div className="flex py-4">
                        <div className="grid md:grid-cols-3 gap-8 md:gap-2">
                            <div className="flex items-center gap-2 border-l border-gray-500 px-2" >
                                <TbPlaneArrival className="text-green-800 w-6 h-6" />
                                <div className="relative z-0 w-full group">
                                    <select name="cidadeDestino" onChange={(e) => SetCitiesFilter(e.target.value)} id="cidadeDestino" className="text-xs h-6 leading-tight focus:bg-gray-900 block py-1.5 px-0 w-28 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                        <option></option>
                                        {returnCitiesDestino(data).map((city, index) =>
                                            <option key={index} value={city}>{city}</option>
                                        )}
                                    </select>
                                    <label htmlFor="cidadeDestino" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Destino</label>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-l border-gray-500 px-2">
                                <TbPlaneDeparture className="text-red-800 w-6 h-6" />
                                <div className="relative z-0 w-full group">
                                    <select name="cidadeOrigem" onChange={(e) => SetCitiesFilter(e.target.value)} id="cidadeOrigem" className="h-6 leading-tight focus:bg-gray-900 block py-1.5 px-0 w-28 text-xs text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                        <option></option>
                                        {returnCitiesOrigem(data).map((city, index) =>
                                            <option key={index} value={city}>{city}</option>
                                        )}
                                    </select>
                                    <label htmlFor="cidadeOrigem" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Origem</label>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 border-l border-gray-500 px-2">
                            <BsCalendar2Date className="text-gray-400 w-6 h-6" />
                                <div className="relative z-0 w-full group">
                                    <input type="number" min="2024" max="2099" step="1" name="distanciaKm" value={anoFilter} onChange={(e) => SetAnoFilter(Number(e.target.value))} id="distanciaKm" className="block py-2.5 px-0 w-28 h-6 [appearance:textfield] text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="distanciaKm" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-4 scale-75 top-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Ano</label>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
            {
                returnCountCities(data.filter((city) => parseISODate(city?.date).ano === anoFilter)).length === 0
                    ? <div className="h-screen">
                        <NotData textoComponent={"Não foi possível carregar os dados ou não existe nenhum registro com esse filtro."} />
                        </div>
                    :
                    <div className="overflow-x-auto shadow-md sm:rounded-lg h-screen">
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-xs sm:text-sm text-left text-gray-400">
                                <thead className="text-xs uppercase bg-green-800 text-white">
                                    <tr>
                                        <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Cidade</th>
                                        <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Destino</th>
                                        <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Origem</th>
                                        <th scope="col" className="sm:py-3 sm:px-6 py-1 px-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-y-auto">
                                    {returnCountCities(data.filter((city) => parseISODate(city?.date).ano === anoFilter).filter((city) => citiesFilter == "" ? city : city.cidadeDestino == citiesFilter || city.cidadeOrigem == citiesFilter)).sort((x, y) => {
                                        let a = x.count,
                                            b = y.count;
                                        return a == b ? 0 : a < b ? 1 : -1;
                                    }).map((city, index) =>
                                        <tr className="border-b bg-gray-800 border-gray-700">
                                            <td className="sm:py-4 sm:px-6 py-1 px-2">{city.city.toUpperCase()}</td>
                                            <td className="sm:py-4 sm:px-6 py-1 px-2 text-center"><p className="flex items-center gap-2"><TbPlaneArrival className="text-green-800" />{city.countDestino}</p></td>
                                            <td className="sm:py-4 sm:px-6 py-1 px-2 text-center"><p className="flex items-center gap-2"><TbPlaneDeparture className="text-red-800" />{city.countOrigem}</p></td>
                                            <td className="sm:py-4 sm:px-6 py-1 px-2">{city.count}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div>
                                <span className="text-xs text-gray-500 italic text-center">*Essa tabela contém os dados de simulações de transferências realizadas por outros usuários. O intuito dessa tabela é apenas demonstrar uma análise dos dados salvos, sendo passível de erros.</span>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}