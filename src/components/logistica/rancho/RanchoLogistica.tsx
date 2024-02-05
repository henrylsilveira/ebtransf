'use client'
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { nanoid } from "nanoid";
import { Dispatch, useState } from "react";
import { BsEye } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { Loader } from "../../Loader/Loader";
import { toast } from "react-toastify";
import { LogisticaCombustivelProps, LogisticaRanchoProps } from "@/types/types";
import saveAs from "file-saver";
import { removerObjetoPorID, retornaTimeStamp } from "@/utils/scripts";

export function RanchoLogistica({ logistica, idAlim, tipo, hookComb }: { logistica: LogisticaRanchoProps[], idAlim: string, tipo: string, hookComb: Function }) {
    // const [visualizarRegistrosCombustivel, setVisualizarRegistrosCombustivel] = useState<ConsumoGeradorProps[]>([])
    const [loading, setLoading] = useState(false);
    const [qntRegistros, setQntRegistros] = useState(30)

    const [formData, setFormData] = useState<LogisticaRanchoProps>({
        id: "",
        idAlimento: idAlim,
        tipo: "",
        finalidade: "",
        data: "",
        quantidade: 0,
        createdAt: "",
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
                    resolve(localStorage.setItem("logisticaEntradaSaidaRancho", registros));
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

    const handleSubmitRancho = async (event: React.FormEvent<HTMLFormElement>) => {
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
                hookComb([...logistica, formData])
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
            createdAt: retornaTimeStamp(),
            [event.target.name]: event.target.value,
        });
    };

    // function VisualizarRegistrosCombustivel(e: React.ChangeEvent<HTMLInputElement>) {

    //     if (e.target.files !== null) {
    //         var reader = new FileReader();
    //         const files = e.target.files[0]
    //         reader.onload = logFile;
    //         reader.readAsText(files)
    //     }
    //     function logFile(e: any) {
    //         console.log(JSON.parse(e.target.result))
    //         // setVisualizarRegistrosCombustivel(JSON.parse(e.target.result))
    //     }
    // }
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="hover:bg-cyan-800 bg-transparent border text-xs border-cyan-700 uppercase text-white py-2 px-6 rounded-md flex items-center">
                    <BsEye className="pr-1 h-4 w-4 text-white hover:text-cyan-600 transform transition-colors" />Registrar
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
                            <p>Código do Alimento: {idAlim}</p>
                        </AlertDialog.Description>
                        <form onSubmit={handleSubmitRancho} className="mb-4">
                            <div className="flex flex-1 items-center justify-center my-6 flex-col">
                                <h1 className="text-green-600 font-bold uppercase text-xl">Registrar entrada ou saída de alimento</h1>
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
                                        <select name="tipo" id="tipo" onChange={handleChange} className="leading-tight block py-2.5 px-0 w-full text-md text-white focus:bg-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                            <option></option>
                                            <option value={"entrada"}>Entrada</option>
                                            <option value={"saida"}>Saida</option>
                                        </select>
                                        <label htmlFor="tipo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo</label>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <input type="text" name="finalidade" onChange={handleChange} id="finalidade" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                        <label htmlFor="finalidade" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Finalidade</label>
                                    </div>
                                    <span className="text-xs text-gray-600">Ex: Ressuprimento, Almoço, janta</span>
                                </div>
                                <div>
                                    <div className="relative z-0 w-full group flex items-center">
                                        <input type="number" name="quantidade" onChange={handleChange} id="quantidade" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                        <label htmlFor="quantidade" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantidade</label>
                                        <span className="text-xs text-gray-600">Kg</span>
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
                            {/* <button type="button" onClick={exportEntradaSaidaRegistrosCombustivel} className="hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button> */}
                            {/* <div className="flex flex-1 justify-between pb-2 gap-4">
                            <label htmlFor="fileVisualizar" className="hover:bg-orange-800 cursor-pointer block bg-transparent border text-sm border-orange-700 uppercase text-white py-2 px-6 rounded-md">
                                <input id="fileVisualizar" className="hidden" onChange={VisualizarRegistrosCombustivel} type="file" />
                                Visualizar
                            </label>
                            <button type="button" onClick={() => setVisualizarRegistrosCombustivel([])} className="hover:bg-blue-800 bg-transparent border text-sm border-blue-700 uppercase text-white py-2 px-6 rounded-md">
                                Apagar
                            </button>
                        </div> */}
                            <div className="my-2 flex justify-center w-full">
                                <table className="text-sm text-left rtl:text-right w-full text-gray-500 dark:text-gray-400 ">
                                    <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
                                        <div className="w-full ">
                                            <tr className="w-full flex flex-wrap justify-between flex-row flex-1 items-center">
                                                <th scope="col" className="px-6 py-3 w-1/6">
                                                    Data
                                                </th>
                                                <th scope="col" className="px-6 py-3 w-1/6">
                                                    Código Alimento
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
                                        <div className="w-full overflow-y-scroll max-h-96">
                                            {logistica?.filter(log => log.idAlimento === idAlim).map((log, index) => (
                                                <tr key={index} className={`w-full flex flex-wrap justify-between odd:bg-gray-900 odd:dark:bg-gray-900 dark:hover:bg-green-700/30 even:bg-gray-800 even:dark:bg-gray-800 border-b border-gray-700 dark:border-b-gray-700 ${log.tipo === "entrada" ? 'dark:border-l-4 dark:border-l-green-500' : 'dark:border-l-4 dark:border-l-red-500'}`}>
                                                    <th scope="col" className="px-6 py-2 w-1/6 font-medium text-white whitespace-nowrap dark:text-white">
                                                        {log.data}
                                                    </th>
                                                    <th scope="col" className="px-6 py-2 w-1/6 ">
                                                        {log.idAlimento}
                                                    </th>
                                                    <td scope="col" className="px-6 py-2 w-1/6">
                                                        {log.tipo}
                                                    </td>
                                                    <td scope="col" className="px-6 py-2 w-1/6">
                                                        {log.finalidade}
                                                    </td>
                                                    <td scope="col" className="px-6 py-2 w-1/6">
                                                        {log.quantidade} kg
                                                    </td>
                                                    <td scope="col" className="px-6 py-2 w-1/6">
                                                        <button type="button" onClick={() => apagarDado(log.id)} className="hover:bg-red-800 text-xs  bg-transparent border border-red-700 uppercase text-white py-2 px-2 rounded-md flex justify-center"><MdOutlineClose className="mx-auto w-4 h-4" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="odd:bg-gray-900 w-full flex flex-wrap justify-between odd:dark:bg-gray-900 even:bg-gray-800 even:dark:bg-gray-800 border-b border-gray-700 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-2 w-1/5 font-medium text-white whitespace-nowrap dark:text-white">
                                                    Total
                                                </th>
                                                <td className="px-6 py-2 w-1/5">
                                                </td>
                                                <td className="px-6 py-2 w-1/5">
                                                </td>
                                                <td className="px-6 py-2 w-1/5">
                                                </td>
                                                <td className="px-6 py-2 w-1/5 text-white">
                                                    {(logistica?.filter(log => log.idAlimento === idAlim && log.tipo === "entrada").reduce((total: number, item: LogisticaRanchoProps) => {
                                                        return total + (+item.quantidade);
                                                    }, 0)) -
                                                        (logistica?.filter(log => log.idAlimento === idAlim && log.tipo === "saida").reduce((total: number, item: LogisticaRanchoProps) => {
                                                            return total + (+item.quantidade);
                                                        }, 0)) + " kg"}
                                                </td>
                                            </tr>

                                        </div>
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