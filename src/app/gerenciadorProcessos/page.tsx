'use client'
import ModalCriarProcesso from "@/components/gerenciamentoProcessos/criarProcessos/modalCriarProcesso";
import DropdownIniciarProcesso from "@/components/gerenciamentoProcessos/iniciarProcesso/dropdownIniciarProcesso";
import { Loader } from "@/components/Loader/Loader";
import { NotData } from "@/components/NotData";
import { ModeloProcessoProps } from "@/types/types";
import { formatarDataHora } from '@/utils/scripts';
import * as Accordion from '@radix-ui/react-accordion';
import * as Popover from '@radix-ui/react-popover';
import Script from "next/dist/client/script";
import { useEffect, useState } from "react";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineEdit, MdOutlineKeyboardArrowDown, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
export default function GerenciadorProcessos() {
    const [processos, setProcessos] = useState([] as ModeloProcessoProps[]);
    const [registrosModelos, setRegistrosModelos] = useState([] as ModeloProcessoProps[]);
    const [loading, setLoading] = useState(false);
    function addNomeProcesso(id: string, nome: string) {
        const editProcessos = processos.map(processo => processo.id === id ? { ...processo, pessoa: nome, dataInicio: formatarDataHora(new Date().toISOString()) } : processo);
        setProcessos(editProcessos);
    }

    function confirmarEtapa(id: string, fase: number) {
        const editProcessos = processos.map(processo => processo.id === id ? { ...processo, etapas: processo.etapas.map(etapa => etapa.fase === fase ? { ...etapa, situacao: !etapa.situacao } : etapa), dataInicio: formatarDataHora(new Date().toISOString()) } : processo);
        setProcessos(editProcessos);
    }

    // function getProcessos(){
    //     new Promise(function(resolve) {
    //         setTimeout(async () => {
    //                 resolve(setProcessos(JSON.parse(localStorage.getItem("processos")!)));

    //         }, 500);
    //     });

    // }
    useEffect(() => {
        setProcessos(JSON.parse(localStorage.getItem("processos")!))
    }, [])
    useEffect(() => {
        localStorage.setItem("processos", JSON.stringify(processos))
    }, [processos])



    return (
        <>
            <title>EBCalc - Gerenciador de Processos</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?nome=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-10 rounded-lg mb-20 mt-4 h-full min-h-screen">
                <div className="w-full shadow-shape bg-gradient-to-tr from-gray-900 to-gray-950 text-gray-400 rounded-md py-4 flex justify-evenly">
                    <ModalCriarProcesso setRegistrosModelos={setRegistrosModelos} registrosModelos={registrosModelos} />
                    <DropdownIniciarProcesso setProcessos={setProcessos} setRegistrosModelos={setRegistrosModelos} registrosModelos={registrosModelos} />
                    <button className="uppercase hover:text-gray-200 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative">Salvar processos</button>
                    <button className="uppercase hover:text-gray-200 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative">Carregar processos</button>
                </div>

                <div className="flex mt-4">
                    <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Processos</h1>
                </div>
                <div className="bg-gradient-to-tr from-gray-900 to-gray-950 rounded-md">
                    {processos.length === 0 ? <NotData textoComponent="Nenhum processo encontrado." /> : (
                        <Accordion.Root type="single"
                            className=" rounded-md px-3 py-2 text-gray-400 flexgap-1 shadow-shape"
                            collapsible>
                            {processos.map((processo, index) => (
                                <Accordion.AccordionItem value={processo.id} key={index + processo.id} className="border-b border-green-800 py-2">
                                    <Accordion.AccordionHeader className="flex relative">

                                        <Accordion.AccordionTrigger className="text-gray-400 w-full flex items-center justify-between" >

                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <MdOutlineKeyboardDoubleArrowRight className="text-green-600 w-4 h-4" />
                                                    <h1 className="uppercase font-bold">{processo.titulo}</h1>

                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-gray-600 uppercase">{processo.pessoa}</p>
                                                    <p className="text-gray-600 uppercase text-xs">{processo.dataInicio}</p>
                                                </div>

                                            </div>


                                            <MdOutlineKeyboardArrowDown className="w-5 h-5 mr-2" />

                                        </Accordion.AccordionTrigger>
                                        {!processo.pessoa &&
                                            <div className="absolute right-[-41px] top-[-5px]">
                                                <Popover.Root aria-controls="suporte">
                                                    <Popover.Trigger>
                                                        <button className="bg-blue-800 px-2 py-2 rounded-r-full shadow-shape"><MdOutlineEdit /></button>
                                                    </Popover.Trigger>

                                                    <Popover.Content className="bg-gray-900 z-10 p-2 rounded-md shadow-shape flex justify-center flex-col ">
                                                        <div className="py-2">
                                                            <div className="relative z-0 w-full p-1 group">
                                                                <input type="text" name="pessoa" id="pessoa" onBlur={(e) => addNomeProcesso(processo.id, e.target.value)} className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                                                <label htmlFor="pessoa" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pessoa do processo</label>
                                                            </div>
                                                            <div className="flex justify-center">

                                                                <button className="w-24 bg-trasparent hover:bg-green-600 text-green-600 hover:text-white border border-green-600 py-1 rounded-b-md">Salvar</button>
                                                            </div>
                                                        </div>

                                                        <Popover.Close />
                                                        <Popover.Arrow className="fill-[#192132]" />
                                                    </Popover.Content>
                                                </Popover.Root>
                                            </div>
                                        }
                                    </Accordion.AccordionHeader>
                                    <Accordion.AccordionContent className="shadow-innerShadow rounded-md p-4">
                                        <ul>
                                            {processo.etapas.map((etapa, index) => (
                                                <li className="bg-gray-950 hover:bg-gradient-to-tr to-gray-950 from-gray-900/20 shadow-shape flex flex-1 rounded-md items-center mb-1 py-1 px-2 justify-between" key={index}>
                                                    <div className="flex items-center gap-2">
                                                        <div className="bg-green-950 w-6 h-6 rounded-full flex items-center justify-center shadow-container">{etapa.fase}</div>
                                                        <p>{etapa.nome}</p>
                                                    </div>
                                                    <button className="cursor-pointer" onClick={() => confirmarEtapa(processo.id, etapa.fase)}>{etapa.situacao ? <MdOutlineCheckBox className="text-green-600 w-5 h-5" /> : <MdOutlineCheckBoxOutlineBlank className="text-green-600 w-5 h-5" />}</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.AccordionContent>
                                </Accordion.AccordionItem>
                            ))}
                        </Accordion.Root>
                    )}
                </div>
            </div>
        </>
    )
}
