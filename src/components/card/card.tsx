'use client'
import { api } from "@/services/axios";
import { FatosObservados, Integrantes } from "@/types/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { MdMessage, MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";

export function CardFatoObs({ id, nome, fatosObservados }: Integrantes, { id: idFatos, nomeCurso, integrantes }: FatosObservados ) {
    const [formData, setFormData] = useState({
        email: "",
        mensagem: ""
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.email == "" || formData.mensagem == "") {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        } else {
            try {
                await api.post("/faleConosco", formData)
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
            [event.target.name]: event.target.value,
        });
    };
    return (
        <div className="border border-green-600 rounded-md p-6 relative">
            <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-2xl uppercase px-2">{nome}</h1>
            <div className="flex flex-col gap-2">
                <AlertDialog.Root>
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
                                        <select name="fo" id="fo" className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                            <option value=""></option>
                                            <option value="positivo">Positivo</option>
                                            <option value="negativo">Negativo</option>
                                        </select>
                                        <label htmlFor="fo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">FO</label>
                                    </div>
                                    <div className="relative z-0  w-full group">
                                        <label htmlFor="fatoObservado" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descreva o fato</label>
                                        <textarea name="fatoObservado" onChange={handleChange} className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                    </div>


                                    <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                                        <button type="submit" className="hover:bg-green-800 bg-transparent border border-green-700 uppercase text-white py-2 px-6 rounded-md">Enviar</button>
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
                        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                            <AlertDialog.Title className="text-green-700 m-0 text-[17px] font-medium">
                                Fatos Observados do {nome}
                            </AlertDialog.Title>
                            <AlertDialog.Cancel>
                                <button className="absolute right-2 top-2 text-white">
                                    <MdOutlineClose />
                                </button>
                            </AlertDialog.Cancel>


                            <div className="flex flex-1 flex-col">
                                
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>

               
            </div>
        </div>
    )
}