'use client'
import { FaleConoscoProps } from "@/types/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { BiMessageAltDetail } from 'react-icons/bi'
import { api } from "@/services/axios";
import { MdMessage, MdOutlineClose } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import { toast } from "react-toastify";
import { Loader } from "../Loader/Loader";
import Cookies from "js-cookie";
import { Feedback } from "./Feedback";

export default function FaleConosco() {
    const [formData, setFormData] = useState<FaleConoscoProps>({
        email: "",
        mensagem: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (formData.email == "" || formData.mensagem == "") {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false);
        } else {
            try {
                await api.post("/faleConosco", formData)
                toast.success("Enviado com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
                Cookies.set('faleConosco', 'true', { expires: 1 });
            } catch (error) {
                toast.error("Erro no envio da mensagem!", {
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
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <div className="flex items-center">
                    <MdMessage className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />
                </div>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-green-700 m-0 text-[17px] font-medium">
                        Fale Conosco!
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>

                    <AlertDialog.Description className="text-white mt-4 mb-5 text-[15px] leading-normal">
                        Ajude nosso site a crescer e a facilitar mais ainda a sua vida. Conte para nós uma calculadora ou ferramenta que você gostaria que tivesse na plataforma e que ajudaria mais ainda a desempenhar a sua função.
                    </AlertDialog.Description>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="relative z-0 mb-4  w-full group">
                                <input name="email" id="email" type="email" onChange={handleChange} className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                <label htmlFor="email" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                            <div className="relative z-0  w-full group">
                                <label htmlFor="mensagem" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deixe sua ideia</label>
                                <textarea name="mensagem" onChange={handleChange} className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            </div>
                            
                            {Cookies.get('faleConosco') == "true"
                                ? <div className="border-t flex justify-center border-green-700 mt-4 pt-4 text-red-700">
                                    <div className="flex items-center align-middle mr-4">
                                        <GoAlert className="w-12 h-12" />
                                    </div>

                                    <p>Você já enviou uma mensagem hoje! Espere 24h para mandar outra.</p>
                                </div>
                                : loading
                                    ? <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                                        <Loader />
                                    </div>
                                    : <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                                        <button type="submit" className="hover:bg-green-800 bg-transparent border border-green-700 uppercase text-white py-2 px-6 rounded-md">Enviar</button>
                                    </div>
                            }
                        </form>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>

    )
}