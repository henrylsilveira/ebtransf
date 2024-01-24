import Link from "next/link";
import { BsCalculator, BsClock, BsDatabaseCheck } from "react-icons/bs";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdOutlinePrivacyTip, MdOutlineRealEstateAgent } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import Suporte from "./feedback/SuportePoppover";
import { Button } from "./Button";
import FaleConosco from "./feedback/FaleConosco";

export function SideBar() {
    return (
        <nav className="fixed sm:w-11 md:w-11 lg:w-11 w-8 top-[25%] backdrop-blur-sm border border-l-0 border-green-500 bg-black py-4 bg-opacity-50 rounded-tr-lg rounded-br-lg z-50">
            <ul>
                <li>
                    <Button name="Botão para acessar a calculadora de transferência" link="/calculadora" Icon={<BsCalculator className="pr-1 h-7 w-7 text-2xl hover:text-green-600 transform transition-colors text-white" />} />
                </li>
                <li>
                    <Button name="Botão para acessar a calculadora de contracheque" link="/calcContraCheque" Icon={<LiaMoneyCheckAltSolid className="pr-1 h-7 w-7 text-2xl hover:text-green-600 transform transition-colors text-white" />} />
                </li>
                <li>
                    <Button name="Botão para acessar a calculadora de tempo de serviço" link="/tempoServico" Icon={<BsClock className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />
                </li>
                <li>
                    <Button name="Botão para acessar a página Logística" link="/logistica" Icon={<MdOutlineRealEstateAgent className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />
                </li>
                <li>
                    <Button name="Botão para acessar a tabela com os dados." link="/tabelas" Icon={<BsDatabaseCheck className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />

                </li>
                <li>
                    <Button name="Botão para acessar a página com a política de privacidade" link="/privacyPolicy" Icon={<MdOutlinePrivacyTip className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />
                </li>
                <li>
                    <Button name="Botão para acessar a página Sobre Nós" link="/sobreNos" Icon={<RiTeamLine className="pr-1 h-7 w-7 text-2xl text-white hover:text-green-600 transform transition-colors" />} />
                </li>
                <li>
                    <div className="text-sm justify-center items-center border-0 p-2 flex ">
                        <Suporte />
                    </div>
                </li>
                <li>
                    <div className="text-sm justify-center items-center border-0 p-2 flex">
                        <FaleConosco />
                    </div>
                </li>
            </ul>
        </nav>
    )
}

