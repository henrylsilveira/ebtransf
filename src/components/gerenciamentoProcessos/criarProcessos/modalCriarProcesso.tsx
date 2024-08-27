'use client'
import { Loader } from "@/components/Loader/Loader";
import { ModeloProcessoProps } from "@/types/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineClose, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from "react-toastify";



export default function ModalCriarProcesso({ setRegistrosModelos, registrosModelos }: { setRegistrosModelos: React.Dispatch<React.SetStateAction<ModeloProcessoProps[]>>, registrosModelos: ModeloProcessoProps[] }) {
    const [open, setOpen] = useState(false);

    const [etapas, setEtapas] = useState([] as {
        fase: number
        nome: string
        situacao: boolean
        observacao: string[]
    }[]);
    const [loading, setLoading] = useState(false);
    const [nomeEtapa, setNomeEtapa] = useState("");
    const [formData, setFormData] = useState<ModeloProcessoProps>({} as ModeloProcessoProps);

    useEffect(() => {
        var registros = localStorage.getItem("modelosProcessos")
        if (registros !== null) {
            setRegistrosModelos(JSON.parse(registros))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("modelosProcessos", JSON.stringify(registrosModelos))
    }, [registrosModelos])


    function addEtapas(etapa: string) {
        etapas.push({
            fase: etapas.length + 1,
            nome: etapa,
            situacao: false,
            observacao: []
        });
        setFormData({
            ...formData,
            etapas: [...etapas]
        });
    }

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
            etapas: [...etapas]
        });
    };

    async function handleSubmit() {

        setLoading(true);
        if (formData.etapas.length === 0 || formData.titulo == "") {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
            setLoading(false);
        } else {
            try {
                const registros = JSON.stringify([...registrosModelos, formData])
                setRegistrosModelos(JSON.parse(registros));
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(localStorage.setItem("modelosProcessos", registros));
                    }, 300);
                })
                toast.success("Modelo salvo com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
                setFormData({} as ModeloProcessoProps)
                setEtapas([])
                setNomeEtapa("")
                setOpen(false)
            } catch (error) {
                toast.error("Erro no envio do registro!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <AlertDialog.Root open={open} onOpenChange={setOpen}>
                <AlertDialog.Trigger aria-controls="criar-processo" asChild >
                    <button className="uppercase hover:text-white hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative">Criar Modelo</button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <AlertDialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="sm-0 text-xl font-medium">
                            <div className="w-full flex justify-center flex-col mb-4">
                                <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">Criar modelo de processo</h1>
                            </div>

                        </AlertDialog.Title>
                        <AlertDialog.Cancel>
                            <button className="absolute right-2 top-2 text-white">
                                <MdOutlineClose />
                            </button>
                        </AlertDialog.Cancel>
                        <div>

                            <div className="flex flex-col gap-4">
                                <div className="relative z-0 mb-6 w-full group">
                                    <input type="text" name="titulo" onChange={handleChange} id="titulo" className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="titulo" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Título</label>
                                </div>

                                <div className="bg-gray-950 shadow-shape flex flex-1 rounded-md items-center px-4 py-4 gap-4">
                                    <div className="relative z-0 mb-6 w-full group ">
                                        <input type="text" name="nomeEtapa" onChange={(e) => setNomeEtapa(e.target.value)} id="nomeEtapa" className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                        <label htmlFor="nomeEtapa" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicione etapas</label>
                                    </div>

                                    <button onClick={() => addEtapas(nomeEtapa)} className="hover:bg-green-800 text-xs w-24 h-8 items-center flex justify-center bg-transparent border border-green-700 uppercase text-white  rounded-md">
                                        Adicionar
                                    </button>
                                </div>
                                <div className="text-white">
                                    <h1 className="text-2xl text-white flex justify-center items-center">{formData['titulo'] && <MdOutlineKeyboardDoubleArrowRight className="text-green-600 w-5 h-5" />}{formData['titulo']}</h1>
                                    <ul>
                                        {etapas.map((etapa, index) => (
                                            <li className="bg-gray-950 shadow-shape flex flex-1 rounded-md items-center py-1 px-2 justify-between" key={index}>
                                                <div className="flex gap-2 items-center">
                                                    <div className="bg-green-950 w-6 h-6 rounded-full flex items-center justify-center shadow-container">{etapa.fase}</div>
                                                    <p >{etapa.nome}</p>
                                                </div>
                                                <div>{etapa.situacao ? <MdOutlineCheckBox className="text-green-600 w-5 h-5" /> : <MdOutlineCheckBoxOutlineBlank className="text-green-600 w-5 h-5" />}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="border-t flex justify-center border-green-700 mt-4 pt-4">
                                    {loading ?
                                        <button disabled className="bg-transparent border w-full items-center justify-center flex border-green-700 uppercase text-white py-2 px-6 rounded-md"><Loader /></button>
                                        : <button onClick={() => handleSubmit()} className="hover:bg-green-800 w-full items-center flex justify-center bg-transparent border border-green-700 uppercase text-white py-2 px-6 rounded-md">Salvar Modelo</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    )
}