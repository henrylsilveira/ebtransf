'use client'
import { useState } from "react"

export default function CalcCombustivelViatura(){
    const [consumo, setConsumo] = useState(0)
    const [distancia, setDistancia] = useState(0)
    const [combustivel, setCombustivel] = useState(0)
    return (
        <>
        <div className="flex gap-4">
          <div className="relative z-0 mb-6 w-full group flex items-center">
            <input type="number" name="consumo" onChange={(e) => setConsumo(Number(e.target.value))} id="consumo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="consumo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Consumo</label>
            <span className="text-white pl-2">Km/L</span>
          </div>
          <div className="relative z-0 mb-6 w-full group flex items-center">
            <input type="number" name="distancia" onChange={(e) => setDistancia(Number(e.target.value))} id="distancia" className="block [appearance:textfield] py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="distancia" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Distância</label>
            <span className="text-white pl-2">Km</span>
          </div>
          <div className="relative z-0 mb-6 w-full group flex items-center">
            <input type="number" name="combustivel" onChange={(e) => setCombustivel(Number(e.target.value))} id="combustivel" className="block [appearance:textfield] py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="combustivel" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Combustível</label>
            <span className="text-white pl-2">Litros</span>
          </div>
        </div>
        <div>
            {consumo && distancia 
            ? <p className="text-white border rounded-md p-2 border-green-600">São necessários {String((distancia / consumo).toFixed(2)) } litros de combustível para andar {String(distancia)} KM.</p>
                : consumo && combustivel 
                ? <p className="text-white border rounded-md p-2 border-green-600">É possível percorrer {String((combustivel / consumo).toFixed(2)) } Km com {String(combustivel)} Litros de combustível.</p>
                : distancia && combustivel
                ? <p className="text-white border rounded-md p-2 border-green-600">A viatura está fazendo {String((distancia / combustivel).toFixed(2)) } KM/L.</p>
                : <p className="text-white border rounded-md p-2 border-green-600">Digite os valores acima.</p>
            }   
        </div>
        </>
    )
}