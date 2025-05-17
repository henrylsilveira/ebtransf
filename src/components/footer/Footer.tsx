'use client'
import { usePathname } from "next/navigation";
import { Logo } from "../Logo/Logo";
import LinkFooter from "./LinkFooter";

export default function Footer() {
    const pathname = usePathname()
    return (
        pathname !== "/" &&
        <div className="flex flex-1 flex-col shadow-container">
            <div className="py-2 flex sm:flex-row flex-col mx-auto sm:mx-0 justify-evenly gap-6 items-center"> 
                <div className="md:mt-4">
                    <Logo />
                </div>
                <div className="grid grid-cols-1 text-gray-500 text-sm">
                    <div className="mb-3">
                        <p className="text-white text-lg text-center mb-2">Mapa do site</p>
                        <div className="grid md:grid-cols-4 grid-cols-2 gap-1">
                            <LinkFooter text={"Calculadora"} link={"/calculadora"} />
                            <LinkFooter text={"Minhas transferências"} link={"/calculadora/minhassimulacoes"} />
                            <LinkFooter text={"Análise de transferências"} link={"/calculadora/simulacoes"} />
                            <LinkFooter text={"Fatos Observados"} link={"/gerFatosObs"} />
                            <LinkFooter text={"Contracheque"} link={"/calcContraCheque"} />
                            <LinkFooter text={"Tempo de serviço"} link={"/tempoServico"} />
                            <LinkFooter text={"Cidades"} link={"/cidades"} />
                            <LinkFooter text={"Logística"} link={"/logistica"} />
                            <LinkFooter text={"Base de Dados"} link={"/tabelas"} />
                            <LinkFooter text={"Política de privacidade"} link={"/privacyPolicy"} />
                            <LinkFooter text={"Sobre nós"} link={"/sobreNos"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 justify-center py-4 text-gray-400 shadow-container border-t border-green-700 mt-2">
                <p>2023 EBCalc © Todos os direitos reservados.</p>
            </div>
        </div>
    )
}