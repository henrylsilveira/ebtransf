'use client'
import { CombustivelProps, LogisticaApoioProps, LogisticaCombustivelProps, LogisticaRanchoProps, RanchoProps } from "@/types/types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "../../Loader/Loader"
import { saveAs } from 'file-saver';
import { MdOutlineClose } from "react-icons/md";
import { nanoid } from 'nanoid'
import { RanchoLogistica } from './RanchoLogistica';
import { ApagarButton } from "@/components/ApagarButton"
import { EnviarDados } from "@/components/EnviarDados"

export function Rancho({ enviar }: {
    enviar: (data: {
        data: {},
        tipo: string;
        id: string;
    }) => void
}) {
    const [registroRancho, setRegistroRancho] = useState<RanchoProps[]>([])
    const [registroEntradaSaidaRancho, setRegistroEntradaSaidaRancho] = useState<LogisticaRanchoProps[]>([])
    const [qntRegistros, setQntRegistros] = useState(30)
    const [loading, setLoading] = useState(false);
    const [efetivoTotal, setEfetivoTotal] = useState(0);

    useEffect(() => {
        var registros = localStorage.getItem("logisticaRancho")
        var registrosEntradaSaida = localStorage.getItem("logisticaEntradaSaidaRancho")
        if (registros !== null) {
            setRegistroRancho(JSON.parse(registros))
        }
        if (registrosEntradaSaida !== null) {
            setRegistroEntradaSaidaRancho(JSON.parse(registrosEntradaSaida))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("logisticaRancho", JSON.stringify(registroRancho))
    }, [registroRancho])
    useEffect(() => {
        localStorage.setItem("logisticaEntradaSaidaRancho", JSON.stringify(registroEntradaSaidaRancho))
    }, [registroEntradaSaidaRancho])



    const [formData, setFormData] = useState<RanchoProps>({
        id: "",
        quantidade: 0,
        valorEtapa: 0,
        tipo: "",
        total: 0,
    });

    function exportRegistrosCombustivel() {
        setLoading(true);
        var fileName = `${new Date().toLocaleString() + "-" + "DadosRancho"}.rancho`;
        var fileName2 = `${new Date().toLocaleString() + "-" + "DadosEntradaSaidaRancho"}.regRancho`;

        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(registroRancho)], {
            type: 'application/rancho'
        });
        var fileToSave2 = new Blob([JSON.stringify(registroEntradaSaidaRancho)], {
            type: 'application/regRancho'
        });

        // Save the file
        saveAs(fileToSave, fileName);
        saveAs(fileToSave2, fileName2);
        setLoading(false);
    }
    const apagarRegistros = () => {
        localStorage.clear()
        setRegistroRancho([])
        setRegistroEntradaSaidaRancho([])
    }

    function importaRegistrosEntradaSaidaRancho(e: React.ChangeEvent<HTMLInputElement>) {
        setLoading(true);
        if (e.target.files !== null) {
            var reader = new FileReader();
            const files = e.target.files[0]

            reader.onload = logFile;
            reader.readAsText(files)
        }
        function logFile(e: any) {
            setRegistroEntradaSaidaRancho(JSON.parse(e.target.result))
        }
        try {
            const registros = JSON.stringify([...registroEntradaSaidaRancho])
            setRegistroEntradaSaidaRancho(JSON.parse(registros))
            async () => await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(localStorage.setItem("logisticaEntradaSaidaRancho", registros));
                }, 300);
            })
            toast.success("Dados referente a entrada e saída de rancho importado com sucesso!", {
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

    function importaRegistrosCombustivel(e: React.ChangeEvent<HTMLInputElement>) {
        setLoading(true);

        if (e.target.files !== null) {
            var reader = new FileReader();
            const files = e.target.files[0]
            reader.onload = logFile;
            reader.readAsText(files)
        }
        function logFile(e: any) {
            setRegistroRancho(JSON.parse(e.target.result))
        }
        const registros = JSON.stringify(registroRancho)
        // setRegistroCombustivel(JSON.parse(registros))
        try {
            async () => await new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(localStorage.setItem("logisticaRancho", registros));
                }, 2000);
            })
            toast.success("Dados referente ao rancho importado com sucesso!", {
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
        if (formData.tipo == "" || formData.total == 0) {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false);
        } else {
            try {
                const registros = JSON.stringify([...registroRancho, formData])
                setRegistroRancho(JSON.parse(registros));
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(localStorage.setItem("logisticaRancho", registros));
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
            id: nanoid(4),
            [event.target.name]: event.target.value,
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex flex-1 items-center justify-center my-6 flex-col">
                    <h1 className="text-green-600 font-bold uppercase text-xl">Controle de Meios Logísticos - Rancho</h1>
                    <p className="font-light text-white text-justify py-4">O Controle de Combustível é uma ferramenta criada para gerar um relatório do consumo e funcionamento de geradores, para auxiliar na gestão do combustível.</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex flex-col">
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="text" name="tipo" onChange={handleChange} id="tipo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="tipo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo</label>
                        </div>
                        <span className="text-xs text-gray-600">Ex: Arroz, feijão</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="number" name="valorEtapa" onChange={handleChange} id="valorEtapa" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="valorEtapa" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor da Etapa</label>
                        </div>
                        <span className="text-xs text-gray-600">Valor em gramas</span>
                    </div>
                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="number" name="total" onChange={handleChange} id="total" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="total" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Capacidade Total</label>
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

                            <ApagarButton funcApagar={apagarRegistros} />
                            <button type="button" onClick={exportRegistrosCombustivel} className="hover:bg-blue-800 text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-6 rounded-md">Exportar</button>
                            <label htmlFor="file" className="hover:bg-green-800 cursor-pointer bg-transparent border text-xs border-green-700 uppercase text-white py-2 px-6 rounded-md">
                                <input id="file" accept=".comb" className="hidden" onChange={importaRegistrosCombustivel} type="file" />
                                Importar
                            </label>
                            <label htmlFor="fileRegistros" className="hover:bg-green-800 cursor-pointer bg-transparent border text-xs border-green-700 uppercase text-white py-2 px-6 rounded-md">
                                <input id="fileRegistros" accept=".regComb" className="hidden" onChange={importaRegistrosEntradaSaidaRancho} type="file" />
                                Importar Registros
                            </label>
                            <EnviarDados enviarFunc={enviar} data={{
                                efetivo: efetivoTotal,
                                tiposRancho: registroRancho,
                                registroEntradaSaida: registroEntradaSaidaRancho
                            }} tipo="rancho" />
                        </div>}
                </div>
                <div className="flex items-center">
                    <p className="text-white">Total registros: {registroRancho.length}</p>
                </div>
            </div>
            <div className="p-2">
                <p className="text-red-600">Importante</p>
                <p className="text-gray-500">Mantenha sempre seus dados salvos em um arquivo clicando em exportar para fazer o download pois todos os dados são armazenados no seu navegador localmente não tendo acesso em outros computadores. Caso queira importar um arquivo saiba que esse irá sobrescrever os que já existem. Caso queira visualizar outro arquivo clique em visualizar.</p>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-col my-2 px-8">
                    <div className="relative z-0 w-full group flex items-center">
                        <input type="number" name="efetivo" onChange={e => setEfetivoTotal(Number(e.target.value))} id="efetivo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="efetivo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Efetivo Total</label>
                    </div>
                    <span className="text-xs text-gray-600">Utilizado para calculo de etapa</span>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Código
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantidade
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Capacidade
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Valor Etapa
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dias Restantes
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {registroRancho.map((registro, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {registro.id}
                                </th>
                                <td className="px-6 py-4">
                                    {registro.tipo}
                                </td>
                                <td className="px-6 py-4">
                                    {(registroEntradaSaidaRancho?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                        return total + (+item.quantidade);
                                    }, 0)) -
                                        (registroEntradaSaidaRancho?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                            return total + (+item.quantidade);
                                        }, 0))} kg
                                </td>
                                <td className="px-6 py-4">
                                    {registro.total} kg
                                </td>
                                <td className="px-6 py-4">
                                    {registro.valorEtapa} g
                                </td>
                                <td className="px-6 py-4">
                                    {(Number((
                                        (registroEntradaSaidaRancho?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                            return total + (+item.quantidade);
                                        }, 0)) -
                                        (registroEntradaSaidaRancho?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                            return total + (+item.quantidade);
                                        }, 0)))) * 1000 / (registro.valorEtapa * efetivoTotal)).toFixed(0) + " Dias"}
                                </td>
                                <td className="py-4">
                                    <RanchoLogistica logistica={registroEntradaSaidaRancho} hookComb={setRegistroEntradaSaidaRancho} idComb={registro.id} tipo={registro.tipo} />
                                </td>
                            </tr>
                        )).slice(0, qntRegistros)}
                        {/* <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Total
                            </th>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">

                            </td>
                            <td className="px-6 py-4">
                                {registroCombustivel.reduce((total, item) => {
                                    return total + (+item.peso);
                                }, 0) + "kg"}
                            </td>
                            <td className="px-6 py-4">

                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}