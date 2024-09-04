"use client"

import { ModeloProcessoProps } from "@/types/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
export default function DropdownIniciarProcesso({ setProcessos, registrosModelos, setRegistrosModelos }: { setProcessos: React.Dispatch<React.SetStateAction<ModeloProcessoProps[]>>, registrosModelos: ModeloProcessoProps[], setRegistrosModelos: React.Dispatch<React.SetStateAction<ModeloProcessoProps[]>> }) {
    // const [registrosModelos, setRegistrosModelos] = useState([] as ModeloProcessoProps[]);
    async function getModelos(){
        new Promise(function(resolve) {
            setTimeout(() => {
                const registros = localStorage.getItem("modelosProcessos")
                resolve(setRegistrosModelos(JSON.parse(registros!)));
            }, 200);
        });
       
    }
    useEffect(() => {
        getModelos()
    }, [])
    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger id={"dropdownIniciarProcesso"} asChild>
                    <button className="uppercase focus:outline-none hover:text-gray-200 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative">Iniciar processo</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-[#192132] rounded-md px-3 py-2 text-gray-400 flex flex-col gap-1">
                        {registrosModelos?.map((modelo, index) => (
                            <DropdownMenu.Item key={modelo.titulo + index} className="focus:outline-none flex align-middle items-center gap-2">
                                <MdOutlineKeyboardDoubleArrowRight className="text-green-600 w-5 h-5" /><button onClick={() => setProcessos(state => [...state, {...modelo, id: self.crypto.randomUUID()}])} className="uppercase hover:text-gray-200 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative">{modelo.titulo}</button>
                            </DropdownMenu.Item>
                        ))}
                        <DropdownMenu.Arrow className="fill-[#192132]" />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    )
}