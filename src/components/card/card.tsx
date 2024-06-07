'use client'
import { api } from "@/services/axios";
import { Fato, Integrantes } from "@/types/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState, Dispatch, SetStateAction } from 'react';
import { MdOutlineClose } from "react-icons/md";
import { SlLike, SlDislike } from "react-icons/sl";
import { toast } from "react-toastify";
import { convertDate, formatarDataHora, generateNowISOTime, hasFiveMinutesPassed } from '../../utils/scripts';
import { Loader } from "../Loader/Loader";
import { FaRegTrashCan } from "react-icons/fa6";
import { FatosObservados } from '../../types/types';
import Timer from "../Timer";
import TimerIntegrantes from "../TimerIntegrante";
interface CardProps extends Integrantes {
    stateFunction: Dispatch<React.SetStateAction<Integrantes[]>>
    integrantes: Integrantes[]
}

export function CardFatoObs({ id, nome, fatosObservados, idGrupo, stateFunction, createdAt, integrantes }: CardProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id,
        tokenFato: "",
        observacao: "",
        descricao: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.observacao == "" || formData.descricao == "") {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        } else {
            try {
                setLoading(true)
                await api.put(`/fatosObservados/${idGrupo}`, formData)
                toast.success("Enviado com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
                if (integrantes.length !== 0 && formData.tokenFato) {
                    const integrantesData = integrantes.filter((integrante) => integrante.id === id ? integrante.fatosObservados.push({ ...formData, createdAt: generateNowISOTime() } as Fato) : integrante)
                    stateFunction(integrantesData)
                    setOpen(false)
                }
                setLoading(false)
            } catch (error) {
                toast.error("Erro no envio da mensagem!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            }
        }
    };

    async function handleDelete(fato: Fato) {
        try {
            setLoading(true)
            
            await api.put(`/fatosObservados/${idGrupo}`, { ...fato, deleteFo: true, integranteId: id })
            toast.success("Fato observado deletado com sucesso!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            if (integrantes.length !== 0) {
                const integrantesData = integrantes.map(integrante =>
                    integrante.id === id ? { ...integrante, FatosObservados: integrante?.fatosObservados.splice(integrante?.fatosObservados.findIndex(fatoI => fatoI.id === fato.id), 1) } : integrante) as Integrantes[]

                stateFunction(integrantesData)
                setOpen(false)
            }
            setLoading(false)
        } catch (error) {
            toast.error("Erro no envio da mensagem!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        }
    };

    async function handleDeleteIntegrante({ id, nome}: Integrantes) {
        try {
            setLoading(true)
            
            await api.put(`/fatosObservados/${idGrupo}`, { deleteIntegrante: true, integranteId: id })
            toast.success("Integrante deletado com sucesso!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            if (integrantes.length !== 0) {
                const integrantesData = integrantes.filter(integrante =>
                    integrante.id !== id)

                stateFunction(integrantesData)
                setOpen(false)
            }
            setLoading(false)
        } catch (error) {
            toast.error("Erro no envio da mensagem!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        }
    };

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            tokenFato: self.crypto.randomUUID(),
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="border border-green-600 rounded-md p-6 relative">
            <h1 className="flex -top-4 absolute text-green-600 bg-gray-900 font-bold text-2xl uppercase px-2 gap-2 items-center">{nome}
                <TimerIntegrantes integrante={{id, createdAt} as Integrantes} handleDeleteIntegrante={handleDeleteIntegrante} />
            </h1>
                                              
            <div className="absolute flex -top-3 right-4  bg-gray-900 font-bold text-md uppercase px-2 gap-2">
                <span className="shadow-container px-2 rounded-full text-green-600 bg-green-700/10">{fatosObservados?.filter(fato => fato.observacao === "positivo").length}</span>
                <span className="shadow-container px-2 rounded-full text-red-600 bg-red-700/10">{fatosObservados?.filter(fato => fato.observacao === "negativo").length}</span>
            </div>
            <div className="flex flex-col gap-2">
                <AlertDialog.Root open={open} onOpenChange={setOpen}>
                    <AlertDialog.Trigger asChild>
                        <button className="shadow-container w-full flex justify-center py-2 text-white bg-gradient-to-r from-green-900/30 to-green-900 hover:bg-green-600/80 border border-green-400 rounded-lg">Lançar Fato</button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                            <AlertDialog.Title className="text-green-700 m-0 text-[17px] font-medium">
                                Fato Observado do {nome}
                            </AlertDialog.Title>
                            <AlertDialog.Cancel>
                                <button className="absolute right-2 top-2 text-white">
                                    <MdOutlineClose />
                                </button>
                            </AlertDialog.Cancel>


                            <div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="relative z-0 w-full group">
                                        <select name="observacao" id="observacao" onChange={handleChange} className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                            <option value=""></option>
                                            <option value="positivo">Positivo</option>
                                            <option value="negativo">Negativo</option>
                                        </select>
                                        <label htmlFor="observacao" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">FO</label>
                                    </div>
                                    <div className="relative z-0  w-full group">
                                        <label htmlFor="descricao" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descreva o fato</label>
                                        <textarea name="descricao" onChange={handleChange} className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                    </div>


                                    <div className="border-t flex justify-center border-green-700 mt-4 pt-4">

                                        {loading ?
                                            <button disabled className="bg-transparent border w-24 justify-center flex border-green-700 uppercase text-white py-2 px-6 rounded-md"><Loader /></button>
                                            : <button type="submit" className="hover:bg-green-800 w-24 flex justify-center bg-transparent border border-green-700 uppercase text-white py-2 px-6 rounded-md">Enviar</button>
                                        }
                                    </div>

                                </form>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
                <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                        <button className="shadow-container w-full flex justify-center py-2 text-white  bg-gradient-to-r from-blue-900/30 to-blue-900 hover:bg-blue-600/80 border border-blue-400 rounded-lg">Relatório</button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-auto">
                            <AlertDialog.Title className="text-green-700 m-0 text-2xl font-medium">
                                Fatos Observados do {nome}
                            </AlertDialog.Title>
                            <AlertDialog.Cancel>
                                <button className="absolute right-2 top-2 text-white">
                                    <MdOutlineClose />
                                </button>
                            </AlertDialog.Cancel>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                                <p className="text-green-700 bg-gray-800 px-4 rounded-xl whitespace-nowrap overflow-hidden">Positivos: {fatosObservados?.filter(fato => fato.observacao === "positivo").length}</p>
                                <p className="text-red-700 bg-gray-800 px-4 rounded-xl whitespace-nowrap overflow-hidden">Negativos: {fatosObservados?.filter(fato => fato.observacao === "negativo").length}</p>
                            </div>
                            <div>
                                <p className="text-white bg-gray-800 px-4 mb-2 rounded-xl whitespace-nowrap overflow-hidden">Desempenho: {((fatosObservados?.filter(fato => fato.observacao === "positivo").length / fatosObservados?.length) * 100).toFixed(2)}%</p>
                            </div>
                            {fatosObservados?.map(fato => (
                                <div key={fato.id} className={`flex relative flex-1 shadow-container gap-2 mb-2 items-center ${fato.observacao === "positivo" ? "border-r-4 border-green-700" : "border-r-4 border-red-700"}`}>
                                    <div className="absolute right-2 top-2">
                                        {loading ?
                                            null :
                                            <Timer fato={fato} handleDelete={handleDelete} />}
                                    </div>
                                    {fato.observacao === "positivo" ?
                                        <div className="bg-green-700 rounded-full m-2 p-2">
                                            <SlLike className="text-white" />
                                        </div>
                                        :
                                        <div className="bg-red-700 rounded-full m-2 p-2">
                                            <SlDislike />
                                        </div>}
                                    <div >
                                        <p className="text-white">{fato.descricao}</p>
                                        <p className="text-gray-600">{formatarDataHora(fato.createdAt)}</p>


                                    </div>
                                </div>
                            ))}

                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>


            </div>
        </div>
    )
}