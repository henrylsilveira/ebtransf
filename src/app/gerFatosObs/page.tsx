'use client'
import { Loader } from "@/components/Loader/Loader";
import { api } from "@/services/axios";
import { InstalacaoLogisticaProps } from "@/types/types";
import Script from "next/dist/client/script";
import { useState } from "react";
import { toast } from "react-toastify";
import { TokenProps } from '../../types/types';
import Link from "next/link";
import { MdOutlineClose } from "react-icons/md";

export default function gerenciarFatoObservado() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        nomeCurso: "",
        token: "",
    });
    const [tokens, setTokens] = useState<TokenProps[]>([])

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            id: self.crypto.randomUUID().split('-')[0],
            [event.target.name]: event.target.value,
        });
    };

    function apagarDados() {
        localStorage.removeItem("listTokens")
        setTokens([])
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (formData.nomeCurso == "") {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false);
        } else {
            try {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(api.post("/fatosObservados", formData));
                    }, 300);
                })
                toast.success("Curso criado com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            } catch (error) {
                toast.error("Erro no envio do registro!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            }
            setLoading(false);
        }
    }
    return (
        <>
            <title>EBCalc - Gerenciamento de Fatos Observados</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="relative max-w-4xl w-10/12 sm:text-md text-sm mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
                <div className="flex items-center justify-center mb-6 flex-col">
                    <div>
                        <h1 className="text-green-600 font-bold uppercase text-xl mb-4">Painel de Entrada</h1>
                        <div className=" flex flex-col my-2 w-full gap-4">
                            <div className="relative z-0 w-full group flex items-center">
                                <input type="text" name="nomeToken" onChange={handleChange} id="nomeToken" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="nomeToken" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do Token </label>
                            </div>
                            <div className="relative z-0 w-full group flex items-center">
                                <input type="text" name="token" onChange={handleChange} id="token" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="token" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Token </label>
                            </div>
                            <div className="w-full flex justify-between text-center gap-2">
                                <button type="button" onClick={() => { }} className="hover:bg-red-800 text-xs w-full bg-transparent border border-red-700 uppercase text-white py-2 px-2 rounded-md justify-center flex"><p className="flex"><MdOutlineClose className="mx-auto w-4 h-4" />Apagar</p></button>
                                <Link className="hover:bg-green-800 text-xs bg-transparent border border-green-700 uppercase text-white py-2 px-6 rounded-md" href={`/gerFatosObs/${formData.token}`}>Entrar</Link>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-green-600 font-bold uppercase text-xl mb-4">Token registrados</h1>
                    <div className="grid xs:grid-cols-5 grid-cols-2 gap-4">
                        {/* {tokens.map(token =>
                            <button type="button" key={token.token} onClick={() => pegarDados(token.token)} className="hover:bg-blue-800 w-32 justify-center text-xs bg-transparent border border-blue-700 uppercase text-white py-2 px-2 rounded-md flex gap-2">{token.nomeToken}</button>)} */}
                    </div>
                </div>

                <div className="flex justify-center mb-2 gap-2 py-4 ">
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="flex flex-1 items-center justify-center my-6 flex-col">
                            <h1 className="text-green-600 font-bold uppercase text-xl">Criar Token para um curso</h1>
                            <p className="font-light text-white text-justify py-4">Ao criar uma instalação você recebe um token que será útil para consulta e cadastro do dados no banco de dados.</p>
                        </div>
                        <div className="gap-4 mb-4">

                            <div className="relative z-0 w-full group flex items-center">
                                <input type="text" name="nomeCurso" onChange={handleChange} id="nomeCurso" className=" block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="nomeCurso" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do curso</label>
                            </div>
                            <span className="text-xs text-gray-600">Ex: CFST23/1, CFC92/2, 1 CIA</span>
                        </div>
                        {formData.nomeCurso ? (
                            <div>
                                <div className="flex flex-1 flex-col">
                                    <h1 className="text-green-600 font-bold uppercase text-xl">Dados Gerados</h1>
                                    <p className="font-light text-white text-justify py-4"><p className="flex gap-2 text-lg text-red-600 font-extrabold">Importante!!</p> Não perca esse Token pois o mesmo serve para consultar as informações armazenadas no banco de dados.</p>
                                    <p className="flex gap-2 text-white text-justify py-4 font-extrabold"><p className="text-red-800">Token:</p>{formData.id}</p>
                                    <p className="flex gap-2 text-white text-justify py-4 font-extrabold"><p className="text-red-800">Nome da Instalação:</p>{formData.nomeCurso}</p>
                                </div>
                                {loading
                                    ? <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                                        <div className="bg-transparent border w-full flex justify-center text-xs border-blue-700 uppercase text-white py-2 px-6 rounded-md">

                                            <Loader />
                                        </div>
                                    </div>
                                    :
                                    <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                                        <div className="w-full flex justify-center">
                                            <button type="submit" className="hover:bg-blue-800 bg-transparent border w-full text-xs border-blue-700 uppercase text-white py-2 px-6 rounded-md">Registrar no banco de dados</button>
                                        </div>

                                    </div>
                                }
                            </div>
                        ) : (
                            <></>
                        )}

                    </form>

                </div>


            </div>

        </>
    )
}