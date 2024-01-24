'use client'

import Cookies from "js-cookie";
import { SlDislike, SlLike } from "react-icons/sl";
import { toast } from "react-toastify";
import { api } from "@/services/axios";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { ReportFeedback } from "./ReportFeedback";

export function Feedback() {
    
    const [loading, setLoading] = useState(false)
    const [cookie, setCookie] = useState(true)

    useEffect(() => {
        const getCookie = Cookies.get('feedback') ? true : false
        setCookie(getCookie)
    }, [cookie])
    

    async function handleSubmitFeedback(vote: "like" | "dislike") {
        try {
            setLoading(true)
            await api.post("/feedback", { mensagem: vote })
            toast.success(`Seu ${vote} foi registrado com sucesso!`, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            Cookies.set('feedback', 'true', { expires: 7 });
            const feedback = document.getElementById("feedback");
            if (feedback !== null) {
                feedback.style.display = "none";
            }
            setCookie(true)
        } catch (error) {
            toast.error("Erro no registro do seu feedback.", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        }
        setLoading(false);
    }
    return (
        <Suspense fallback={<Loader />}>
            {cookie ? <ReportFeedback /> : (
                <div className="flex shadow-container justify-between items-center border-gray-700 bg-gradient-to-r from-gray-800/40 to-blackA4 px-2 rounded-lg my-2 shadow-md">
                    <div>
                        <p className="text-white font-extralight pl-4">Gostou da plataforma?</p>
                    </div>
                   
                    {loading ? <div className="w-52 h-12 flex items-center pr-4 my-2 rounded-lg py-3 justify-center border border-gray-700 bg-transparent">
                        <Loader />
                    </div> :
                        <div id="feedback" className="w-52 h-12 items-center flex my-2 mr-4 shadow-container">
                            <button onClick={() => handleSubmitFeedback("like")} className="shadow-container w-full flex justify-center py-2 text-white bg-gradient-to-r from-green-900/30 to-green-900 hover:bg-green-600/80 border border-green-400 rounded-l-lg"><SlLike /></button>
                            <button onClick={() => handleSubmitFeedback("dislike")} className="shadow-container w-full flex justify-center py-2 text-white  bg-gradient-to-r from-red-900/30 to-red-900 hover:bg-red-600/80 border border-red-400 rounded-r-lg"><SlDislike /></button>
                        </div>
                    }
                </div>
            )}
        </Suspense>

    )
}