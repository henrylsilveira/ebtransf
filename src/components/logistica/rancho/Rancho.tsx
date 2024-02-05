'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CombustivelProps, LogisticaApoioProps, LogisticaCombustivelProps, LogisticaRanchoProps, RanchoProps } from "@/types/types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "../../Loader/Loader"
import { saveAs } from 'file-saver';
import { MdOutlineClose, MdOutlineKeyboardArrowDown, MdSend } from "react-icons/md";
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

    function exportRegistrosRancho() {
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
        localStorage.removeItem("logisticaRancho")
        localStorage.removeItem("logisticaEntradaSaidaRancho")
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

    function importaRegistrosRancho(e: React.ChangeEvent<HTMLInputElement>) {
        setLoading(true);
        console.log(e.target)
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
                    <p className="font-light text-white text-justify py-4">O Controle de Rancho é uma ferramenta criada para gerar um relatório do consumo e estoque, para auxiliar na gestão do rancho.</p>
                </div>
                <div className="grid sm:grid-cols-3 grid-flow-row gap-4 mb-4">
                    <div className="flex flex-col">
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="text" name="tipo" onChange={handleChange} id="tipo" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="tipo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo</label>
                        </div>
                        <span className="text-xs text-gray-600">Ex: Arroz, feijão</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="number" name="valorEtapa" onChange={handleChange} id="valorEtapa" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="valorEtapa" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor da Etapa</label>
                        </div>
                        <span className="text-xs text-gray-600">Valor em gramas</span>
                    </div>
                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="number" name="total" onChange={handleChange} id="total" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
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
            <div className="flex sm:flex-row flex-col sm:justify-between mb-2 gap-2 border-t py-4 border-green-600">
                <div className="flex sm:flex-row flex-col items-center mx-auto">
                    {loading
                        ? <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                            <Loader />
                        </div>
                        : <div className="flex sm:flex-row flex-col text-center justify-center gap-4">

                            
                            {efetivoTotal === 0 ?
                                <button type="button" disabled className="hover:bg-blue-800 cursor-not-allowed opacity-50 w-full items-center text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-2 rounded-md flex gap-2 justify-center">
                                    <p className="flex">
                                        <MdSend className="w-4 h-4" />Enviar
                                    </p>
                                </button> :
                                <EnviarDados enviarFunc={enviar} data={{
                                    efetivo: efetivoTotal,
                                    tiposRancho: registroRancho,
                                    registroEntradaSaida: registroEntradaSaidaRancho
                                }} tipo="rancho" />}
                                
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <button
                                        className="rounded-md flex px-5 items-center justify-center text-white bg-transparent cursor-pointer shadow-[0_2px_10px] shadow-blackA4 outline-none border-green-700 uppercase border border- focus:shadow-[0_0_0_2px] focus:shadow-black"
                                        aria-label="Customise options"
                                    >
                                        <p>Opções</p>
                                        <MdOutlineKeyboardArrowDown />
                                    </button>
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content 
                                        className="min-w-[220px] bg-gray-950 border border-green-700 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                        sideOffset={5}
                                    >
                                        
                                        <DropdownMenu.Item className="group text-[13px] leading-none text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-600 data-[highlighted]:text-violet1">
                                            <button type="button" onClick={exportRegistrosRancho} >Baixar dados</button>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item onSelect={event => event.preventDefault()}
                                            className="group text-[13px] leading-none text-white cursor-pointer rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-600 data-[highlighted]:text-violet1" 
                                        >
                                            <label htmlFor="file" >
                                                <input id="file" accept=".rancho" className="hidden " onChange={importaRegistrosRancho} type="file" />
                                                Importar tipos de alimento
                                            </label>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item onSelect={event => event.preventDefault()}
                                            className="group text-[13px] leading-none text-white cursor-pointer rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-600 data-[highlighted]:text-violet1"
                                        >
                                            <label htmlFor="fileRegistros" >
                                                <input id="fileRegistros" accept=".regRancho" className="hidden " onChange={importaRegistrosEntradaSaidaRancho} type="file" />
                                                Importar registros entrada e saída
                                            </label>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Separator className='bg-green-700 h-[1px]  m-[5px]' />
                                        <DropdownMenu.Item onSelect={event => event.preventDefault()} className="group text-[13px] leading-none text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-600 data-[highlighted]:text-violet1">
                                            <ApagarButton funcApagar={apagarRegistros} />
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Arrow className="fill-gray-950" />
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                            
                            
                        </div>}
                </div>
            </div>
            <div className="p-2">
                <p className="text-red-600">Importante</p>
                <p className="text-gray-500">Mantenha sempre seus dados salvos em um arquivo clicando em exportar para fazer o download pois todos os dados são armazenados no seu navegador localmente não tendo acesso em outros computadores. Caso queira importar um arquivo saiba que esse irá sobrescrever os que já existem.</p>
            </div>
            <div className="m-2 flex justify-between">
                <div className="relative z-0 group flex items-center">
                    <input type="number" name="qntRegistros" value={qntRegistros} onChange={e => setQntRegistros(Number(e.target.value))} id="qntRegistros" className="block w-10 [appearance:textfield] py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="qntRegistros" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registros</label>
                </div>
                <div className="flex items-center">
                    <p className="text-white">Total registros: {registroRancho.length}</p>
                </div>
            </div>
            <div className="flex flex-col my-2 px-8">
                <div className="relative z-0 w-full group flex items-center">
                    <input type="number" name="efetivo" onChange={e => setEfetivoTotal(Number(e.target.value))} id="efetivo" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="efetivo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Efetivo Total</label>
                </div>
                <span className="text-xs text-gray-600">Utilizado para cálculo de etapa</span>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm sm:text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className=" text-white uppercase bg-green-700 dark:bg-green-700 dark:text-white">
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
                            <tr key={index} className="odd:bg-gray-900 odd:dark:bg-gray-900 even:bg-gray-800 even:dark:bg-gray-800 border-b border-gray-700 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}