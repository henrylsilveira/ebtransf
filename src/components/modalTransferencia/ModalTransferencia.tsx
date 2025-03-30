'use client'
import { DadosTransferencia } from "@/types/types";
import { formataValor, retornaValorM3Transportado, retornaValorSoldo } from "@/utils/scripts";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { MdOutlineClose, MdPostAdd } from "react-icons/md";
import { cubagemVeiculo } from '../../utils/valores';
import { TbPlaneArrival, TbPlaneDeparture } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
export function ModalTransferencia({ transferencia }: { transferencia: DadosTransferencia }) {
    const year = new Date().getFullYear().toString();
      const [anoFilter, SetAnoFilter] = useState(year);
    const { pg,
        percHabilitacao: hab,
        locEspecial: locEsp,
        percMil: mil,
        percDisp: disp,
        distancia: dist,
        cubagemDistancia: cuba,
        pgCompensacaoOrganica: pgCo,
        compensacaoOrganica: compOrg,
        passagemAdultoValor,
        passagemAdultoQnt,
        passagemCriancaValor,
        passagemCriancaQnt,
        carro,
        moto,
        especial,
        comum,
        estadoOrigem,
        estadoDestino,
        cidadeOrigem,
        cidadeDestino } = transferencia;
    const [open, setOpen] = useState(false);
    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger asChild >
                <button className="flex shadow-container justify-center items-center px-4 text-white/80 bg-green-900/20 hover:bg-green-600/30 border border-green-400 rounded-lg text-2xl"><FaEye /></button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="sm-0 text-xl font-medium">
                        <div className="w-full flex justify-center flex-col mb-4">
                            <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Transferência</h1>
                        </div>
                        <div className="flex flex-col justify-between sm:flex-row">
                            <div className="flex flex-col gap-2 ">
                                <p className="flex gap-2 text-sm sm:text-2xl text-white"><TbPlaneDeparture className="text-green-800" />{cidadeOrigem} / {estadoOrigem}</p>
                                <p className="flex gap-2 text-sm sm:text-2xl text-white"><TbPlaneArrival className="text-red-800" />{cidadeDestino} / {estadoDestino} </p>
                            </div>
                            <div className="flex flex-col gap-2 ml-auto sm:ml-0">
                                <p className="flex gap-2 text-xl sm:text-5xl text-green-400">{formataValor(
                                    ((retornaValorSoldo(pg,anoFilter)! * (disp + locEsp + mil + hab) / 100) +
                                        retornaValorSoldo(pg,anoFilter)! +
                                        (retornaValorSoldo(pgCo,anoFilter)! * compOrg / 100)) * (especial ? 4 : comum ? 2 : 0) +
                                    (passagemAdultoValor * passagemAdultoQnt) +
                                    (passagemCriancaValor * passagemCriancaQnt) +
                                    (retornaValorM3Transportado(dist) * cuba) +
                                    (carro ? retornaValorM3Transportado(dist) * cubagemVeiculo['carro'] : 0) +
                                    (moto ? retornaValorM3Transportado(dist) * cubagemVeiculo['moto'] : 0)
                                )}</p>
                                <p className="flex gap-2 text-sm sm:text-2xl text-white ml-auto">{dist} KM</p>
                            </div>
                        </div>
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>
                    <div className="border border-green-600 rounded-md p-6 relative mt-4">
                        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold uppercase px-2 text-sm sm:text-lg">Valores</h1>
                        <div className="border border-green-600 rounded-md p-6 relative mt-4">
                            <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold uppercase px-2 text-sm sm:text-lg">Soldo Bruto</h1>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">Soldo</b><p className="pl-4 text-gray-600">{formataValor(retornaValorSoldo(pg,anoFilter)!)}</p>
                            </div>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">Adc Habilitação</b><p className="pl-4 text-gray-600">{formataValor(retornaValorSoldo(pg,anoFilter)! * hab / 100)}</p>
                            </div>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">Adc Militar</b><p className="pl-4 text-gray-600">{formataValor(retornaValorSoldo(pg,anoFilter)! * mil / 100)}</p>
                            </div>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">Adc Loc Esp</b><p className="pl-4 text-gray-600">{formataValor(retornaValorSoldo(pg,anoFilter)! * locEsp / 100)}</p>
                            </div>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">Adc Disponibilidade</b><p className="pl-4 text-gray-600">{formataValor(retornaValorSoldo(pg,anoFilter)! * disp / 100)}</p>
                            </div>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">Adc Compensação Orgânica</b><p className="pl-4 text-gray-600">{formataValor(retornaValorSoldo(pgCo,anoFilter)! * compOrg / 100)}</p>
                            </div>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">Valor Bruto</b><p className="pl-4 text-gray-600">{formataValor(retornaValorSoldo(pg,anoFilter)! * (disp + locEsp + mil + hab) / 100 + (retornaValorSoldo(pgCo,anoFilter)! * compOrg / 100) + retornaValorSoldo(pg,anoFilter)!)}</p>
                            </div>

                        </div>
                        <div className="border border-green-600 rounded-md p-6 relative mt-4">
                            <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold uppercase px-2 text-sm sm:text-lg">Ajuda de custo</h1>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">Valor Bruto {especial ? "x 4" : comum ? "x 2" : "x 0"}</b><p className="pl-4 text-gray-600">{formataValor((retornaValorSoldo(pg,anoFilter)! * (disp + locEsp + mil + hab) / 100 + retornaValorSoldo(pg,anoFilter)! + (retornaValorSoldo(pgCo,anoFilter)! * compOrg / 100)) * (especial ? 4 : comum ? 2 : 0))}</p>
                            </div>

                        </div>
                        <div className="border border-green-600 rounded-md p-6 relative mt-4">
                            <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold uppercase px-2 text-sm sm:text-lg">Passagem</h1>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">{`${formataValor(passagemAdultoValor)} X ${passagemAdultoQnt}`}</b><p className="pl-4 text-gray-600">{formataValor(passagemAdultoValor * passagemAdultoQnt)}</p>
                            </div>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">{`${formataValor(passagemCriancaValor)} X ${passagemCriancaQnt}`}</b><p className="pl-4 text-gray-600">{formataValor(passagemCriancaValor * passagemCriancaQnt)}</p>
                            </div>
                        </div>
                        <div className="border border-green-600 rounded-md p-6 relative mt-4">
                            <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold uppercase px-2 text-sm sm:text-lg">Bagagem</h1>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">{`${formataValor(retornaValorM3Transportado(dist))} X ${cuba}M³`}</b><p className="pl-4 text-gray-600">{formataValor(retornaValorM3Transportado(dist) * cuba)}</p>
                            </div>
                        </div>
                        <div className="border border-green-600 rounded-md p-6 relative mt-4">
                            <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold uppercase px-2 text-sm sm:text-lg">Veículo</h1>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">{`Automóvel: ${formataValor(retornaValorM3Transportado(dist))} X ${cubagemVeiculo['carro']}M³`}</b><p className="pl-4 text-gray-600">{carro ? formataValor(retornaValorM3Transportado(dist) * cubagemVeiculo['carro']) : formataValor(0)}</p>
                            </div>
                            <div className="flex flex-1 flex-col sm:flex-row">
                                <b className="text-gray-300">{`Moto: ${formataValor(retornaValorM3Transportado(dist))} X ${cubagemVeiculo['moto']}M³`}</b><p className="pl-4 text-gray-600">{moto ? formataValor(retornaValorM3Transportado(dist) * cubagemVeiculo['moto']) : formataValor(0)}</p>
                            </div>
                        </div>
                    </div>


                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>

    )
}