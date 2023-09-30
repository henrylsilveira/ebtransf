import Link from "next/link";
import { BsCalculator, BsClock, BsDatabaseCheck } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
export function SideBar() {
    
    return (
        <nav className="fixed top-[40%] border border-l-0 border-green-500 bg-black py-4 bg-opacity-50 rounded-tr-lg rounded-br-lg">
            <ul>
                <li><Link className="text-sm justify-center items-center border-0 p-2 flex " href="/calculadora"><BsCalculator className="pr-1 h-7 w-7 text-2xl hover:text-green-600 transform transition-colors text-white" /></Link></li>
                <li><Link className="text-sm justify-center items-center border-0 p-2 flex " href="/tempoServico"><BsClock className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" /></Link></li>
                <li><Link className="text-sm justify-center items-center border-0 p-2 flex " href="/tabelas"><BsDatabaseCheck className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" /></Link></li>
                <li><Link className="text-sm justify-center items-center border-0 p-2 flex " href="/privacyPolicy"><MdOutlinePrivacyTip className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" /></Link></li>
                <li><Link className="text-sm justify-center items-center border-0 p-2 flex " href="/sobreNos"><RiTeamLine className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" /></Link></li>
            </ul>
        </nav>
    )
}

