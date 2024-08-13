import { Fato } from '@/types/types';
import { getTimeRemainingForFiveMinutes, hasFiveMinutesPassed } from '@/utils/scripts';
import { useState, useEffect, Dispatch } from 'react';
import { Loader } from './Loader/Loader';
import { FaRegTrashCan } from 'react-icons/fa6';
export default function Timer({ fato, handleDelete }: { fato: Fato, handleDelete: (fato: Fato) => void }) {
    const [tempoRestante, setTempoRestante] = useState(getTimeRemainingForFiveMinutes(fato.createdAt));

    // Crie um efeito colateral que executa a cada segundo para diminuir o tempo restante
    useEffect(() => {
        // Se o tempo restante é zero, não faz nada
        if (tempoRestante >= 0 && !hasFiveMinutesPassed(fato.createdAt)) {
            return;
        }

        // Configure um intervalo para diminuir o tempo restante a cada segundo
        const interval = setInterval(() => {
            setTempoRestante(prevTempo => prevTempo - 1);
        }, 1000);

        // Limpa o intervalo quando o componente é desmontado ou o tempo restante é zero
        return () => clearInterval(interval);
    }, [tempoRestante]);

    // Formate o tempo restante em minutos e segundos
    const formatarTempo = (tempo: number) => {
        const minutos = Math.floor(tempo / 60);
        const segundos = tempo % 60;
        return `${minutos}:${segundos < 10 ? `0${segundos.toFixed(0)}` : segundos.toFixed(0)}`;
    };

    return (
        <div>
            {tempoRestante <= 0 ?
                null :
                <button onClick={() => handleDelete(fato)} className="hover:bg-red-600 px-2 py-1 flex justify-center bg-red-700/20 text-white shadow-container rounded-full items-center gap-1"><FaRegTrashCan />{formatarTempo(tempoRestante)}</button>
            }
        </div>
    );
}