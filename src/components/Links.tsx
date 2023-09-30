import Link from "next/link";
import { BsCalculator, BsClock, BsDatabaseCheck } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";

export function Links() {
    return (
        <>
            <div className="mt-4 hover:text-green-600 text-white ">
                <Link className="text-sm border justify-center items-center border-green-600 rounded-lg p-2 flex " href="/calculadora"><BsCalculator className="pr-1 text-2xl" />Calculadora</Link>
            </div>
            <div className="mt-4 hover:text-green-600 text-white">
                <Link className="text-sm border justify-center items-center border-green-600 rounded-lg p-2 flex " href="/tempoServico"><BsClock className="pr-1 text-2xl" />Calculadora Tempo de Serviço</Link>
            </div>
            <div className="mt-4 hover:text-green-600 text-white">
                <Link className="text-sm border justify-center items-center border-green-600 rounded-lg p-2 flex " href="/tabelas"><BsDatabaseCheck className="pr-1 text-2xl" />Tabela de dados</Link>
            </div>
            <div className="mt-4 hover:text-green-600 text-white">
                <Link className="text-sm border justify-center items-center border-green-600 rounded-lg p-2 flex " href="/privacyPolicy"><MdOutlinePrivacyTip className="pr-1 text-2xl" />Política de Privacidade</Link>
            </div>
        </>
    )
}