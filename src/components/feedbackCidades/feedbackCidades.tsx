'use client'
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { api } from "@/services/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Rating from '@mui/material/Rating';
import { estados } from "@/utils/dados/cidades";
import Typography from "@mui/material/Typography";
import { Loader } from "../Loader/Loader";
import { FiPlus } from "react-icons/fi";
import { MdOutlineClose, MdPostAdd } from "react-icons/md";

const labels: { [index: string]: string } = {
    0.5: 'Ruim',
    1: 'Ruim',
    1.5: 'Baixo',
    2: 'Baixo',
    2.5: 'Médio',
    3: 'Médio',
    3.5: 'Boa',
    4: 'Boa',
    4.5: 'Excelente',
    5: 'Excelente',
};

const labelsCusto: { [index: string]: string } = {
    0.5: 'Alto',
    1: 'Alto',
    1.5: 'Médio alto',
    2: 'Médio alto',
    2.5: 'Médio',
    3: 'Médio',
    3.5: 'Médio baixo',
    4: 'Médio baixo',
    4.5: 'Baixo',
    5: 'Baixo',
};
function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
export function FeedbackCidades() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        estado: "",
        cidade: "",
        texto: "",
    });

    const [loading, setLoading] = useState(false)
    const [saude, setSaude] = useState<number | null>(0)
    const [educacao, setEducacao] = useState<number | null>(0)
    const [trabalho, setTrabalho] = useState<number | null>(0)
    const [seguranca, setSeguranca] = useState<number | null>(0)
    const [infraEstrutura, setInfraEstrutura] = useState<number | null>(0)
    const [pnr, setPnr] = useState<number | null>(0)
    const [custoVida, setCustoVida] = useState<number | null>(0)
    const [batalhao, setBatalhao] = useState<number | null>(0)


    const [hover, setHover] = useState(-1);
    const [hoverCusto, setHoverCusto] = useState(-1);
    const handleSubmit = async () => {
        if ((pnr == 0 && custoVida == 0 && batalhao == 0 && saude == 0 && educacao == 0 && trabalho == 0 && infraEstrutura == 0 && seguranca == 0) && (formData.cidade == "" && formData.estado == "")) {
            toast.info("Preencha todos os campos!", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });

        } else {
            try {
                setLoading(true)
                await api.post("/feedbackCidades", {
                    ...formData,
                    saude,
                    educacao,
                    trabalho,
                    seguranca,
                    infraEstrutura,
                    pnr,
                    custoVida,
                    batalhao,
                })
                toast.success("Enviado com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
                setLoading(false)
                setOpen(false)
            } catch (error) {
                toast.error("Erro no envio da mensagem!", {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
                setLoading(false)
            }
        }

    };
    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };




    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger asChild >
                <button className="flex shadow-container justify-center items-center h-20 border-dashed text-white/80 bg-green-900/20 hover:bg-green-600/30 border border-green-400 rounded-lg text-2xl px-2 gap-2 "><MdPostAdd />Publicar</button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-green-700 m-0 text-[17px] font-medium">
                        Criar um feedback da cidade
                    </AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <button className="absolute right-2 top-2 text-white">
                            <MdOutlineClose />
                        </button>
                    </AlertDialog.Cancel>
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="relative z-0 w-full group p-2">
                                <select name="estado" id="estado" onChange={handleChange} className="leading-tight block py-2.5 px-0 w-full text-md text-white focus:bg-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                    <option></option>
                                    {estados.map(estado =>
                                        <option key={estado.sigla} value={estado.nome}>{estado.nome} / {estado.sigla}</option>
                                    )}
                                </select>
                                <label htmlFor="estado" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado</label>
                            </div>
                            <div className="relative z-0  w-full group p-2">
                                <select name="cidade" id="cidade" onChange={handleChange} className="leading-tight block py-2.5 px-0 w-full text-md text-white focus:bg-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                    <option></option>
                                    {estados.filter(estado => estado.nome === formData.estado).map(estado =>
                                        estado.cidades.map((cidade, index) =>
                                            <option key={index} value={cidade}>{cidade}</option>
                                        ))}
                                </select>
                                <label htmlFor="cidade" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade</label>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 border border-green-600 rounded-md p-6 relative mt-4 mb-4">
                            <h1 className="left-2 -top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Análises</h1>
                            <div className="flex flex-col">
                                <Typography className="text-white" component="legend">Saúde</Typography>
                                <Rating name="size-large" precision={0.5} defaultValue={0} size="large" onChange={(event, newValue) => {
                                    setSaude(newValue);
                                }} />
                            </div>
                            <div className="flex flex-col">
                                <Typography className="text-white" component="legend">Educação</Typography>
                                <div className="flex">
                                    <Rating
                                        defaultValue={0}
                                        size="large"
                                        precision={0.5}
                                        getLabelText={getLabelText}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        name="hover-feedback"
                                        value={educacao}
                                        onChange={(event, newValue) => {
                                            setEducacao(newValue);
                                        }} />
                                    {educacao !== null && (
                                        <div className="text-white flex items-center ml-1">{labels[hover !== -1 ? hover : educacao]}</div>
                                    )}

                                </div>
                            </div>
                            <div className="flex flex-col">
                                <Typography className="text-white" component="legend">Trabalho para dependentes</Typography>
                                <Rating name="size-large" precision={0.5} defaultValue={0} size="large" onChange={(event, newValue) => {
                                    setTrabalho(newValue);
                                }} />
                            </div>
                            <div className="flex flex-col">
                                <Typography className="text-white" component="legend">Segurança pública</Typography>
                                <Rating name="size-large" precision={0.5} defaultValue={0} size="large" onChange={(event, newValue) => {
                                    setSeguranca(newValue);
                                }} />
                            </div>
                            <div className="flex flex-col">
                                <Typography className="text-white" component="legend">Infraestrutura </Typography>
                                <Rating name="size-large" precision={0.5} defaultValue={0} size="large" onChange={(event, newValue) => {
                                    setInfraEstrutura(newValue);
                                }} />
                            </div>

                            <div className="flex flex-col">
                                <Typography className="text-white" component="legend">PNR </Typography>
                                <Rating name="size-large" precision={0.5} defaultValue={0} size="large" onChange={(event, newValue) => {
                                    setPnr(newValue);
                                }} />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <Typography className="text-white" component="legend">Custo de vida</Typography>
                                    <div className="flex">
                                        <Rating
                                            defaultValue={0}
                                            size="large"
                                            precision={0.5}
                                            getLabelText={getLabelText}
                                            onChangeActive={(event, newHover) => {
                                                setHoverCusto(newHover);
                                            }}
                                            name="hover-feedback"
                                            value={custoVida}
                                            onChange={(event, newValue) => {
                                                setCustoVida(newValue);
                                            }} />
                                        {custoVida !== null && (
                                            <div className="text-white flex items-center ml-1">{labelsCusto[hoverCusto !== -1 ? hoverCusto : custoVida]}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <Typography className="text-white" component="legend">Batalhão </Typography>
                                <Rating name="size-large" precision={0.5} defaultValue={0} size="large" onChange={(event, newValue) => {
                                    setBatalhao(newValue);
                                }} />
                            </div>

                        </div>
                        <div className="relative z-0  w-full group pt-2">
                            <label htmlFor="texto" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deixe suas observações ou experiências</label>
                            <textarea name="texto" onChange={handleChange} className="dark:bg-gray-950 rounded-md p-1 dark:focus:bg-gray-950 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        </div>

                        {loading ?
                            <button disabled className="cursor-wait bg-green-600 hover:bg-green-800 flex justify-center shadow-container  px-4 py-2 text-white w-40 mx-auto rounded-md my-2 hover:shadow-inner transition-all ease-in-out"><Loader /></button>
                            : <button
                                disabled={(pnr !== 0 && custoVida !== 0 && batalhao !== 0 && saude !== 0 && educacao !== 0 && trabalho !== 0 && infraEstrutura !== 0 && seguranca !== 0) && (formData.cidade !== "" && formData.estado !== "") ? false : true}
                                onClick={() => handleSubmit()}
                                className="disabled:bg-gray-600 mx-auto cursor-pointer w-40 flex justify-center bg-green-600 hover:bg-green-800 shadow-container px-4 py-2 text-white rounded-md my-2 hover:shadow-inner transition-all ease-in-out">
                                Enviar
                            </button>}
                    </div>


                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>

    )
}