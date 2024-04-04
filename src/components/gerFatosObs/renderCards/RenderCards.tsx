'use client'
import { CardFatoObs } from "@/components/card/card";
import { PopoverFatosObs } from "../popoverFatosObs/PopoverFatosObs";
import { Fato, Integrantes } from '../../../types/types';
import { useEffect, useState } from "react";
import { api } from "@/services/axios";

export default function RenderCardComponent({ data }: any) {
    const [integrantesData, setIntegrantesData] = useState<Integrantes[]>([...data?.data.integrantes])

    return (
        <>
            <div className="flex justify-center gap-4">
                <h1 className="text-green-600 font-bold uppercase text-3xl mb-6">{data.data?.nomeCurso}</h1>
                <PopoverFatosObs params={data?.data} stateFunction={setIntegrantesData}  />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {integrantesData?.map((integrante: { id: string; nome: string; fatosObservados: Fato[] }) => (
                    <CardFatoObs key={integrante.id} id={integrante.id} nome={integrante.nome} fatosObservados={integrante.fatosObservados} idGrupo={data.data?.id} integrantes={integrantesData} stateFunction={setIntegrantesData} />
                ))}
            </div>
        </>
    )
}