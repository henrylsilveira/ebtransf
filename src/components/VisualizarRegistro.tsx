import { ConsumoGeradorProps } from "@/types/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

export function VisualizarRegistro() {
    const [visualizarRegistrosCombustivel, setVisualizarRegistrosCombustivel] = useState<ConsumoGeradorProps[]>([])
    function VisualizarRegistrosCombustivel(e: React.ChangeEvent<HTMLInputElement>) {

        if (e.target.files !== null) {
            var reader = new FileReader();
            const files = e.target.files[0]
            reader.onload = logFile;
            reader.readAsText(files)
        }
        function logFile(e: any) {

            setVisualizarRegistrosCombustivel(JSON.parse(e.target.result))
        }
    }
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="hover:bg-cyan-800 bg-transparent border text-xs border-cyan-700 uppercase text-white py-2 px-6 rounded-md flex items-center">
                    <BsEye className="pr-1 h-5 w-5 text-2xl text-white hover:text-cyan-600 transform transition-colors" />Visualizar
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[180vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-green-700 m-0 text-[17px] font-medium">
                        Registro do gerador
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>

                    <AlertDialog.Description className="text-white mt-4 mb-5 text-[15px] leading-normal">
                        Ajude nosso site a crescer e a facilitar mais ainda a sua vida. Conte para nós uma calculadora que você gostaria que tivesse na plataforma e que ajudaria mais ainda a desempenhar a sua função.
                    </AlertDialog.Description>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex flex-1 justify-between pb-2 gap-4">
                            <label htmlFor="fileVisualizar" className="hover:bg-orange-800 cursor-pointer block bg-transparent border text-sm border-orange-700 uppercase text-white py-2 px-6 rounded-md">
                                <input id="fileVisualizar" className="hidden" onChange={VisualizarRegistrosCombustivel} type="file" />
                                Visualizar
                            </label>
                            <button type="button" onClick={() => setVisualizarRegistrosCombustivel([])} className="hover:bg-blue-800 bg-transparent border text-sm border-blue-700 uppercase text-white py-2 px-6 rounded-md">
                                Apagar
                            </button>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Data
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gerador
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hora Inicio
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hora Termino
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Consumo
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Funcionamento
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {visualizarRegistrosCombustivel.map((registro, index) => (
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {registro.data}
                                        </th>
                                        <td className="px-6 py-4">
                                            {registro.gerador}
                                        </td>
                                        <td className="px-6 py-4">
                                            {registro.horaInicio}
                                        </td>
                                        <td className="px-6 py-4">
                                            {registro.horaTermino}
                                        </td>
                                        <td className="px-6 py-4">
                                            {registro.consumo}
                                        </td>
                                        <td className="px-6 py-4">
                                            {registro.funcionamento}
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
                                        {visualizarRegistrosCombustivel.reduce((total, item) => {
                                            return total + (+item.consumo);
                                        }, 0) + " litros"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {visualizarRegistrosCombustivel.reduce((total, item) => {
                                            return total + (+item.funcionamento);
                                        }, 0) + " horas"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}