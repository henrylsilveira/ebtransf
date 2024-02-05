import * as AlertDialog  from "@radix-ui/react-alert-dialog";
import { MdOutlineClose } from "react-icons/md";

export function ApagarButton({funcApagar}: {funcApagar: () => void}){
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <div className="w-full flex ">
                    <button type="button">Apagar dados</button>
                </div>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[180vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-green-700 m-0 text-2xl font-medium">
                        Apagar registros
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>

                    <AlertDialog.Description className="text-white mt-4 mb-5 text-[15px] leading-normal">
                        Você tem certeza que deseja apagar todos os dados salvos no navegador?
                    </AlertDialog.Description>
                    <div className="w-full flex justify-center items-center">
                        <AlertDialog.Cancel className="w-full">
                        <button type="button" onClick={funcApagar} className="hover:bg-red-800 items-center justify-center text-md w-full bg-transparent border border-red-700 uppercase text-white py-2 px-2 rounded-md flex"><MdOutlineClose className="w-5 h-5" />Sim</button>
                        </AlertDialog.Cancel>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}