
import { BsClipboardData } from "react-icons/bs";

export function NotData({textoComponent}: {textoComponent: string}){
    return (
        <div className="flex text-center justify-center bg-red-950 mx-4 my-4 p-4 rounded border border-red-900 text-white items-center">
            <BsClipboardData className="text-red-800 mx-4" />{textoComponent}
        </div>
    )
    
}