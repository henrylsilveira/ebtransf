'use client'
import * as Popover from '@radix-ui/react-popover';
import { MdOutlineEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { CiWarning } from "react-icons/ci";
import { ModeloProcessoProps } from '@/types/types';
import { api } from '@/services/axios';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';

export default function PopoverSalvarProcessos({ processos }: { processos: ModeloProcessoProps[] }) {
    const [loading, setLoading] = useState(false)
    const [tokenCache, setTokenCache] = useState({ token: "", locator: "" } as { token: string, locator: string })
    async function handleSaveProcess() {
        try {
            setLoading(true)
            if (processos.length === 0) return toast.error('Nenhum processo encontrado!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            })
            const stringifyProcessos = JSON.stringify(processos)
            await api.post("/processos", { processos: stringifyProcessos }).then(res => setTokenCache({ token: res.data.token, locator: res.data.locator }))
            toast.success('Processos salvos com sucesso!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false)
        } catch (error) {
            toast.error('Erro durante a operação!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            })
        }
    }

    useEffect(() => {
        setTokenCache(JSON.parse(localStorage.getItem("tokenCache")!))
    }, [])
    useEffect(() => {
        localStorage.setItem("tokenCache", JSON.stringify(tokenCache))
    }, [tokenCache])

    return (
        <div>
            <Popover.Root >
                <Popover.Trigger aria-controls="observacao">
                    <div className="uppercase hover:text-gray-200 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative">Salvar processos</div>
                </Popover.Trigger>
                <Popover.Content className="bg-gray-900 z-10 p-2 rounded-md shadow-shape flex justify-center flex-col ">
                    <div className="py-2 gap-2">
                        <div className='flex w-64 flex-col gap-2'>
                            <h1 className='flex justify-center uppercase font-semibold border-b border-green-800'>Salvar processos</h1>
                            <div className='flex flex-1 items-center'>
                                <CiWarning className='w-4 h-4 text-red-600' />
                                <p className='text-red-700'>Leia as informações abaixo.</p>
                            </div>
                            <p className='flex-wrap text-gray-500'>Atualmente os processos estão salvos somente no seu navegador, assim só é possível visualizar os dados nesse navegador. Caso o usuário opte por salvar no banco de dados, as informações serão criptografadas e armazenadas em um banco online sendo possível recuperar em outros computadores com o token e localizador gerado.</p>
                        </div>
                        {(tokenCache?.token && tokenCache?.locator) ?
                            <div className='flex flex-col border rounded border-green-800 p-2 mt-2 flex-wrap'>
                                <p>Token para descriptografar: <span className='text-red-600'>{tokenCache?.token}</span></p>
                                <p>Localizador dos dados: <span className='text-red-600'>{tokenCache?.locator}</span></p>
                            </div> : loading ? <div className='flex justify-center w-full'><Loader /></div> : <div className="flex justify-center gap-2 ">
                                <button onClick={() => handleSaveProcess()} className="w-full mt-1 bg-trasparent hover:bg-green-600 text-green-600 hover:text-white border border-green-600 py-1 rounded-b-md">Salvar</button>
                            </div>}


                    </div>
                    <Popover.Close />
                    <Popover.Arrow className="fill-[#192132]" />
                </Popover.Content>
            </Popover.Root>
        </div>
    );
}