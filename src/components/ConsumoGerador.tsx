
import { ConsumoGeradorProps } from "@/types/types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "./Loader/Loader"
import { saveAs } from 'file-saver';
import { VisualizarRegistro } from "./VisualizarRegistro";
import { MdOutlineClose } from "react-icons/md";
export function ConsumoGerador() {
    const [registrosCombustivel, setRegistrosCombustivel] = useState<ConsumoGeradorProps[]>([])
    const [qntRegistros, setQntRegistros] = useState(30)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        var registros = localStorage.getItem("controleRegistro")
        if (registros !== null) {
            setRegistrosCombustivel(JSON.parse(registros))
        }
    }, [registrosCombustivel])


    const [formData, setFormData] = useState<ConsumoGeradorProps>({
        data: "",
        gerador: "",
        horaInicio: "",
        horaTermino: "",
        consumo: 0,
        funcionamento: 0,
    });

    function exportRegistrosCombustivel() {
        setLoading(true);
        var fileName = `${new Date().toLocaleString() + "-" + "gerador"}.json`;

        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(registrosCombustivel)], {
            type: 'application/json'
        });

        // Save the file
        saveAs(fileToSave, fileName);
        setLoading(false);
    }
    async function importaRegistrosCombustivel(e: React.ChangeEvent<HTMLInputElement>) {
        setLoading(true);
        if (e.target.files !== null) {
            var reader = new FileReader();
            const files = e.target.files[0]
            reader.onload = logFile;
            reader.readAsText(files)
        }
        function logFile(e: any) {

            setRegistrosCombustivel(JSON.parse(e.target.result))
        }
        try {
            const registros = JSON.stringify([...registrosCombustivel])
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(localStorage.setItem("controleRegistro", registros));
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (formData.data == "" || formData.gerador == "" || formData.horaInicio == "" || formData.horaTermino == "" || formData.consumo == 0 || formData.funcionamento == 0) {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false);
        } else {
            try {
                const registros = JSON.stringify([...registrosCombustivel, formData])
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(localStorage.setItem("controleRegistro", registros));
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
    };

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex flex-1 items-center justify-center my-6 flex-col">
                    <h1 className="text-green-600 font-bold uppercase text-xl">Controle de Combustível</h1>
                    <p className="font-light text-white text-justify py-4">O Controle de Combustível é uma ferramenta criada para gerar um relatório do consumo e funcionamento de geradores, para auxiliar na gestão do combustível.</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="date" name="data" onChange={handleChange} id="data" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="data" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data</label>
                        </div>

                    </div>
                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="text" name="gerador" onChange={handleChange} id="gerador" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="gerador" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gerador</label>
                        </div>

                    </div>
                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="time" name="horaInicio" onChange={handleChange} id="horaInicio" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="horaInicio" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Inicio</label>
                        </div>
                    </div>
                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="time" name="horaTermino" onChange={handleChange} id="horaTermino" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="horaTermino" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Termino</label>

                        </div>

                    </div>
                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="number" name="consumo" onChange={handleChange} id="consumo" className="block [appearance:textfield] py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label htmlFor="consumo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Consumo Total</label>
                        </div>

                    </div>
                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="number" name="funcionamento" onChange={handleChange} id="funcionamento" className="block [appearance:textfield] py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label htmlFor="funcionamento" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Horas funcionando</label>
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
            <div className="flex justify-between mb-2 gap-2 border-t py-4 border-green-600">
                <div className="relative z-0 group flex items-center">
                    <input type="number" name="qntRegistros" value={qntRegistros} onChange={e => setQntRegistros(Number(e.target.value))} id="qntRegistros" className="block w-10 [appearance:textfield] py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="qntRegistros" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registros</label>
                </div>
                <div className="flex items-center">
                    {loading
                        ? <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                            <Loader />
                        </div>
                        : <div className="flex justify-center gap-4">

                            <button type="button" onClick={() => localStorage.clear()} className="hover:bg-red-800 items-center text-xs bg-transparent border border-red-700 uppercase text-white py-2 px-2 rounded-md flex"><MdOutlineClose className="w-4 h-4" />Apagar</button>
                            <button type="button" onClick={exportRegistrosCombustivel} className="hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button>
                            <label htmlFor="file" className="hover:bg-green-800 cursor-pointer bg-transparent border text-xs border-green-700 uppercase text-white py-2 px-6 rounded-md">
                                <input id="file" className="hidden" onChange={importaRegistrosCombustivel} type="file" />
                                Importar
                            </label>
                            <VisualizarRegistro />
                        </div>}

                </div>

                <div className="flex items-center">
                    <p className="text-white">Total registros: {registrosCombustivel.length}</p>
                </div>
            </div>
            <div className="p-2">
                <p className="text-red-600">Importante</p> 
                <p className="text-gray-500">Mantenha sempre seus dados salvos em um arquivo clicando em exportar para fazer o download pois todos os dados são armazenados no seu navegador localmente não tendo acesso em outros computadores. Caso queira importar um arquivo saiba que esse irá sobrescrever os que já existem. Caso queira visualizar outro arquivo clique em visualizar.</p>
                </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">


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
                        {registrosCombustivel.map((registro, index) => (
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
                        )).slice(0, qntRegistros)}
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
                                {registrosCombustivel.reduce((total, item) => {
                                    return total + (+item.consumo);
                                }, 0) + " litros"}
                            </td>
                            <td className="px-6 py-4">
                                {registrosCombustivel.reduce((total, item) => {
                                    return total + (+item.funcionamento);
                                }, 0) + " horas"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}