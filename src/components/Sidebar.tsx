import Link from "next/link";
import { BsCalculator, BsClock, BsDatabaseCheck } from "react-icons/bs";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import Suporte from "./SuportePoppover";
import { Button } from "./Button";

export function SideBar() {
    return (
        <nav className="fixed w-11 top-[25%] backdrop-blur-sm border border-l-0 border-green-500 bg-black py-4 bg-opacity-50 rounded-tr-lg rounded-br-lg z-50">
            <ul>
                <li>
                    <Button link="/calculadora" Icon={<BsCalculator className="pr-1 h-7 w-7 text-2xl hover:text-green-600 transform transition-colors text-white" />} />
                </li>
                <li>
                    <Button link="/calcContraCheque" Icon={<LiaMoneyCheckAltSolid className="pr-1 h-7 w-7 text-2xl hover:text-green-600 transform transition-colors text-white" />} />
                </li>
                <li>
                    <Button link="/tempoServico" Icon={<BsClock className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />
                </li>
                <li>
                    <Button link="/tabelas" Icon={<BsDatabaseCheck className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />

                </li>
                <li>
                    <Button link="/privacyPolicy" Icon={<MdOutlinePrivacyTip className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />
                </li>
                <li>
                    <Button link="/sobreNos" Icon={<RiTeamLine className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />
                </li>
                <li>
                    <div className="text-sm justify-center items-center border-0 p-2 flex ">
                        <Suporte />
                    </div>
                </li>
            </ul>
        </nav>
    )
}

