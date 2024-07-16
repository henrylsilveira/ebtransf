'use client'
import { CardFatoObs } from "@/components/card/card";
import { useEffect, useState } from "react";
import { MdCopyAll } from "react-icons/md";
import { FatosObservados, Integrantes } from '../../../types/types';
import { PopoverFatosObs } from "../popoverFatosObs/PopoverFatosObs";
import { toast } from "react-toastify";

interface ParamsProps {
    data: {
        data: FatosObservados
    }
}

export default function RenderCardComponent({ data }: ParamsProps) {
    const [integrantesData, setIntegrantesData] = useState<Integrantes[]>([...data?.data.integrantes])
    const [url, setUrl] = useState("");

    useEffect(() => {
        setUrl(window.location.href);
    }, [])

    async function copyLink() {
        await navigator.clipboard.writeText(window.location.href)
        const myCopy = await navigator.clipboard.readText()
        const copyUrl = window.location.href
        if (copyUrl === String(myCopy)) {
            setUrl(copyUrl)
            toast.success("Link copiado para área de transferência!",{
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        }else {
            toast.error("Erro ao copiar o link para área de transferência!",{
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        }
    }
    return (
        <div className="gap-4">
            <div className="flex justify-center gap-4">
                <h1 className="text-green-600 font-bold uppercase text-3xl mb-6">{data.data?.nomeCurso}</h1>
                <PopoverFatosObs params={data?.data} integrantes={integrantesData} stateFunction={setIntegrantesData} />
            </div>
            <div className="shadow-shape w-full p-2 mb-8 rounded-lg">
                <p className="text-gray-500">Compartilhe o link para que outras pessoas tenham acesso.</p>
                <div className="flex justify-between items-center bg-gray-950 p-2 rounded-lg shadow-shape">
                    <p className="text-green-800">{url}</p>
                    <button onClick={copyLink} className="shadow-container px-4 py-2 hover:bg-green-800 bg-green-700 rounded-md text-white">
                    <MdCopyAll className="text-md" />
                    </button>
                </div>
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
        </div>
    )
}