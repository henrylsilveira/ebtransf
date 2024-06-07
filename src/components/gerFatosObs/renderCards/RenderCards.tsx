'use client'
import { CardFatoObs } from "@/components/card/card";
import { PopoverFatosObs } from "../popoverFatosObs/PopoverFatosObs";
import { Fato, FatosObservados, Integrantes } from '../../../types/types';
import { useEffect, useState } from "react";
import { api } from "@/services/axios";
import { toast } from "react-toastify";

interface ParamsProps {
    data: {
        data: FatosObservados
    }
}

export default function RenderCardComponent({ data }: ParamsProps) {
    const [integrantesData, setIntegrantesData] = useState<Integrantes[]>([...data?.data.integrantes])

    return (
        <>
            <div className="flex justify-center gap-4">
                <h1 className="text-green-600 font-bold uppercase text-3xl mb-6">{data.data?.nomeCurso}</h1>
                <PopoverFatosObs params={data?.data} integrantes={integrantesData} stateFunction={setIntegrantesData} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {integrantesData?.sort((x, y) => {
                let a = x.nome ? x.nome.toUpperCase() : x.fatosObservados.filter(fato => fato.observacao === "positivo").length,
                  b = y.nome ? y.nome.toUpperCase() : x.fatosObservados.filter(fato => fato.observacao === "positivo").length;
                return a == b ? 0 : a > b ? 1 : -1;
              }).map((integrante: Integrantes) => (
                    <CardFatoObs key={integrante.id} id={integrante.id} createdAt={integrante.createdAt} nome={integrante.nome} fatosObservados={integrante.fatosObservados} idGrupo={data.data?.id} integrantes={integrantesData} stateFunction={setIntegrantesData} />
                ))}
            </div>
        </>
    )
}