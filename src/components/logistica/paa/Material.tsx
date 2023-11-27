import { MaterialProps } from "@/types/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { Loader } from "../../Loader/Loader";
import { toast } from "react-toastify";

export function Material({ materiais, id, hookMat }: { materiais: MaterialProps[], id: string, hookMat: Function }) {
    // const [visualizarRegistrosMateriais, setVisualizarRegistrosCombustivel] = useState<ConsumoGeradorProps[]>([])
    const [loading, setLoading] = useState(false);
    const [qntRegistros, setQntRegistros] = useState(30)

    const [formData, setFormData] = useState<MaterialProps>({
        nome: "",
        codigoLogistica: id,
        id: "",
        destinatario: "",
        peso: 0,
    });

    const handleSubmitMaterial = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (formData.nome == "" || formData.destinatario == "" || formData.peso == 0) {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false);
        } else {
            try {
                const registros = JSON.stringify([...materiais, formData])
                hookMat([...materiais, formData])
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(localStorage.setItem("logisticaApoioMaterial", registros));
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
            | React.ChangeEvent<HTMLTextAreaElement>
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
                    <BsEye className="pr-1 h-5 w-5 text-2xl text-white hover:text-cyan-600 transform transition-colors" />Visualizar
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[100vh] w-[180vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-green-700 m-0 text-2xl font-medium">
                        Registro de Materiais da Aeronave
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>

                    <AlertDialog.Description className="text-white mt-4 mb-5 text-[15px] leading-normal">
                        Codigo da aeronave: {id}
                    </AlertDialog.Description>
                    <form onSubmit={handleSubmitMaterial} className="mb-4">
                        <div className="flex flex-1 items-center justify-center my-6 flex-col">
                            <h1 className="text-green-600 font-bold uppercase text-xl">Registrar entrada de material</h1>

                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <div className="relative z-0 w-full group flex items-center">
                                    <input type="text" name="nome" onChange={handleChange} id="nome" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="nome" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative z-0 w-full group flex items-center">
                                    <input type="text" name="destinatario" onChange={handleChange} id="destinatario" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="destinatario" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Destinatário</label>
                                </div>
                            </div>
                            <div>
                                <div className="relative z-0 w-full group flex items-center">
                                    <input type="number" name="peso" onChange={handleChange} id="peso" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="peso" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Peso</label>
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
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs sticky text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
                                    <div className="w-full">
                                        <tr className="w-full flex flex-wrap justify-between flex-row flex-1 items-center">
                                            <th scope="col" className="px-6 py-3 w-1/5">
                                                Id Item
                                            </th>
                                            <th scope="col" className="px-6 py-3 w-1/5">
                                                Código Aeronave
                                            </th>
                                            <th scope="col" className="px-6 py-3 w-1/5">
                                                Nome do Material
                                            </th>
                                            <th scope="col" className="px-6 py-3 w-1/5">
                                                Destinatário
                                            </th>
                                            <th scope="col" className="px-6 py-3 w-1/5">
                                                Peso
                                            </th>
                                            <th scope="col" className="px-6 py-3 w-1/5">

                                            </th>
                                        </tr>
                                    </div>
                                </thead>
                                <tbody >
                                    <div className="w-full overflow-y-scroll max-h-96">
                                        {materiais?.filter(material => material.codigoLogistica === id).map((material, index) => (
                                            <tr key={index} className="w-full flex flex-wrap justify-between odd:bg-white odd:dark:bg-gray-900 dark:hover:bg-green-700/30 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <th scope="col" className="px-6 py-1 w-1/5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {material.id}
                                                </th>
                                                <td scope="col" className="px-6 py-1 w-1/5">
                                                    {id}
                                                </td>
                                                <td scope="col" className="px-6 py-1 w-1/5">
                                                    {material.nome}
                                                </td>
                                                <td scope="col" className="px-6 py-1 w-1/5">
                                                    {material.destinatario}
                                                </td>
                                                <td scope="col" className="px-6 py-1 w-1/5">
                                                    {material.peso} Kg
                                                </td>
                                                <td scope="col" className="px-6 py-1 w-1/5">

                                                </td>
                                            </tr>
                                        ))}

                                    </div>

                                    <tr className="odd:bg-white w-full flex flex-wrap justify-between odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-2 w-1/5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Total
                                        </th>
                                        <td className="px-6 w-1/5">
                                        </td>
                                        <td className="px-6 w-1/5">
                                        </td>
                                        <td className="px-6 w-1/5">
                                        </td>
                                        <td className="px-6 w-1/5">
                                            {materiais?.filter(material => material.codigoLogistica === id).reduce((total: number, item: MaterialProps) => {
                                                return total + (+item.peso);
                                            }, 0) + "kg"}
                                        </td>
                                        <td className="px-6 w-1/5">
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