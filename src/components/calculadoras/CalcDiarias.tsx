import { formataValor } from "@/utils/scripts";
import { useState } from "react";

export default function CalcDiaria() {
    const [cuba, setCuba] = useState(0)
    const [qntDias, setQntDias] = useState(0)

    return (
        <>
            <div className="fixed left-0 bg-gray-900 opacity-80 shadow-lg w-screen shadow-black bottom-0 p-4 z-10">
                <div className="border-2 border-green-600 rounded p-2 flex flex-1 items-center justify-center text-white font-bold text-lg">Valor aproximado a receber pela Grat Rep:
                    <p className="text-xl font-extrabold pl-4">{formataValor(((cuba) * qntDias))}</p></div>
            </div>
            <div className="border border-green-600 rounded-md p-6 relative">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">BASE DE CÁLCULO</h1>
                <div className="grid xl:grid-cols-3 xl:gap-6 sm:grid-cols-1 gap-4">
                    <div className="border border-green-600 rounded-md p-6 relative ">
                        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Bagagem</h1>

                        <div className="grid xl:grid-cols-2 xl:gap-6">
                            <div className="relative z-0 mb-6 w-full group">
                                <select name="bagagem" id="bagagem" onChange={(e) => setCuba(Number(e.target.value))} className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                    <option></option>
                                    <option value={60}>Generais 60m³</option>
                                    <option value={55}>Cel/Ten Cel/Maj 55m³</option>
                                    <option value={50}>Cap/1ºTen/2ºTen 50m³</option>
                                    <option value={45}>Asp Of 45m³</option>
                                    <option value={50}>Sub Ten/1ºSgt 50m³</option>
                                    <option value={45}>2ºSgt/3ºSgt 45m³</option>
                                </select>
                                <label htmlFor="bagagem" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cubagem</label>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="number" name="qntDias" onChange={(e) => setQntDias(Number(e.target.value))} id="qntDias" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="qntDias" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Qnt de Dias</label>
                    </div>

                </div>
            </div>

            {/* VALORES */}
            <div className="border border-green-600 rounded-md p-6 relative mt-4">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Valores</h1>

                <div className="flex flex-1">
                    <b className="text-gray-300">Dias:</b><p className="pl-4 text-white">{qntDias}</p>
                </div>
                <div className="flex flex-1">
                    <b className="text-gray-300">Total:</b><p className="pl-4 text-white">{formataValor((( cuba / 100) * qntDias))}</p>
                </div>
            </div>
        </>
    )
}