'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CombustivelProps, LogisticaApoioProps, LogisticaCombustivelProps } from "@/types/types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "../../Loader/Loader"
import { saveAs } from 'file-saver';
import { MdOutlineClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { nanoid } from 'nanoid'
import { LogisticaCombustivel } from "./LogisticaCombustivel";
import { ApagarButton } from "@/components/ApagarButton"
import { EnviarDados } from "@/components/EnviarDados"


export function Combustivel({ enviar }: {
    enviar: (data: {
        data: {},
        tipo: string;
        id: string;
    }) => void
}) {
    const [registroCombustivel, setRegistroCombustivel] = useState<CombustivelProps[]>([])
    const [registroEntradaSaidaCombustivel, setRegistroEntradaSaidaCombustivel] = useState<LogisticaCombustivelProps[]>([])
    const [qntRegistros, setQntRegistros] = useState(30)
    const [loading, setLoading] = useState(false);

    const newArray = registroCombustivel?.filter(registro => registroEntradaSaidaCombustivel?.filter(registroE =>
        registro.id === registroE.idCombustivel ? registro.logistica?.push(registroE) : null
    ))


    useEffect(() => {
        var registros = localStorage.getItem("logisticaCombustivel")
        var registrosEntradaSaida = localStorage.getItem("logisticaEntradaSaidaCombustivel")
        if (registros !== null) {
            setRegistroCombustivel(JSON.parse(registros))
        }
        if (registrosEntradaSaida !== null) {
            setRegistroEntradaSaidaCombustivel(JSON.parse(registrosEntradaSaida))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("logisticaCombustivel", JSON.stringify(registroCombustivel))
    }, [registroCombustivel])
    useEffect(() => {
        localStorage.setItem("logisticaEntradaSaidaCombustivel", JSON.stringify(registroEntradaSaidaCombustivel))
    }, [registroEntradaSaidaCombustivel])

    const [formData, setFormData] = useState<CombustivelProps>({
        id: "",
        quantidade: 0,
        tipo: "",
        total: 0,
    });

    function exportRegistrosCombustivel() {
        setLoading(true);
        var fileName = `${new Date().toLocaleString() + "-" + "DadosCombustiveis"}.comb`;
        var fileName2 = `${new Date().toLocaleString() + "-" + "DadosEntradaSaidaCombustivel"}.regComb`;

        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(registroCombustivel)], {
            type: 'application/comb'
        });
        var fileToSave2 = new Blob([JSON.stringify(registroEntradaSaidaCombustivel)], {
            type: 'application/regComb'
        });

        // Save the file
        saveAs(fileToSave, fileName);
        saveAs(fileToSave2, fileName2);
        setLoading(false);
    }
    const apagarRegistros = () => {
        localStorage.removeItem("logisticaCombustivel")
        localStorage.removeItem("logisticaEntradaSaidaCombustivel")
        setRegistroCombustivel([])
        setRegistroEntradaSaidaCombustivel([])
    }

    function importaRegistrosEntradaSaidaCombustivel(e: React.ChangeEvent<HTMLInputElement>) {
        setLoading(true);
        if (e.target.files !== null) {
            var reader = new FileReader();
            const files = e.target.files[0]
            reader.onload = logFile;
            reader.readAsText(files)
        }
        function logFile(e: any) {
            setRegistroEntradaSaidaCombustivel(JSON.parse(e.target.result))
        }
        try {
            const registros = JSON.stringify([...registroEntradaSaidaCombustivel])
            setRegistroEntradaSaidaCombustivel(JSON.parse(registros))
            async () => await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(localStorage.setItem("logisticaEntradaSaidaCombustivel", registros));
                }, 300);
            })
            toast.success("Dados referente a entrada e saída de combustíveis importado com sucesso!", {
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
            setRegistroCombustivel(JSON.parse(e.target.result))
        }
        const registros = JSON.stringify(registroCombustivel)
        setRegistroCombustivel(JSON.parse(registros))
        try {
            async () => await new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(localStorage.setItem("logisticaCombustivel", registros));
                }, 2000);
            })
            toast.success("Dados referente aos combustíveis importado com sucesso!", {
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
                const registros = JSON.stringify([...registroCombustivel, formData])
                setRegistroCombustivel(JSON.parse(registros));
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(localStorage.setItem("logisticaCombustivel", registros));
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
                    <h1 className="text-green-600 font-bold uppercase text-xl">Controle de Meios Logísticos - Combustível</h1>
                    <p className="font-light text-white text-justify py-4">O Controle de Combustível é uma ferramenta criada para gerar um relatório do consumo e funcionamento de geradores, para auxiliar na gestão do combustível.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 w-full">

                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="text" name="tipo" onChange={handleChange} id="tipo" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="tipo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo</label>
                        </div>
                        <span className="text-xs text-gray-600">Ex: Óleo Diesel, Gasolina</span>
                    </div>

                    <div>
                        <div className="relative z-0 w-full group flex items-center">
                            <input type="number" name="total" onChange={handleChange} id="total" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                            <label htmlFor="total" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Capacidade Total</label>
                        </div>
                        <span className="text-xs text-gray-600">Capacidade de armazenamento</span>
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
                            <EnviarDados enviarFunc={enviar} data={{
                                tiposCombustivel: registroCombustivel,
                                registroEntradaSaida: registroEntradaSaidaCombustivel
                            }} tipo="combustivel" />
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
                                            <button type="button" onClick={exportRegistrosCombustivel} >Baixar dados</button>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item onSelect={event => event.preventDefault()}
                                            className="group text-[13px] leading-none text-white cursor-pointer rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-600 data-[highlighted]:text-violet1"
                                        >
                                            <label htmlFor="file" >
                                                <input id="file" accept=".comb" className="hidden " onChange={importaRegistrosCombustivel} type="file" />
                                                <p className='cursor-pointer'>Importar combustíveis</p>
                                            </label>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item onSelect={event => event.preventDefault()}
                                            className="group text-[13px] leading-none text-white cursor-pointer rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-600 data-[highlighted]:text-violet1"

                                        >
                                            <label htmlFor="fileRegistros" >
                                                <input id="fileRegistros" accept=".regComb" className="hidden " onChange={importaRegistrosEntradaSaidaCombustivel} type="file" />
                                                <p className='cursor-pointer'>Importar registros entrada e saída</p>
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
            <div className="mx-2 my-2 flex justify-between">
                <div className="relative z-0 group flex items-center">
                    <input type="number" name="qntRegistros" value={qntRegistros} onChange={e => setQntRegistros(Number(e.target.value))} id="qntRegistros" className="block w-10 [appearance:textfield] py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="qntRegistros" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registros</label>
                </div>
                <div className="flex items-center">
                    <p className="text-white">Total registros: {registroCombustivel.length}</p>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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

                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {registroCombustivel.map((registro, index) => (
                            <tr key={index} className="odd:bg-gray-900 odd:dark:bg-gray-900 even:bg-gray-800 even:dark:bg-gray-800 border-b border-gray-700 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
                                    {registro.id}
                                </th>
                                <td className="px-6 py-4">
                                    {registro.tipo}
                                </td>
                                <td className="px-6 py-4">
                                    {(registroEntradaSaidaCombustivel?.filter(log => log.idCombustivel === registro.id && log.tipo === "entrada").reduce((total: number, item: LogisticaCombustivelProps) => {
                                        return total + (+item.quantidade);
                                    }, 0)) -
                                        (registroEntradaSaidaCombustivel?.filter(log => log.idCombustivel === registro.id && log.tipo === "saida").reduce((total: number, item: LogisticaCombustivelProps) => {
                                            return total + (+item.quantidade);
                                        }, 0))} l
                                </td>
                                <td className="px-6 py-4">
                                    {registro.total} l
                                </td>
                                <td className="py-4">
                                    <LogisticaCombustivel logistica={registroEntradaSaidaCombustivel} hookComb={setRegistroEntradaSaidaCombustivel} idComb={registro.id} tipo={registro.tipo} />
                                </td>
                            </tr>
                        )).slice(0, qntRegistros)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}