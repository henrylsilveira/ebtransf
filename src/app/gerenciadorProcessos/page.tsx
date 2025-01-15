"use client";
import PopoverAtualizarProcessos from "@/components/gerenciamentoProcessos/atualizarProcessos/PopoverAtualizarProcessos";
import PopoverCarregarProcessos from "@/components/gerenciamentoProcessos/carregarProcessos/PopoverCarregarProcessos";
import ModalCriarProcesso from "@/components/gerenciamentoProcessos/criarProcessos/modalCriarProcesso";
import PopoverDeletarProcessos from "@/components/gerenciamentoProcessos/deletarProcessos/PopoverDeletarProcessos";
import DropdownIniciarProcesso from "@/components/gerenciamentoProcessos/iniciarProcesso/dropdownIniciarProcesso";
import PopoverSalvarProcessos from "@/components/gerenciamentoProcessos/salvarProcessos/PopoverSalvarProcessos";
import { NotData } from "@/components/NotData";
import { ModeloNota, ModeloProcessoProps } from "@/types/types";
import { formatarDataHora, returnProgressBarValue } from "@/utils/scripts";
import { iniciarTutorialProcesso } from "@/utils/tutoriais/processos/inicial";
import * as Accordion from "@radix-ui/react-accordion";
import * as Popover from "@radix-ui/react-popover";
import * as Tabs from "@radix-ui/react-tabs";
import Script from "next/dist/client/script";
import "driver.js/dist/driver.css";
import { SetStateAction, useEffect, useState } from "react";
import {
  MdArrowRight,
  MdHelp,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineEdit,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { toast } from "react-toastify";
import ModalCriarNotas from "@/components/gerenciamentoProcessos/criarNotas/modalCriarNotas";
export default function GerenciadorProcessos() {
  const [processos, setProcessos] = useState([] as ModeloProcessoProps[]);
  const [registrosModelos, setRegistrosModelos] = useState(
    [] as ModeloProcessoProps[]
  );
   const [modelosNotas, setModelosNotas] = useState<ModeloNota[]>([]);
  function addNomeProcesso(id: string, nome: string) {
    const editProcessos = processos.map((processo) =>
      processo.id === id
        ? {
            ...processo,
            pessoa: nome,
            dataInicio: formatarDataHora(new Date().toISOString()),
          }
        : processo
    );
    setProcessos(editProcessos);
  }

  function addObeservacaoEtapa(id: string, observacao: string, fase: number) {
    if (observacao === "") return;
    const editEtapas = processos.map((processo) =>
      processo.id === id
        ? {
            ...processo,
            etapas: processo.etapas.map((etapa) =>
              etapa.fase === fase
                ? {
                    ...etapa,
                    observacao: [
                      ...(etapa.observacao ? etapa.observacao : []),
                      observacao,
                    ],
                  }
                : etapa
            ),
          }
        : processo
    );
    setProcessos(editEtapas);
  }

  function confirmarEtapa(id: string, fase: number) {
    const editProcessos = processos.map((processo) =>
      processo.id === id
        ? {
            ...processo,
            etapas: processo.etapas.map((etapa) =>
              etapa.fase === fase
                ? { ...etapa, situacao: !etapa.situacao }
                : etapa
            ),
            dataInicio: formatarDataHora(new Date().toISOString()),
          }
        : processo
    );
    setProcessos(editProcessos);
  }

  useEffect(() => {
    const processos: ModeloProcessoProps[] = JSON.parse(
      localStorage.getItem("processos")!
    );
    if (!processos) return;
    const setProcessosNovos = new Set();
    const processoOtimizados: ModeloProcessoProps[] = processos.filter(
      (person) => {
        const duplicatedPerson = setProcessosNovos.has(person.id);
        setProcessosNovos.add(person.id);
        return !duplicatedPerson;
      }
    );
    setProcessos(processoOtimizados);
    if (processos.length - processoOtimizados.length > 0) {
      toast.info(
        `Foram removidos ${
          processos.length - processoOtimizados.length
        } registros duplicados!`,
        {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        }
      );
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("processos", JSON.stringify(processos));
  }, [processos]);

  return (
    <>
      <title>EBCalc - Gerenciador de Processos</title>
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
        <Tabs.Root className="flex flex-col w-full h-full" defaultValue="tab1">
          <Tabs.List
            className="flex shrink-0 border-b border-mauve6"
            aria-label="Manage your account"
          >
            <Tabs.Trigger
              className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center  px-5 text-xl leading-none text-green-900 font-bold uppercase outline-none first:rounded-tl-md last:rounded-tr-md hover:text-green-800 data-[state=active]:text-green-600 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:transparent"
              value="tab1"
            >
              Processos
            </Tabs.Trigger>
            <Tabs.Trigger
              className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center  px-5 text-xl leading-none text-green-900 font-bold uppercase outline-none first:rounded-tl-md last:rounded-tr-md hover:text-green-800 data-[state=active]:text-green-600 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:transparent"
              value="tab2"
            >
              Notas
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="grow rounded-b-md  p-5 outline-none"
            value="tab1"
          >
            <div className="flex my-2 justify-between items-center">
              <h1 className="text-green-600 font-bold uppercase text-3xl mr-auto mb-2">
                Processos
              </h1>
              <button
                type="button"
                onClick={iniciarTutorialProcesso}
                className="hover:bg-orange-800 items-center text-xs bg-transparent border h-8 border-orange-700 uppercase text-white py-2 px-4 rounded-md flex gap-2"
              >
                <MdHelp className="w-4 h-4" />
                Ajuda
              </button>
            </div>
            <div
              id="painelFuncionalidades"
              className="shadow-shape bg-gradient-to-tr from-gray-900 to-gray-950 text-gray-400 rounded-md py-2 grid grid-cols-3 gap-2 px-2"
            >
              <ModalCriarProcesso
                setRegistrosModelos={setRegistrosModelos}
                registrosModelos={registrosModelos}
              />
              <DropdownIniciarProcesso
                setProcessos={setProcessos}
                setRegistrosModelos={setRegistrosModelos}
                registrosModelos={registrosModelos}
              />
              <PopoverSalvarProcessos processos={processos} />
              <PopoverAtualizarProcessos processos={processos} />
              <PopoverCarregarProcessos setProcessos={setProcessos} />
              <PopoverDeletarProcessos
                setProcessos={setProcessos}
                processos={processos}
              />
            </div>

            <div className="flex mt-4">
              <h1 className="text-green-600 font-bold uppercase text-xl mx-auto mb-2">
                Meus Processos
              </h1>
            </div>
            <div
              id="meusProcessos"
              className="bg-gradient-to-tr from-gray-900 to-gray-950 rounded-md"
            >
              {processos?.length === 0 ? (
                <NotData textoComponent="Nenhum processo encontrado." />
              ) : (
                <Accordion.Root
                  type="single"
                  className=" rounded-md px-3 py-2 text-gray-400 flexgap-1 shadow-shape"
                  collapsible
                >
                  {processos.map((processo, index) => (
                    <Accordion.AccordionItem
                      value={processo.id}
                      key={index + processo.id}
                      className="border-b last:border-none border-green-800 py-2"
                    >
                      <Accordion.AccordionHeader className="flex relative">
                        <Accordion.AccordionTrigger className="text-gray-400 w-full flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <MdOutlineKeyboardDoubleArrowRight className="text-green-600 w-4 h-4" />
                              <h1 className="uppercase font-bold">
                                {processo.titulo}
                              </h1>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-gray-600 uppercase">
                                {processo.pessoa}
                              </p>
                              <p className="text-gray-600 uppercase text-xs">
                                {processo.dataInicio}
                              </p>
                            </div>
                          </div>
                          <MdOutlineKeyboardArrowDown className="w-5 h-5 mr-2" />
                        </Accordion.AccordionTrigger>
                        {!processo.pessoa && (
                          <div className="absolute right-[-41px] top-[-5px]">
                            <Popover.Root aria-controls="suporte">
                              <Popover.Trigger>
                                <button className="bg-blue-800 px-2 py-2 rounded-r-full shadow-shape">
                                  <MdOutlineEdit />
                                </button>
                              </Popover.Trigger>

                              <Popover.Content className="bg-gray-900 z-10 p-2 rounded-md shadow-shape flex justify-center flex-col ">
                                <div className="py-2">
                                  <div className="relative z-0 w-full p-1 group">
                                    <input
                                      type="text"
                                      name="pessoa"
                                      id="pessoa"
                                      onBlur={(e) =>
                                        addNomeProcesso(
                                          processo.id,
                                          e.target.value
                                        )
                                      }
                                      className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                      placeholder=" "
                                      required
                                    />
                                    <label
                                      htmlFor="pessoa"
                                      className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                      Pessoa do processo
                                    </label>
                                  </div>
                                  <div className="flex justify-center">
                                    <button className="w-24 bg-trasparent hover:bg-green-600 text-green-600 hover:text-white border border-green-600 py-1 rounded-b-md">
                                      Salvar
                                    </button>
                                  </div>
                                </div>

                                <Popover.Close />
                                <Popover.Arrow className="fill-[#192132]" />
                              </Popover.Content>
                            </Popover.Root>
                          </div>
                        )}
                      </Accordion.AccordionHeader>
                      <div className="my-2 flex gap-2 items-center">
                        <div className="w-full h-2.5 overflow-hidden rounded-full bg-green-900/20  shadow-shape">
                          <div
                            className="h-2.5 flex-1 bg-gradient-to-tr rounded-md to-green-600 from-gray-900/60 shadow-container ease-in transition-all duration-700"
                            style={{
                              width: `${returnProgressBarValue(processo)}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-white">
                          {returnProgressBarValue(processo)}%
                        </p>
                      </div>
                      <Accordion.AccordionContent className="shadow-innerShadow rounded-md p-4">
                        <ul>
                          {processo.etapas?.map((etapa, index) => (
                            <li
                              className="bg-gray-950 hover:bg-gradient-to-tr to-gray-950 from-gray-900/20 shadow-shape flex flex-1 rounded-md items-center mb-1 py-1 px-2 justify-between"
                              key={index}
                            >
                              <div className="flex items-center gap-2">
                                <div className="bg-green-950 w-6 h-6 rounded-full flex items-center justify-center shadow-container">
                                  {etapa.fase}
                                </div>
                                <div>
                                  {etapa.nome}
                                  {etapa.observacao?.map(
                                    (observacao, index) => (
                                      <p
                                        key={index}
                                        className="text-gray-600 text-xs flex items-center"
                                      >
                                        <MdArrowRight className="w-4 h-4 text-green-600" />
                                        {observacao}
                                      </p>
                                    )
                                  )}
                                </div>
                                {!etapa.situacao && (
                                  <Popover.Root aria-controls="observacao">
                                    <Popover.Trigger>
                                      <div className="bg-transparent hover:bg-green-900 rounded-2xl px-3 py-1 shadow-shape">
                                        <MdOutlineEdit />
                                      </div>
                                    </Popover.Trigger>
                                    <Popover.Content className="bg-gray-900 z-10 p-2 rounded-md shadow-shape flex justify-center flex-col ">
                                      <div className="py-2">
                                        <div className="relative z-0 w-full p-1 group">
                                          <input
                                            type="text"
                                            name="observacao"
                                            id="observacao"
                                            onBlur={(e) =>
                                              addObeservacaoEtapa(
                                                processo.id,
                                                e.target.value,
                                                etapa.fase
                                              )
                                            }
                                            className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                            placeholder=" "
                                            required
                                          />
                                          <label
                                            htmlFor="observacao"
                                            className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          >
                                            Observação da Etapa
                                          </label>
                                        </div>
                                        <div className="flex justify-center">
                                          <button className="w-24 bg-trasparent hover:bg-green-600 text-green-600 hover:text-white border border-green-600 py-1 rounded-b-md">
                                            Salvar
                                          </button>
                                        </div>
                                      </div>
                                      <Popover.Close />
                                      <Popover.Arrow className="fill-[#192132]" />
                                    </Popover.Content>
                                  </Popover.Root>
                                )}
                              </div>
                              <button
                                className="cursor-pointer"
                                onClick={() =>
                                  confirmarEtapa(processo.id, etapa.fase)
                                }
                              >
                                {etapa.situacao ? (
                                  <MdOutlineCheckBox className="text-green-600 w-5 h-5" />
                                ) : (
                                  <MdOutlineCheckBoxOutlineBlank className="text-green-600 w-5 h-5" />
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </Accordion.AccordionContent>
                    </Accordion.AccordionItem>
                  ))}
                </Accordion.Root>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="grow rounded-b-md p-5 outline-none"
            value="tab2"
          >
            <div
              className="shadow-shape bg-gradient-to-tr from-gray-900 to-gray-950 text-gray-400 rounded-md py-2 grid grid-cols-3 gap-2 px-2"
            >
                <ModalCriarNotas modelosNotas={modelosNotas} setModelosNotas={setModelosNotas}  />
            </div>
            {modelosNotas?.length === 0 ? (
                <NotData textoComponent="Nenhum processo encontrado." />
              ) : (
                <div className="gap-2 grid grid-cols-2 my-2">
                  {modelosNotas?.map(modelo => (
                  <div key={modelo.id} className="bg-gray-950 rounded-md shadow-shape py-2 px-4 flex flex-col gap-1">
                    <h1 className="font-bold text-green-800 text-2xl">{modelo.titulo}</h1>
                    <p className="font-bold text-gray-800 text-md">{modelo.subTitulo}</p>
                  </div>
                ))}
                </div>
                
              )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
}
