'use client'
import * as Popover from '@radix-ui/react-popover';
import { MdOutlineEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { CiWarning } from "react-icons/ci";
import { ModeloProcessoProps } from '@/types/types';
import { api } from '@/services/axios';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';

export default function PopoverAtualizarProcessos({ processos }: { processos: ModeloProcessoProps[] }) {
    const [tokenCache, setTokenCache] = useState({ token: "", locator: "" } as { token: string, locator: string })
    const [formData, setFormData] = useState({ token: "", locator: "" } as { token: string, locator: string });
    const [loading, setLoading] = useState(false)

    async function handleUpdateProcess() {
        try {
            setLoading(true)
            if (processos.length === 0) return toast.error('Nenhum processo encontrado!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            })
            await api.put(`/processos/${formData.token}/${formData.locator}`, processos)
            toast.success('Processos atualizados com sucesso!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false)
        } catch (error) {
            toast.error('Erro durante a operação!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        getTokenCached()
    }, [])

    function getTokenCached() {
        setTokenCache(JSON.parse(localStorage.getItem("tokenCache")!))
        setFormData({ token: tokenCache.token, locator: tokenCache.locator })
    }

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    

    return (
        <div>
            <Popover.Root >
                <Popover.Trigger aria-controls="atualizar-processo">
                    <div id='atualizarProcessos' onClick={getTokenCached} className="uppercase hover:text-gray-200 hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative">Atualizar</div>
                </Popover.Trigger>
                <Popover.Content className="bg-gray-900 z-10 p-2 rounded-md shadow-shape flex justify-center flex-col ">
                    <div className="py-2 gap-2">
                        <div className='flex w-64 flex-col gap-2'>
                            <h1 className='flex justify-center uppercase font-semibold border-b border-green-800'>Atualizar processos</h1>
                            <div className="relative z-0 w-full p-1 group">
                                <input type="text" name="token" id="token" value={tokenCache.token} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="token" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token</label>
                            </div>
                            <div className="relative z-0 w-full p-1 group">
                                <input type="text" name="locator" id="locator" value={tokenCache.locator} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="locator" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Localizador</label>
                            </div>
                        </div>
                        {loading ? <div className='flex justify-center w-full'><Loader /></div> : <div className="flex justify-center gap-2 ">
                            <button onClick={() => handleUpdateProcess()} className="w-full mt-1 bg-trasparent hover:bg-green-600 text-green-600 hover:text-white border border-green-600 py-1 rounded-b-md">Salvar</button>
                        </div>}
                    </div>
                    <Popover.Close />
                    <Popover.Arrow className="fill-[#192132]" />
                </Popover.Content>
            </Popover.Root>
        </div>
    );
}