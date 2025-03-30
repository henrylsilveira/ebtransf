"use client";
import FaleConosco from "@/components/feedback/FaleConosco";
import { infoServicoProps, servicoProps } from "@/types/types";
import { feriados } from "@/utils/dados/datas";
import {
  adicionarDiaVerificarFimDeSemana,
  adicionarUmDia,
  getDiaSemana,
} from "@/utils/dateScripts";
import { convertDate } from "@/utils/scripts";

import Script from "next/dist/client/script";
import { useState } from "react";
import { GoAlert } from "react-icons/go";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { toast } from "react-toastify";
export default function Servico() {
  const [formData, setFormData] = useState<servicoProps>({
    servicoPreta: "",
    servicoVermelha: "",
    totalDias: 0,
    folga: 0,
  } as servicoProps);
  const [infoServico, setInfoServico] = useState<infoServicoProps>(
    {} as infoServicoProps
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    
  };

  function gerarPlanejamentoServico() {
    if (
      formData.servicoPreta === "" ||
      formData.servicoVermelha === "" ||
      formData.totalDias === 0 ||
      formData.folga === 0
    ) {
      toast.error("Preencha todos os campos!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
      return;
    }

    let diasServicoPreta = [] as string[];
    let diasServicoVermelha = [] as string[];
    let servicoPreta = adicionarUmDia(formData.servicoPreta);
    let servicoVermelha = adicionarUmDia(formData.servicoVermelha);
    let contadorPreta = 0;
    let contadorVermelha = 0;

    for (let i = 0; i < formData.totalDias; i++) {
      if (i !== 0) servicoPreta = adicionarUmDia(servicoPreta);
      if (adicionarDiaVerificarFimDeSemana(servicoPreta)) {
        contadorPreta++;
        if (contadorPreta === Number(formData.folga) + 1) {
          diasServicoPreta = [...diasServicoPreta, servicoPreta];
          contadorPreta = 0;
        }
      }
    }

    for (let i = 0; i < formData.totalDias; i++) {
      if (i !== 0) servicoVermelha = adicionarUmDia(servicoVermelha);
      if (
        !adicionarDiaVerificarFimDeSemana(servicoVermelha) ||
        feriados[2025].some((feriado) => feriado.data === servicoVermelha)
      ) {
        contadorVermelha++;
        if (contadorVermelha === Number(formData.folga) + 1) {
          diasServicoVermelha = [...diasServicoVermelha, servicoVermelha];
          contadorVermelha = 0;
        }
      }
     
    }

    setInfoServico({
      preta: {
        data: formData.servicoPreta,
        diaSemana: getDiaSemana(formData.servicoPreta),
        servicosFuturos: diasServicoPreta,
      },
      vermelha: {
        data: formData.servicoVermelha,
        diaSemana: getDiaSemana(formData.servicoVermelha),
        servicosFuturos: diasServicoVermelha,
      },
    });
    toast.success("Previsão gerada com sucesso!", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  }

  return (
    <>
      <title>EBCalc - Gerenciador de Serviço</title>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?nome=G-W6B1SSXWE7"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-W6B1SSXWE7');`}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
        crossOrigin="anonymous"
      />
      <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-10 rounded-lg mb-20 mt-4 h-full min-h-screen">
        <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">
          Gerenciador de Serviço
        </h1>
        <div className="flex w-full flex-col md:flex-row md:justify-center bg-gray-950 shadow-shape gap-2 items-center rounded-md px-2 py-2 text-yellow-500">
          <GoAlert className="w-6 h-6 text-yellow-500" />
          <p className="text-xs">
            Ferramenta em teste, qualquer erro deixe seu feedback para nos
            ajudar a melhorá-la.
          </p>
          <div className="p-1 shadow-container bg-green-950 rounded-xl flex items-center justify-center">
            <FaleConosco />
          </div>
        </div>
        <div className="flex w-full flex-col bg-gray-950 shadow-shape rounded-md gap-4 px-6 py-6">
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex flex-col w-full">
              <div className="relative z-0 w-full group flex mb-4">
                <input
                  type="date"
                  name="servicoPreta"
                  onChange={handleChange}
                  id="servicoPreta"
                  className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:[color-scheme:dark] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="servicoPreta"
                  className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Serviço na preta
                </label>
              </div>
              <div className="relative z-0  w-full group flex mb-4">
                <input
                  type="date"
                  name="servicoVermelha"
                  onChange={handleChange}
                  id="servicoVermelha"
                  className="block py-2.5 px-0 w-full text-sm dark:[color-scheme:dark] [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="servicoVermelha"
                  className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Serviço na vermelha
                </label>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="relative z-0  mb-4 group flex flex-col">
                <input
                  type="number"
                  name="folga"
                  onChange={handleChange}
                  id="folga"
                  className="block py-2.5 px-0text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="folga"
                  className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Dias de folga
                </label>
                <span className="text-gray-600 text-xs ">
                  Quantidade de pessoas na escala
                </span>
              </div>
              <div className="relative z-0 group flex flex-col">
                <input
                  type="number"
                  name="totalDias"
                  onChange={handleChange}
                  id="totalDias"
                  className="block py-2.5 px-0 text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="totalDias"
                  className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Total de dias
                </label>
                <span className="text-gray-600 text-xs ">
                  Quantidade de dias para frente que deseja prever
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            <button
              className="text-white shadow-container hover:bg-green-900 ease-in-out transition-all duration-500 rounded-md py-2 px-4 w-full border border-green-950  uppercase "
              onClick={gerarPlanejamentoServico}
            >
              Gerar previsão
            </button>
          </div>
        </div>
        <div className="w-full mt-2 flex flex-col h-14 sm:h-16 overflow-y-hidden group sm:hover:h-96 hover:h-[640px] after:h-auto transition-all ease-in-out duration-700 bg-gray-950 shadow-shape rounded-md gap-4 px-6 py-4">
          <div className="flex flex-1 justify-between">
            <h1 className="text-green-600 text-xl sm:text-2xl uppercase font-extrabold">
              Feriados 2025
            </h1>
            <div>
              <MdKeyboardDoubleArrowDown className="w-6 h-6 text-green-600 group-hover:-rotate-180 transition-all ease-in-out duration-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {feriados[2025].map((data, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-950 shadow-shape px-2 justify-center items-center rounded-sm py-2"
              >
                <p className="text-white text-xs">{convertDate(data.data)}</p>
                <p className="text-gray-600 text-xs">
                  {getDiaSemana(data.data)}
                </p>
                <p className="text-gray-600 text-xs">{data.descricao}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {infoServico.preta?.servicosFuturos.length > 0 && (
            <div className="flex w-full flex-col h-auto max-h-screen overflow-y-auto  bg-gradient-to-tr from-gray-950/80 from-40%  to-100% to-green-900 shadow-shape rounded-md gap-4 px-6 py-4">
              <h1 className="text-gray-950 text-xl sm:text-2xl uppercase font-extrabold">
                Escala Preta
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {infoServico.preta?.servicosFuturos.map((servico, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-gray-950 shadow-shape px-2 justify-center items-center rounded-sm py-2"
                  >
                    <p className="text-white text-sm">{convertDate(servico)}</p>
                    <p className="text-gray-600 text-xs">
                      {getDiaSemana(servico)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {infoServico.vermelha?.servicosFuturos.length > 0 && (
            <div className="flex w-full flex-col h-auto max-h-screen overflow-y-auto bg-gradient-to-tr from-gray-950/80 from-40%  to-100% to-red-900 shadow-shape rounded-md gap-4 px-6 py-4">
              <h1 className="text-red-500 text-xl sm:text-2xl font-extrabold uppercase">
                Escala Vermelha
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {infoServico.vermelha?.servicosFuturos.map((servico, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-gray-950 shadow-shape px-2 justify-center items-center rounded-sm py-2"
                  >
                    <p className="text-white text-sm">{convertDate(servico)}</p>
                    <p className="text-gray-600 text-xs">
                      {getDiaSemana(servico)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
