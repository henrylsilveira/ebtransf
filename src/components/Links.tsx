'use client'
import { BsCalculator, BsClock, BsDatabaseCheck } from "react-icons/bs";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { Button } from "./Button";
import { Feedback } from "./feedback/Feedback";

export function Links() {
    return (
        <>
                {/* <Feedback /> */}

            <div className="mt-4 hover:text-green-600 border text-white border-green-600 rounded-lg ">
                <Button link="/calculadora" text="Calculadora" Icon={<BsCalculator className="pr-1 text-2xl" />} />
            </div>
            <div className="mt-4 hover:text-green-600 text-white border border-green-600 rounded-lg">
                <Button link="/calcContraCheque" text="Contracheque" Icon={<LiaMoneyCheckAltSolid className="pr-1 text-2xl " />} />
            </div>
            <div className="mt-4 hover:text-green-600 text-white border border-green-600 rounded-lg">
                <Button link="/tempoServico" text="Calculadora Tempo de Serviço" Icon={<BsClock className="pr-1 text-2xl" />} />
            </div>
            <div className="mt-4 hover:text-green-600 text-white border border-green-600 rounded-lg">
                <Button link="/tabelas" text="Tabela de dados" Icon={<BsDatabaseCheck className="pr-1 text-2xl" />} />
            </div>

        </>
    )
}