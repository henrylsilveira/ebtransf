import { Suspense } from "react";
import { MdOutlinePersonSearch, MdOutlineRealEstateAgent } from "react-icons/md";
import { Loader } from "./Loader/Loader";
import { BsCalculator, BsClock, BsDatabaseCheck } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { GoTools } from "react-icons/go";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { TbClockSearch } from "react-icons/tb";
import DropdownButton from "./header/DropdownButton";

export default function MenuHome() {
    return (
        <div className="flex gap-4 flex-col lg:flex-row lg:gap-8">
            <div className="bg-gray-900 px-4 py-2 shadow-shape rounded-xl  flex items-center gap-2">
                <BsCalculator className="text-green-700" />
                <DropdownButton title="Calculadoras" linkText={[
                    {
                        text: "Transferência",
                        link: "/calculadora",
                        icon: <BsCalculator size={12} />,
                    },
                    {
                        text: "Contracheque",
                        link: "/calcContraCheque",
                        icon: <LiaMoneyCheckAltSolid size={14} />,
                    },
                    {
                        text: "Ajuda de Custo",
                        link: "/calcAjudaCusto",
                        icon: <LiaMoneyCheckAltSolid size={14} />,
                    },
                    {
                        text: "Tempo de Serviço",
                        link: "/tempoServico",
                        icon: <BsClock size={14} />,
                    }
                ]} />
            </div>
            <div className="bg-gray-900 px-4 py-2 shadow-shape rounded-xl flex  items-center gap-2">
                <GoTools className="text-green-700" />
                <DropdownButton title="Ferramentas" linkText={[
                    {
                        text: "Cidades",
                        link: "/cidades",
                        icon: <GiModernCity size={14} />,
                    },
                    {
                        text: "Fatos Observados",
                        link: "/gerFatosObs",
                        icon: <MdOutlinePersonSearch size={14} />,
                    },
                    {
                        text: "Logística",
                        link: "/logistica",
                        icon: <MdOutlineRealEstateAgent size={14} />,
                    },
                    {
                        text: "Base de Dados",
                        link: "/tabelas",
                        icon: <BsDatabaseCheck size={14} />,
                    },
                    {
                        text: "Minhas Transferências",
                        link: "/calculadora/minhassimulacoes",
                        icon: <TbClockSearch size={14} />,
                    },
                    {
                        text: "Análise de Transferências",
                        link: "/calculadora/simulacoes",
                        icon: <FaRegChartBar size={14} />,
                    }
                ]} />
            </div>
        </div>
    );
}