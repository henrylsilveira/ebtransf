"use client";
import { Logo } from "../Logo";
import { RiMenuAddFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import LinkHeader from "./LinkHeader";
import { BsCalculator, BsClock, BsDatabaseCheck } from "react-icons/bs";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { GiModernCity } from "react-icons/gi";
import {
  MdDoubleArrow,
  MdOutlinePersonSearch,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import DropdownButton from "./DropdownButton";
import { TbClockSearch } from "react-icons/tb";
import { FaRegChartBar } from "react-icons/fa";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSideMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex shadow-container mb-6">
      <div className="flex w-full justify-between items-center py-6 px-10">
        {/* START LOGO */}
        <div>
          <Logo />
        </div>
        {/* END LOGO */}

        {/* START MENU HAMBURGUER */}
        <div>
          <button onClick={openSideMenu} className="lg:hidden">
            {/* <TiThMenuOutline size={28} color="#14532d" /> */}
            <RiMenuAddFill size={28} color="#0f7839" />
          </button>
          <div
            className={`${
              isSidebarOpen ? "" : "hidden"
            } fixed top-0 -right-1 transform -translate-y-1 -translate-x-1 h-[100vh] z-10 w-auto max-w-[100vw] py-24 px-6 bg-[#192132]/95 shadow-xl transition ease-in-out duration-300`}
          >
            <button onClick={openSideMenu} className="absolute top-6 right-3">
              <IoClose
                className="text-gray-400 hover:text-green-800 transition ease-in-out duration-300"
                size={22}
              />
            </button>
            <div className="flex items-center gap-0.5 text-green-800">
              <span className="w-4">
                <MdDoubleArrow />
              </span>
              <h1 className="font-bold text-xl text-left text-green-800">
                Calculadora
              </h1>
            </div>
            <ul className="flex flex-col w-auto gap-4 mt-3 mb-6 text-gray-400">
              <LinkHeader
                link="/"
                text="Transferência"
                icon={<BsCalculator size={12} />}
              />
              <LinkHeader
                link="/"
                text="Contra-cheque"
                icon={<LiaMoneyCheckAltSolid size={14} />}
              />
              <LinkHeader
                link="/"
                text="Tempo de Serviço"
                icon={<BsClock size={14} />}
              />
            </ul>
            <div className="flex items-center gap-0.5 text-green-800 text-left">
              <span className="w-4">
                <MdDoubleArrow />
              </span>
              <h1 className="font-bold text-xl text-left text-green-800">
                Ferramentas
              </h1>
            </div>
            <ul className="flex flex-col w-auto gap-4 mt-3 mb-6 text-gray-400">
              <LinkHeader
                link="/"
                text="Cidades"
                icon={<GiModernCity size={14} />}
              />
              <LinkHeader
                link="/"
                text="Fatos Observados"
                icon={<MdOutlinePersonSearch size={14} />}
              />
              <LinkHeader
                link="/"
                text="Logística"
                icon={<MdOutlineRealEstateAgent size={14} />}
              />
              <LinkHeader
                link="/"
                text="Base de Dados"
                icon={<BsDatabaseCheck size={14} />}
              />
            </ul>
          </div>
        </div>
        {/* END MENU HAMBURGUER */}

        {/* START LINKS HEADER */}
        <div className="gap-4 justify-between items-center hidden lg:flex">
          <div className="flex justify-between gap-4">
            <DropdownButton title="Calculadoras" linkText={[
                {
                    text: "Transferência",
                    link: "/calculadora",
                    icon: <BsCalculator size={12} />,
                },
                {
                    text: "Contra-cheque",
                    link: "/calcContraCheque",
                    icon: <LiaMoneyCheckAltSolid size={14} />,
                },
                {
                    text: "Tempo Serviço",
                    link: "/tempoServico",
                    icon: <BsClock size={14} />,
                }
            ]}/>

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
                  text: "Minhas transferências",
                  link: "/calculadora/minhassimulacoes",
                  icon: <TbClockSearch size={14} />,
              },
              {
                text: "Análise de Transferências",
                link: "/calculadora/simulacoes",
                icon: <FaRegChartBar size={14}/>,
            }
            ]}/>
          </div>
        </div>
        {/* END LINKS HEADER */}
      </div>
    </div>
  );
}
