'use client'
import * as Popover from '@radix-ui/react-popover';
import { MdOutlineEdit, MdOutlineKeyboardArrowDown, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import { CiWarning } from "react-icons/ci";
import { ModeloProcessoProps } from '@/types/types';
import { api } from '@/services/axios';
import { useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import * as Accordion from '@radix-ui/react-accordion';
import { Progress } from '@/components/ui/progress';
import { returnProgressBarValue } from '@/utils/scripts';
import { NotData } from '@/components/NotData';
import { BsTrash3 } from 'react-icons/bs';
export default function PopoverDeletarProcessos({ processos, setProcessos }: { processos: ModeloProcessoProps[], setProcessos: React.Dispatch<React.SetStateAction<ModeloProcessoProps[]>> }) {

    async function handleDeleteProcess(id: string) {
        try {
            
            if (processos.length === 0) return toast.error('Nenhum processo encontrado!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            })
            setProcessos(processos.filter(processo => processo.id !== id))
           toast.success('Processo deletado com sucesso!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            
        } catch (error) {
            toast.error('Erro durante a operação!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            })
        }
    }

    return (
        <div>
            <Popover.Root >
                <Popover.Trigger aria-controls="deletar-processo">
                    <div className="uppercase hover:text-gray-200 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative">Deletar</div>
                </Popover.Trigger>
                <Popover.Content className="bg-gray-900 z-10 p-2 rounded-md shadow-shape flex justify-center flex-col ">
                    <div className="py-2 gap-2">
                        <div className='flex w-64 flex-col gap-2'>
                            <h1 className='flex justify-center uppercase font-semibold border-b border-green-800'>Deletar processos</h1>
                            <div className='flex flex-1 items-center gap-2 my-2'>
                                <CiWarning className='w-8 h-8 text-red-600' />
                                <p className='text-red-700'>Após deletado o processo não pode ser recuperado.</p>
                            </div>
                            </div>
                        {processos?.length === 0 ? <NotData textoComponent="Nenhum processo encontrado." /> : (
                            <Accordion.Root type="single"
                                className=" rounded-md px-3 text-gray-400 flexgap-1 shadow-shape"
                                collapsible>
                                {processos.map((processo, index) => (
                                    <Accordion.AccordionItem value={processo.id} key={index + processo.id} className="border-b relative last:border-none border-green-800 py-2">
                                        <Accordion.AccordionHeader className="flex relative">
                                            <div className="text-gray-400 w-full flex items-center justify-between text-xs" >
                                                <div className="flex flex-col">
                                                    <div className="flex items-center">
                                                        <MdOutlineKeyboardDoubleArrowRight className="text-green-600 w-4 h-4" />
                                                        <h1 className="uppercase font-bold">{processo.titulo}</h1>

                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-gray-600 uppercase">{processo.pessoa}</p>
                                                        <p className="text-gray-600 uppercase text-xs">{processo.dataInicio}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.AccordionHeader>
                                        <button onClick={() => handleDeleteProcess(processo.id)} className='absolute shadow-shape hover:bg-red-900 right-0 top-2 bg-red-800 rounded-full w-6 h-6 flex items-center justify-center'><BsTrash3 className="w-3 h-3 text-white" /></button>
                                        <div className="py-1">
                                            <Progress value={returnProgressBarValue(processo)} />
                                        </div>
                                    </Accordion.AccordionItem>
                                ))}
                            </Accordion.Root>
                        )}


                    </div>
                    <Popover.Close />
                    <Popover.Arrow className="fill-[#192132]" />
                </Popover.Content>
            </Popover.Root>
        </div>
    );
}