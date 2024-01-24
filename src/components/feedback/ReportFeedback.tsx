import { api } from "@/services/axios";
import { FeedbackProps } from "@/types/types";
import { SlDislike, SlLike } from "react-icons/sl";

export async function ReportFeedback() {
    const { data } = await api.get<FeedbackProps[]>("/feedback");
    const likes = data.filter( res => res.mensagem === 'like').length
    const dislikes = data.filter( res => res.mensagem === 'dislike').length

    return (
        <div className="flex shadow-container justify-between items-center border-gray-700 bg-gradient-to-r from-gray-800/40 to-blackA4 px-2 rounded-lg my-2 shadow-md">
            <div>
                <p className="text-white font-extralight pl-4">Obrigado!</p>
            </div>
            <div id="reportfeedback" className="w-52 h-12 items-center flex my-2 mr-4 shadow-container">
                <span className="items-center gap-2 shadow-container w-full flex justify-center py-2 text-white bg-gradient-to-r from-green-900/30 to-green-900 border border-green-400 rounded-l-lg"><SlLike />{likes}</span>
                <span className="items-center gap-2 shadow-container w-full flex justify-center py-2 text-white  bg-gradient-to-r from-red-900/30 to-red-900 border border-red-400 rounded-r-lg"><SlDislike />{dislikes}</span>
            </div>
        </div>
    )
}