"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import {
  calcularDiferencaAtual,
  calculateFutureDate,
  convertDate,
  formatarDataHora,
} from "@/utils/scripts";
import { Links } from "@/components/Links";
import { FaClock, FaPlus, FaPlusCircle } from "react-icons/fa";
import {
  MdOutlineAdd,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { FaX } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { BsTrash3 } from "react-icons/bs";

interface calcDiaProps {
  dia?: number;
  mes?: number;
  ano?: number;
  totalDias?: number;
  message?: string;
}

interface dataProps {
  dateOne: string;
  dateTwo: string;
  dateOneEsp: string;
  dateTwoEsp: string;
  calcDia: calcDiaProps;
  tempReserva: boolean;
  guEsp: boolean;
  numTempoReserva: number;
  tempGuEsp: {
    id: string;
    iniTempo: string;
    fimTempo: string;
    calculos: calcDiaProps;
  }[];
}

export default function TempoServico() {
  const [dataForm, setDataForm] = useState({
    dateOne: "",
    dateTwo: "",
    dateOneEsp: "",
    dateTwoEsp: "",
    calcDia: {},
    numTempoReserva: 0,
    tempReserva: false,
    guEsp: false,
    tempGuEsp: [],
  } as dataProps);

  useEffect(() => {
    if (dataForm.dateTwo) {
      setDataForm({
        ...dataForm,
        calcDia: calcularDiferencaAtual(dataForm.dateOne, dataForm.dateTwo),
      });
    } else {
      setDataForm({
        ...dataForm,
        calcDia: calcularDiferencaAtual(dataForm.dateOne),
      });
    }
  }, [dataForm.dateOne, dataForm.dateTwo]);

  function handleSaveFormEsp() {
    setDataForm({
      ...dataForm,
      tempGuEsp: [
        ...dataForm.tempGuEsp,
        {
          id: crypto.randomUUID().toString(),
          iniTempo: dataForm.dateOneEsp,
          fimTempo: dataForm.dateTwoEsp,
          calculos: calcularDiferencaAtual(
            dataForm.dateOneEsp,
            dataForm.dateTwoEsp
          ),
        },
      ],
    });
    console.log(dataForm);
  }

  function handleRemoveFormEsp(id: string) {
    setDataForm({
      ...dataForm,
      tempGuEsp: dataForm.tempGuEsp.filter((temp) => temp.id !== id),
    });
  }

  const handlerChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: boolean } }
  ) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
    console.log(dataForm);
  };

  function setShowCounter(data: string): void {
    localStorage.setItem("contadorReserva", JSON.stringify({ data }));
  }

  return (
    <>
      <title>EBCalc - Calculadora Tempo de Serviço</title>
      <div className="max-w-2xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"
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
        <div className="flex flex-1 items-center justify-center mb-6 flex-col">
          <h1 className="text-green-600 font-bold uppercase text-xl">
            Calculadora de tempo de serviço para Militares
          </h1>
          <p className="font-light text-white text-justify py-4">
            Essa calculadora tem como objetivo auxiliar o militar a calcular seu
            tempo aproximado de serviço e não se trata de uma ferramenta
            oficial.
          </p>
          <article className="font-light text-white text-justify py-4">
            Para calcular o tempo de serviço militar, você geralmente precisa
            considerar o seguinte:
            <ul>
              <li>
                Duração do Serviço: Descubra qual é a duração mínima do serviço
                militar obrigatório ou voluntário. Isso pode variar de alguns
                meses a vários anos.
              </li>
              <li>
                Data de Ingresso: Anote a data em que você se alistou ou foi
                convocado para o serviço militar.
              </li>
              <li>
                Data de Término: Determine a data em que seu serviço militar foi
                concluído ou será concluído, de acordo com as regras e
                regulamentos do serviço militar em seu país.
              </li>
              <li>
                Circunstâncias Especiais: Considere se você teve alguma licença,
                folga ou serviço ativo durante o período de serviço militar,
                pois essas circunstâncias podem afetar o cálculo do tempo de
                serviço.
              </li>
              <li>
                Documentação: Mantenha registros e documentos oficiais
                relacionados ao seu serviço militar, como ordens de serviço,
                cartas de dispensa, registros de pagamento e outros documentos
                que possam comprovar o tempo de serviço.
              </li>
            </ul>
            Com essas informações, você pode calcular o tempo de serviço militar
            subtraindo a data de início da data de término, levando em
            consideração qualquer período de licença ou serviço ativo
            interrompido. O serviço militar pode ser calculado de forma
            diferente para determinados fins, como benefícios de veteranos,
            aposentadoria militar e assim por diante.
          </article>
        </div>
        <div className="gap-4 w-full shadow-shape py-2 px-4 rounded-lg mb-2 flex items-center text-xs md:text-base justify-center">
          <button
            className="cursor-pointer flex items-center justify-center text-gray-400 gap-2"
            onClick={() => {}}
          >
            {dataForm.tempReserva ? (
              <MdOutlineCheckBox
                onClick={() =>
                  handlerChange({
                    target: {
                      name: "tempReserva",
                      value: !dataForm.tempReserva,
                    },
                  })
                }
                className="text-green-600 w-5 h-5 flex items-center"
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                onClick={() =>
                  handlerChange({
                    target: {
                      name: "tempReserva",
                      value: !dataForm.tempReserva,
                    },
                  })
                }
                className="text-green-600 w-5 h-5 flex items-center"
              />
            )}
            Tempo para reserva
          </button>
          <button
            className="cursor-pointer flex items-center justify-center text-gray-400 gap-2"
            onClick={() => {}}
          >
            {dataForm.guEsp ? (
              <MdOutlineCheckBox
                onClick={() =>
                  handlerChange({
                    target: { name: "guEsp", value: !dataForm.guEsp },
                  })
                }
                className="text-green-600 w-5 h-5 flex items-center"
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                onClick={() =>
                  handlerChange({
                    target: { name: "guEsp", value: !dataForm.guEsp },
                  })
                }
                className="text-green-600 w-5 h-5 flex items-center"
              />
            )}
            Guarnição Especial
          </button>
        </div>
        {dataForm.tempReserva && (
          <div className="flex gap-4">
            <div className="relative z-0 mb-6 w-full group mt-2">
              <input
                type="number"
                name="numTempoReserva"
                onChange={(e) => handlerChange(e)}
                id="numTempoReserva"
                className="[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=""
              />
              <label
                htmlFor="numTempoReserva"
                className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tempo total para reserva (anos)
              </label>
              <span className="text-xs text-gray-500">
                Coloque o tempo total em anos para reserva levando em
                consideração o pedágio de tempo.
              </span>
            </div>
          </div>
        )}

        <div className="gap-4 flex flex-col">
          <h1 className="text-green-600 font-bold text-sm uppercase">
            Tempo de serviço total
          </h1>
          <div className="flex gap-4">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="date"
                name="dateOne"
                onChange={(e) => handlerChange(e)}
                id="dateOne"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="dateOne"
                className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Data de praça
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="date"
                name="dateTwo"
                onChange={(e) => handlerChange(e)}
                id="dateTwo"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="dateTwo"
                className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Data de Término
              </label>
              <span className="text-xs text-red-500">
                Deixe em branco para considerar a data de hoje.
              </span>
            </div>
          </div>
        </div>
        {dataForm.guEsp && (
          <div className="gap-4 flex flex-col">
            <h1 className="text-green-600 font-bold text-sm uppercase">
              Tempo de serviço em guarnição especial
            </h1>
            <div className="flex gap-4">
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="date"
                  name="dateOneEsp"
                  onChange={(e) => handlerChange(e)}
                  id="dateOneEsp"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="dateOneEsp"
                  className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Data de Início
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="date"
                  name="dateTwoEsp"
                  onChange={(e) => handlerChange(e)}
                  id="dateTwoEsp"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor="dateTwoEsp"
                  className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Data de Término
                </label>
              </div>
              <div>
                <button
                  onClick={() => handleSaveFormEsp()}
                  className="hover:bg-green-800 transition-all ease-in-out duration-300 rounded-md w-8 h-8 shadow-container bg-green-600 flex items-center justify-center"
                >
                  <MdOutlineAdd className="w-6 h-6 text-gray-900" />
                </button>
              </div>
            </div>
            {dataForm.tempGuEsp.length > 0 && (
              <div className="shadow-innerShadow rounded-md p-4 text-xs sm:text-base">
                {dataForm.tempGuEsp?.map((data, index) => (
                  <li
                    key={index}
                    className="bg-gray-950 hover:bg-gradient-to-tr to-gray-950 from-gray-900/20 shadow-shape flex flex-1 rounded-md items-center mb-1 py-1 px-2 justify-between"
                  >
                    <div className="flex flex-col">
                      <div className="flex gap-4">
                        <p className="text-green-600">
                          Data Inicio:{" "}
                          <span className="text-gray-400">
                            {convertDate(data.iniTempo)}
                          </span>
                        </p>
                        <p className="text-green-600">
                          Data Término:{" "}
                          <span className="text-gray-400">
                            {convertDate(data.fimTempo)}
                          </span>
                        </p>
                      </div>
                      <div className="flex text-xs gap-2 flex-col sm:flex-row">
                        <p className="text-red-600">
                          Tempo total:
                          <span className="text-gray-400 pl-2">
                            {data.calculos.ano} anos
                          </span>
                          <span className="text-gray-400 pl-2">
                            {data.calculos.mes} meses
                          </span>
                          <span className="text-gray-400 pl-2">
                            {data.calculos.dia} dias
                          </span>
                        </p>
                        
                        <p className="text-red-600">
                          Total em dias:{" "}
                          <span className="text-gray-400 pl-2">
                            {data.calculos.totalDias}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFormEsp(data.id)}
                      className="shadow-shape hover:bg-red-900 right-0 top-2 bg-red-800 rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <BsTrash3 className="w-3 h-3 text-white" />
                    </button>
                  </li>
                ))}
              </div>
            )}
          </div>
        )}

        {dataForm.dateOne ? (
          <div>
            {dataForm.calcDia?.message ? (
              <div className="flex-1 flex">
                <FiAlertTriangle className="pr-1 text-2xl text-red-600" />
                <p className="font-bold text-red-600">
                  {dataForm.calcDia?.message}
                </p>
              </div>
            ) : (
              <div className="border text-xs sm:text-base border-green-600 rounded-md p-6 relative my-4">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
                  TEMPO
                </h1>
                <div className="flex flex-col">
                  <p className="font-light text-white flex">
                    <p className="font-bold pr-2">
                      Tempo de serviço em guarnição especial:{" "}
                    </p>
                    <span className="text-gray-400">
                      {dataForm.tempGuEsp.reduce(
                        (acc, val) => acc + val.calculos.totalDias!,
                        0
                      )}{" "}
                      dias
                    </span>
                  </p>

                  {dataForm.tempGuEsp.reduce(
                    (acc, val) => acc + val.calculos.totalDias!,
                    0
                  ) > 720 ? (
                    <span className="text-xs items-center text-green-600 flex">
                      <GiCheckMark className="h-4 w-4" />
                      Tempo suficiente de selva, ganhando
                      {" " +
                        Math.floor(
                          dataForm.tempGuEsp.reduce(
                            (acc, val) => acc + val.calculos.totalDias!,
                            0
                          ) / 720
                        ) *
                          8 +
                        " "}
                      meses a menos de serviço. Faltam{" "}
                      {Math.ceil(
                        dataForm.tempGuEsp.reduce(
                          (acc, val) => acc + val.calculos.totalDias!,
                          0
                        ) / 720
                      ) *
                        720 -
                        Math.ceil(
                          dataForm.tempGuEsp.reduce(
                            (acc, val) => acc + val.calculos.totalDias!,
                            0
                          )
                        )}{" "}
                      dias para fechar mais 8 meses.
                    </span>
                  ) : (
                    <span className="text-xs items-center flex text-red-600">
                      <FaX className="4 w-4" />
                      Não tem tempo suficiente de selva faltam{" "}
                      {720 -
                        dataForm.tempGuEsp.reduce(
                          (acc, val) => acc + val.calculos.totalDias!,
                          0
                        )}
                      {" dias"}
                    </span>
                  )}
                </div>

                <p className="font-light text-white flex">
                  <p className="font-bold pr-2">
                    Tempo de Serviço para reserva:
                  </p>
                  <span className="text-gray-400">
                    {dataForm.numTempoReserva +
                      " anos | " +
                      dataForm.numTempoReserva * 12 +
                      " meses | " +
                      dataForm.numTempoReserva * 365 +
                      " dias "}
                  </span>
                </p>
                <p className="font-light text-white flex">
                  <p className="font-bold pr-2">Tempo de serviço:</p>
                  <span className="text-gray-400">
                    {`${dataForm.calcDia?.ano} anos, ${dataForm.calcDia?.mes} meses e ${dataForm.calcDia?.dia} dias de serviço.`}
                  </span>
                </p>
                <p className="font-light text-white flex">
                  <p className="font-bold pr-2">Total de dias:</p>
                  <span className="text-gray-400">
                    {dataForm.calcDia?.totalDias}
                  </span>
                </p>
                <div className="w-full flex shadow-shape my-2 py-4 relative">
                  {/* ATIVA UM PEQUENO CONTADOR QUE FICA NO TOPO DA PAGINA ESTATICO MOSTRANDO A CONTAGEM REGRESSIVA PARA A APOSENTADORIA */}
                  {/* <button
                    onClick={() =>
                      setShowCounter(
                        calculateFutureDate(
                          dataForm.numTempoReserva * 365 -
                            (dataForm.calcDia?.totalDias! +
                              Math.floor(
                                dataForm.tempGuEsp.reduce(
                                  (acc, val) => acc + val.calculos.totalDias!,
                                  0
                                ) / 720
                              ) *
                                8 *
                                30)
                        ).data
                      )
                    }
                    className="absolute text-xs hover:bg-green-900 transition-all ease-in-out duration-300 text-gray-300 uppercase gap-2 shadow-shape py-1 px-2 rounded-md top-1 right-1 flex items-center"
                  >
                    <FaClock className="w-4 h-4" />
                    Contador
                  </button> */}
                  {dataForm.numTempoReserva ? (
                    <div className="w-full">
                      <div>
                        <h1 className="text-green-600 font-bold uppercase text-base flex justify-center w-full">
                          Tempo total para reserva
                        </h1>
                        <p className="flex justify-center text-xl sm:text-3xl  text-red-700">
                          {
                            calculateFutureDate(
                              dataForm.numTempoReserva * 365 -
                                (dataForm.calcDia?.totalDias! +
                                  Math.floor(
                                    dataForm.tempGuEsp.reduce(
                                      (acc, val) =>
                                        acc + val.calculos.totalDias!,
                                      0
                                    ) / 720
                                  ) *
                                    8 *
                                    30)
                            ).anoMesDia
                          }
                        </p>
                      </div>
                      <div>
                        <h1 className="text-green-600 font-bold uppercase text-base flex justify-center w-full">
                          Data da reserva
                        </h1>
                        <p className="flex justify-center  text-xl sm:text-3xl text-red-700">
                          {
                            calculateFutureDate(
                              dataForm.numTempoReserva * 365 -
                                (dataForm.calcDia?.totalDias! +
                                  Math.floor(
                                    dataForm.tempGuEsp.reduce(
                                      (acc, val) =>
                                        acc + val.calculos.totalDias!,
                                      0
                                    ) / 720
                                  ) *
                                    8 *
                                    30)
                            ).data
                          }
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-6">
                      <FiAlertTriangle className="w-8 h-8 flex justify-center text-red-800" />
                      <p className="flex justify-center text-sm md:text-base py-4 px-6 text-red-700">
                        Informe um valor no campo "tempo total para reserva".
                      </p>
                    </div>
                  )}

                  <span className="text-xs italic absolute bottom-0 left-1 text-gray-700">
                    * Esse valor pode sofrer pequenas distorções
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : null}

        <Links />
      </div>
    </>
  );
}
