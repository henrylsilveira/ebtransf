'use client'
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { nanoid } from "nanoid";
import { Dispatch, useState } from "react";
import { BsEye } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { Loader } from "../../Loader/Loader";
import { toast } from "react-toastify";
import { LogisticaCombustivelProps } from "@/types/types";
import { removerObjetoPorID } from "@/utils/scripts";

export function LogisticaCombustivel({ logistica, idComb, tipo, hookComb }: { logistica: LogisticaCombustivelProps[], idComb: string, tipo: string, hookComb?: Function }) {
    // const [visualizarRegistrosCombustivel, setVisualizarRegistrosCombustivel] = useState<ConsumoGeradorProps[]>([])
    const [loading, setLoading] = useState(false);
    const [qntRegistros, setQntRegistros] = useState(30)

    const [formData, setFormData] = useState<LogisticaCombustivelProps>({
        id: "",
        idCombustivel: idComb,
        tipo: "",
        finalidade: "",
        data: "",
        quantidade: 0,
    });

    async function apagarDado(idDado: string) {
        setLoading(true);
        const newArray = removerObjetoPorID(logistica, idDado)
        try {
            if (hookComb) {
                await hookComb(newArray)
            }
            const registros = JSON.stringify(logistica)
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(localStorage.setItem("logisticaEntradaSaidaCombustivel", registros));
                }, 300);
            })
            toast.success("Registro removido com sucesso!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        } catch (error) {
            toast.error("Erro ao remover o registro!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        }
        setLoading(false);
    }

    const handleSubmitCombustivel = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (formData.tipo == "" || formData.finalidade == "" || formData.quantidade == 0 || formData.data == "") {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false);
        } else {
            try {
                const registros = JSON.stringify([...logistica, formData])
                if (hookComb) {
                    hookComb([...logistica, formData])
                }

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(localStorage.setItem("logisticaEntradaSaidaCombustivel", registros));
                    }, 300);
                })
                toast.success("Registrado com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            } catch (error) {
                toast.error("Erro no envio do registro!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            }
            setLoading(false);
        }
    }

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            id: nanoid(4),
            [event.target.name]: event.target.value,
        });
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="hover:bg-cyan-800 bg-transparent border text-xs border-cyan-700 uppercase text-white py-2 px-6 rounded-md flex items-center">
                    <BsEye className="pr-1 h-5 w-5 text-2xl text-white hover:text-cyan-600 transform transition-colors" />Registrar
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[100vh] w-[180vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <div className="w-full h-full">

                        <AlertDialog.Title className="text-green-700 m-0 text-2xl font-medium">
                            Registro de Entrada ou Saida de {tipo}
                        </AlertDialog.Title>
                        <AlertDialog.Cancel>
                            <button className="absolute right-2 top-2 text-white">
                                <MdOutlineClose />
                            </button>
                        </AlertDialog.Cancel>

                        <AlertDialog.Description className="text-white mt-4 mb-5 text-[15px] leading-normal">
                            <p>Código do comnbustivel: {idComb}</p>
                        </AlertDialog.Description>
                        <form onSubmit={handleSubmitCombustivel} className="mb-4">
                            <div className="flex flex-1 items-center justify-center my-6 flex-col">
                                <h1 className="text-green-600 font-bold uppercase text-xl">Registrar entrada ou saída de combustível.</h1>

                            </div>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <input type="date" name="data" onChange={handleChange} id="data" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                        <label htmlFor="data" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <select name="tipo" id="tipo" onChange={handleChange} className="leading-tight block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:bg-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                            <option></option>
                                            <option value={"entrada"}>Entrada</option>
                                            <option value={"saida"}>Saida</option>
                                        </select>
                                        <label htmlFor="tipo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <input type="text" name="finalidade" onChange={handleChange} id="finalidade" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 focus:bg-gray-900 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                        <label htmlFor="finalidade" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Finalidade</label>
                                    </div>
                                    <span className="text-xs text-gray-600">Ex: Ressuprimento, Gerador</span>
                                </div>
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <input type="number" name="quantidade" onChange={handleChange} id="quantidade" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                        <label htmlFor="quantidade" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantidade</label>
                                        <span className="text-xs text-gray-600">L</span>
                                    </div>
                                </div>

                            </div>
                            {loading
                                ? <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                                    <Loader />
                                </div>
                                : <div className=" flex justify-center mt-4 pt-4 gap-4">
                                    <button type="submit" className="hover:bg-green-800 bg-transparent border w-full text-xs border-green-700 uppercase text-white py-2 px-6 rounded-md">Registrar</button>
                                </div>}
                        </form>
                        <div className="shadow-md sm:rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="relative z-0 group flex items-center">
                                    <input type="number" name="qntRegistros" onChange={e => setQntRegistros(Number(e.target.value))} id="qntRegistros" className="block w-10 [appearance:textfield] py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                    <label htmlFor="qntRegistros" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registros</label>
                                </div>
                                <p className="text-white">Total registros: {logistica.filter(reg => reg.idCombustivel === idComb).length}</p>
                            </div>
                            <div className="my-2 flex justify-center w-full">
                                <table className="text-sm text-left rtl:text-right w-full text-gray-500 dark:text-gray-400 ">
                                    <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
                                        <div className="w-full ">
                                            <tr className="w-full flex flex-wrap justify-between flex-row flex-1 items-center">
                                                <th scope="col" className="px-6 py-3 w-1/6">
                                                    Data
                                                </th>
                                                <th scope="col" className="px-6 py-3 w-1/6">
                                                    Código Combustível
                                                </th>
                                                <th scope="col" className="px-6 py-3 w-1/6">
                                                    Tipo
                                                </th>
                                                <th scope="col" className="px-6 py-3 w-1/6">
                                                    Finalidade
                                                </th>
                                                <th scope="col" className="px-6 py-3 w-1/6">
                                                    Quantidade
                                                </th>
                                                <th scope="col" className="px-6 py-3 w-1/6">

                                                </th>

                                            </tr>
                                        </div>
                                    </thead>
                                    <tbody>
                                        {loading ? <Loader loadingPage /> : 
                                            <div className="w-full overflow-y-scroll max-h-96">
                                                {logistica?.filter(log => log.idCombustivel === idComb).map((log, index) => (
                                                    
                                                    <tr key={index} className={`w-full flex flex-wrap justify-between odd:bg-gray-900 odd:dark:bg-gray-900 dark:hover:bg-green-700/30 even:bg-gray-800 even:dark:bg-gray-800 border-b border-gray-700 dark:border-b-gray-700 ${log.tipo === "entrada" ? 'dark:border-l-4 dark:border-l-green-500' : 'dark:border-l-4 dark:border-l-red-500'}`}>
                                                        <th scope="col" className="px-6 py-2 w-1/6 font-medium text-white whitespace-nowrap dark:text-white">
                                                            {log.data}
                                                        </th>
                                                        <th scope="col" className="px-6 py-2 w-1/6 ">
                                                            {log.idCombustivel}
                                                        </th>
                                                        <td scope="col" className="px-6 py-2 w-1/6">
                                                            {log.tipo}
                                                        </td>
                                                        <td scope="col" className="px-6 py-2 w-1/6">
                                                            {log.finalidade}
                                                        </td>
                                                        <td scope="col" className="px-6 py-2 w-1/6">
                                                            {log.quantidade} l
                                                        </td>
                                                        <td scope="col" className="px-6 py-2 w-1/6">
                                                            <button type="button" onClick={() => apagarDado(log.id)} className="hover:bg-red-800 text-xs  bg-transparent border border-red-700 uppercase text-white py-2 px-2 rounded-md flex justify-center"><MdOutlineClose className="mx-auto w-4 h-4" /></button>
                                                        </td>
                                                    </tr>
                                                )).slice(0, qntRegistros)}
                                                <tr className="odd:bg-gray-900 w-full flex flex-wrap justify-between odd:dark:bg-gray-900 even:bg-gray-800 even:dark:bg-gray-800 border-b border-gray-700 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-2 w-1/6 font-medium text-white whitespace-nowrap dark:text-white">
                                                        Total
                                                    </th>
                                                    <td className="px-6 py-2 w-1/6">
                                                    </td>
                                                    <td className="px-6 py-2 w-1/6">
                                                    </td>
                                                    <td className="px-6 py-2 w-1/6">
                                                    </td>
                                                    <td className="px-6 py-2 w-1/6">
                                                        {(logistica?.filter(log => log.idCombustivel === idComb && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                            return total + (+item.quantidade);
                                                        }, 0)) -
                                                            (logistica?.filter(log => log.idCombustivel === idComb && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                                                return total + (+item.quantidade);
                                                            }, 0)) + " l"}
                                                    </td>
                                                </tr>

                                            </div>
                                    
                                        }
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}