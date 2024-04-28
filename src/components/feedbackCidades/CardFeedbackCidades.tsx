'use client'
import { FeedbackCidadesProps } from "@/types/types";
import { formatarDataHora } from "@/utils/scripts";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useState } from "react";
import { Loader } from "../Loader/Loader";

export default function CardFeedbackCidades({
    id,
    estado,
    cidade,
    texto,
    saude,
    educacao,
    trabalho,
    seguranca,
    pnr,
    batalhao,
    custoVida,
    infraEstrutura,
    date
}: FeedbackCidadesProps) {
    const [loading, setLoading] = useState(false)

    return (
        <Link href={`/cidades/${estado}/${cidade}/${id}`} 
        // onClick={() => setLoading(true)} 
        className="border border-green-600 rounded-md p-6 relative hover:bg-gradient-to-tr from-gray-950 shadow-container to-gray-800 transition-all ease-in-out hover:border-0 hover:shadow-container">
            {loading ? <div className="flex justify-center items-center">
                <Loader loadingPage />
                </div> : 
            <>
                <div className="flex w-full justify-between ">
                    <div>
                        <h1 className="text-white uppercase text-3xl">{cidade} <Rating name="size-large" precision={0.5} value={(saude + educacao + trabalho + seguranca + infraEstrutura + pnr + batalhao + custoVida) / 8} size="small" readOnly /></h1>
                        <h2 className="text-gray-400">{estado}</h2>
                    </div>
                    <div className="absolute right-0 top-0 shadow-container bg-gradient-to-r from-green-700 to-green-900 rounded-bl-full pl-5 pb-5 pr-2 pt-2">
                        <p className="text-white uppercase text-3xl ">{((saude + educacao + trabalho + seguranca + infraEstrutura + pnr + batalhao + custoVida) / 8).toFixed(1)}</p>
                    </div>
                </div>
                {texto == "" || texto == " " ? "" :
                    <div>
                        <p className="text-gray-600 text-xs">"{texto?.slice(0, 80)}..."</p>
                    </div>}
                <div className="text-gray-700 flex text-xs mt-2 w-full">
                    <p className="flex ml-auto">{date}</p>
                </div>
            
            </>}
        </Link>
    )
}