import { estados } from "@/utils/dados/cidades";
import Link from "next/link";
import { Dispatch, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { HiOutlineInformationCircle } from "react-icons/hi2";
export default function SelectCidades({setEstadoOrigem, setEstadoDestino,setCidadeOrigem, setCidadeDestino, estadoOrigem, estadoDestino}: {setEstadoOrigem: Dispatch<React.SetStateAction<string>>, setEstadoDestino: Dispatch<React.SetStateAction<string>>,setCidadeOrigem: Dispatch<React.SetStateAction<string>>,setCidadeDestino: Dispatch<React.SetStateAction<string>>, estadoOrigem: string, estadoDestino: string}) {

    return (
        <div className="flex gap-4 border border-green-600 rounded-md p-4 mt-4 relative">
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
                            {estados.filter(estado => estado.nome === estadoOrigem).map(estado =>
                                estado.cidades.map((cidade, index) =>
                                    <option key={index} value={cidade}>{cidade}</option>
                                ))}
                        </select>
                        <label htmlFor="cidade" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade Origem</label>
                    </div>
                    <Link href="/cidades" className="absolute -right-6 bg-green-600 w-6 rounded-r-2xl h-10 flex justify-center hover:bg-green-800 shadow-container hover:shadow-inner cursor-pointer hover:w-40 transition-all ease-in-out hover:rounded-3xl group">
                        <p className="px-2 hidden group-hover:flex text-white text-xs items-center">Deixe seu feedback</p>
                        <button className="w-2 mr-4 "><BiArrowToRight className="text-white h-5 w-5" /></button>
                    </Link>
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



        </div>
    )
}