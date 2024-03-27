'use client'
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { MdOutlineClose, MdOutlineContactSupport } from "react-icons/md";
import { FatosObservados, Integrantes } from '../../types/types';
import { api } from "@/services/axios";
import { useState } from "react";
import { toast } from "react-toastify";

export function PopoverFatosObs({ params }: { params: FatosObservados }) {
    const [formData, setFormData] = useState({
        id: "",
        nome: "",
        fatosObservados: []
    } as Integrantes);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.nome == "") {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });

        } else {
            try {
                console.log([...params.integrantes, formData])
                await api.put("/fatosObservados", { ...params, integrantes: [...params.integrantes, formData] })
                toast.success("Enviado com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });

            } catch (error) {
                toast.error("Erro no envio da mensagem!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            }

        }
    };

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            id: self?.crypto?.randomUUID(),
            [event.target.name]: event.target.value,
        });
    };
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="flex shadow-container align-middle items-center text-white bg-gradient-to-r from-green-900/30 to-green-900 hover:bg-green-600/80 border border-green-400 rounded-lg text-xs h-6 px-2">Adicionar</button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[50vw] max-w-[200px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-green-700 m-0 text-[17px] font-medium">
                        Adicionar integrante
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>


                    
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            <div className="relative z-0 w-full group">
                                <input type="text" defaultValue="" name="nome" onChange={handleChange} className="block py-2.5 [appearance:textfield] px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                <label className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome</label>
                            </div>


                            <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                                <button type="submit" className="hover:bg-green-800 bg-transparent border border-green-700 uppercase text-white py-2 px-6 rounded-md">Salvar</button>
                            </div>

                        </form>

                    
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>

    )
}