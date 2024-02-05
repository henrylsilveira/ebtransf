import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { MdOutlineClose, MdSend } from "react-icons/md";
import { Loader } from "./Loader/Loader";

export function EnviarDados({ enviarFunc, data, tipo }: {
    enviarFunc: (data: {
        data: {},
        tipo: string;
        id: string;
    }) => void, data: {}, tipo: string
}) {
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false)

    function enviaDadosButton() {
        setLoading(true)
        enviarFunc({
            data: {
                ...data
            }, tipo, id: token,
        })
        setLoading(false)
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <div className="w-full flex">
                    {loading ? <Loader /> :
                        <button type="button" className="hover:bg-blue-800 w-full items-center text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-2 rounded-md flex gap-2 justify-center"><p className="flex"><MdSend className="w-4 h-4" />Enviar</p></button>
                    }
                </div>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-green-700 m-0 text-2xl font-medium">
                        Enviar registros para o Banco de Dados
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>

                    <AlertDialog.Description className="text-white mt-4 mb-5 text-[15px] leading-normal">
                        Utilize o token recebido ao criar uma instalação para salvar os dados.
                    </AlertDialog.Description>
                    <div className="relative z-0 w-full group flex items-center">
                        <input type="text" name="token" onChange={(e) => setToken(e.target.value)} id="token" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="token" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token </label>
                    </div>
                    <div className="w-full flex justify-center mt-4 items-center">
                        <AlertDialog.Cancel className="w-full">
                            <button type="button" onClick={() => enviaDadosButton()} className="hover:bg-blue-800 items-center justify-center text-md w-full bg-transparent border border-blue-700 uppercase text-white py-2 px-2 rounded-md flex">Enviar</button>
                        </AlertDialog.Cancel>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}