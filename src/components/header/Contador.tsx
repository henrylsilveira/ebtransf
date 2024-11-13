"use client";

import { countdown } from "@/utils/scripts";
import { useEffect, useState } from "react";

const Contador = () => {
  const [contador, setContador] = useState("");

  // Converte a data alvo (formato dd/mm/aaaa) em um timestamp
  const [day, month, year] = contador.split("/").map(Number);
  //   console.log([day, month, year]);
  const targetDate = new Date(year, month - 1, day).getTime();

  // Estado para o tempo restante em segundos
  const [tempoRestante, setTempoRestante] = useState(
    Math.floor((targetDate - new Date().getTime()) / 1000)
  );
  useEffect(() => {
    const cookieContador = JSON.parse(localStorage.getItem("contadorReserva")!);
    setContador(cookieContador.data);
  }, [contador]);

  function refreshClock() {
    const cookieContador = JSON.parse(localStorage.getItem("contadorReserva")!);
    setTempoRestante(Math.floor((targetDate - new Date().getTime()) / 1000));
    setContador(cookieContador.data);
  }

  useEffect(() => {
    // Verifica se o tempo já chegou a zero
    if (tempoRestante <= 0) {
      setTempoRestante(0);
      return;
    }

    // Configura um intervalo que decrementa o tempo restante a cada segundo
    const interval = setInterval(() => {
      setTempoRestante((prevTempo) => {
        if (prevTempo <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTempo - 1;
      });
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [tempoRestante]);

  // Função para formatar o tempo restante em dias, horas, minutos e segundos
  const formatarTempo = (tempo: any) => {
    const anos = Math.floor(tempo / (60 * 60 * 24 * 365));
    const meses = Math.floor(
      (tempo % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30)
    );
    const dias = Math.floor((tempo % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
    const horas = Math.floor((tempo % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((tempo % (60 * 60)) / 60);
    const segundos = tempo % 60;
    return `${anos}a ${meses}m ${dias}d ${horas}h ${minutos}m ${
      segundos < 10 ? `0${segundos}` : segundos
    }s`;
  };

  return (
    <div className="text-white">
      {tempoRestante > 0
        ? `Tempo restante: ${formatarTempo(tempoRestante)}`
        : "Erro!"}
      <button onClick={() => refreshClock()}>Refresh</button>
    </div>
  );
};

export default Contador;

// export default function Contador() {
//     const [contador, setContador] = useState("")
//     const [timer, setTimer] = useState("")

//     useEffect(() => {
//         setContador(localStorage.getItem("contadorReserva")!)
//         console.log(contador)
//     })

//     useEffect(() => {
//         setTimer(countdown(contador))
//     }, [timer])

//     return (
//         contador &&
//         <div className="absolute top-0 right-0">
//             <h1>Contador: {timer}</h1>
//         </div>
//     )
// }
