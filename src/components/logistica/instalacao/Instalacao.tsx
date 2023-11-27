
import { Loader } from "@/components/Loader/Loader";
import { api } from "@/services/axios";
import { InstalacaoLogisticaProps } from "@/types/types";
import { useState } from "react";
import { toast } from "react-toastify";

export function Instalacao() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<InstalacaoLogisticaProps>({
        id: "",
        nomeInsta: "",
        combustivel: {},
        farmacia: {},
        rancho: {},
        apoio: {}
    });
    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            id: self.crypto.randomUUID(),
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmitInsta = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        if (formData.nomeInsta == "") {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false);
        } else {
            try {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(api.post("/instalacao", formData));
                    }, 300);
                })
                toast.success("Instalacao criada com sucesso!", {
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
        <div>

            <div className="flex justify-between mb-2 gap-2 border-t py-4 border-green-600">
                <form onSubmit={handleSubmitInsta} className="mb-4">
                    <div className="flex flex-1 items-center justify-center my-6 flex-col">
                        <h1 className="text-green-600 font-bold uppercase text-xl">Controle de Meios Logísticos</h1>
                        <p className="font-light text-white text-justify py-4">O Controle de Combustível é uma ferramenta criada para gerar um relatório do consumo e funcionamento de geradores, para auxiliar na gestão do combustível.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <div className="relative z-0 w-full group flex items-center">
                                <input type="text" name="nomeInsta" onChange={handleChange} id="nomeInsta" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 [appearance:textfield] dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label htmlFor="nomeInsta" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome da Instalação</label>
                            </div>
                        </div>
                    </div>
                    {formData.nomeInsta ? (
                        <div>
                            <div className="flex flex-1 flex-col">
                                <h1 className="text-green-600 font-bold uppercase text-xl">Dados Gerados</h1>
                                <p className="font-light text-white text-justify py-4"><p className="flex gap-2 text-lg text-red-600 font-extrabold">Importante!!</p> Não perca esse Token pois o mesmo serve para consultar as informações armazenadas no banco de dados.</p>
                                <p className="flex gap-2 text-white text-justify py-4 font-extrabold"><p className="text-red-800">Token:</p>{formData.id}</p>
                                <p className="flex gap-2 text-white text-justify py-4 font-extrabold"><p className="text-red-800">Nome da Instalação:</p>{formData.nomeInsta}</p>
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
    )
}