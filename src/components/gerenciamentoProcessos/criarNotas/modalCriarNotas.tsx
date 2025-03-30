"use client";
import { Loader } from "@/components/Loader/Loader";
import { ModeloNota, ModeloProcessoProps } from "@/types/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import saveAs from "file-saver";
import { SetStateAction, useEffect, useState } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineClose,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineMoreHoriz,
} from "react-icons/md";
import { toast } from "react-toastify";
import * as Accordion from "@radix-ui/react-accordion";
import * as Popover from "@radix-ui/react-popover";
import { NotData } from "@/components/NotData";
import { BsTrash3 } from "react-icons/bs";
import DropdownModelosProcessos from "../criarProcessos/dropdownModelosProcessos";
export default function ModalCriarNotas({
  modelosNotas,
  setModelosNotas,
}: {
  modelosNotas: ModeloNota[];
  setModelosNotas: React.Dispatch<SetStateAction<ModeloNota[]>>;
}) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ModeloNota>({} as ModeloNota);

  useEffect(() => {
    var registros = localStorage.getItem("modelosNotas");
    if (registros !== null) {
      setModelosNotas(JSON.parse(registros));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("modelosNotas", JSON.stringify(modelosNotas));
  }, [modelosNotas]);

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

  async function handleSubmit() {
    setLoading(true);
    if (
      formData.subTitulo !== "" ||
      formData.titulo !== "" ||
      formData.conteudo !== ""
    ) {
      toast.info("Preencha todos os campos!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
      setLoading(false);
    } else {
      try {
        const DateNow = Date.now()
        const DateTypeNow = new Date(DateNow)
        const data = DateTypeNow.toLocaleDateString("pt-BR");

        const registros = JSON.stringify([...modelosNotas, {...formData  }]);
        setModelosNotas(JSON.parse(registros));
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(localStorage.setItem("modelosNotas", registros));
          }, 300);
        });
        toast.success("Modelo salvo com sucesso!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
        setFormData({} as ModeloNota);
        setOpen(false);
      } catch (error) {
        toast.error("Erro no envio do registro!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
      }
      setLoading(false);
    }
  }

  function baixarModelos() {
    setLoading(true);
    var fileName = `${
      new Date().toLocaleString() + "-" + "modeloNotas"
    }.ebcalcP`;

    // Create a blob of the data
    var fileToSave = new Blob([JSON.stringify(modelosNotas)], {
      type: "application/ebcalcN",
    });

    // Save the file
    saveAs(fileToSave, fileName);
    setLoading(false);
  }

  function importarModelos(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    if (e.target.files !== null) {
      var reader = new FileReader();
      const files = e.target.files[0];
      reader.onload = logFile;
      reader.readAsText(files);
    }
    function logFile(e: any) {
      setModelosNotas(JSON.parse(e.target.result));
    }
    try {
      const registros = JSON.stringify([...modelosNotas]);
      setModelosNotas(JSON.parse(registros));
      async () =>
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(localStorage.setItem("modelosProcessos", registros));
          }, 300);
        });
      toast.success("Modelos de processos importados com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Erro na importação!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
    }
    setLoading(false);
  }

  return (
    <div>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger aria-controls="criar-processo" asChild>
          <button
            id="criarNota"
            className="uppercase hover:text-white hover:after:w-full after:w-0 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-green-500 after:duration-500 transition-all duration-500 items-center relative"
          >
            Criar Modelo
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <AlertDialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <AlertDialog.Title className="sm-0 text-xl font-medium">
              <div className="w-full flex mb-4 justify-center gap-2">
                <h1 className="text-green-600 font-bold uppercase text-2xl mb-2">
                  Criar modelo de nota
                </h1>
                <Popover.Root>
                  <Popover.Trigger aria-controls="deletar-processo">
                    <button className="bg-gray-950 hover:bg-black border-1 border-green-900 h-8 text-white text-xs uppercase py-1 px-2 rounded-full shadow-shape">
                      <MdOutlineMoreHoriz className="w-6 h-6 text-green-900" />
                    </button>
                  </Popover.Trigger>
                  <Popover.Content className="bg-gray-950 p-2 rounded-md shadow-shape flex justify-center flex-col z-10">
                    <div className="py-2 gap-2 flex flex-col flex-1">
                      <Accordion.Root
                        type="single"
                        className="rounded-md px-3 text-gray-400 gap-2 overflow-y-auto h-auto"
                        collapsible
                      >
                        <Accordion.AccordionItem value="item-1">
                          <button
                            onClick={baixarModelos}
                            className=" text-white hover:text-gray-400 text-xs uppercase py-1 px-2 rounded"
                          >
                            Exportar Modelos
                          </button>
                        </Accordion.AccordionItem>
                        <Accordion.AccordionItem value="item-3">
                          <label htmlFor="fileRegistros">
                            <input
                              id="fileRegistros"
                              accept=".ebcalcN"
                              className="hidden "
                              onChange={importarModelos}
                              type="file"
                            />
                            <p className=" cursor-pointer text-white hover:text-gray-400 text-xs uppercase py-1 px-2 rounded">
                              Importar Modelos
                            </p>
                          </label>
                        </Accordion.AccordionItem>
                      </Accordion.Root>
                    </div>
                    <Popover.Close />
                    <Popover.Arrow className="fill-[#192132]" />
                  </Popover.Content>
                </Popover.Root>
              </div>
            </AlertDialog.Title>
            <AlertDialog.Cancel>
              <button className="absolute right-2 top-2 text-white">
                <MdOutlineClose />
              </button>
            </AlertDialog.Cancel>
            <div>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-950 shadow-shape flex flex-1 flex-col rounded-md items-center py-4 px-2">
                  <div className="relative z-0 mb-6 w-full group ">
                    <input
                      type="text"
                      name="titulo"
                      onChange={handleChange}
                      id="titulo"
                      className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:bg-transparent focus:ring-0 focus:border-green-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="titulo"
                      className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Título
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group ">
                    <input
                      type="text"
                      name="subTitulo"
                      onChange={handleChange}
                      id="subTitulo"
                      className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="subTitulo"
                      className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Sub Título
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group ">
                    <textarea
                      rows={4}
                      name="conteudo"
                      onChange={handleChange}
                      id="conteudo"
                      className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="conteudo"
                      className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Conteúdo
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group ">
                    <textarea
                      rows={4}
                      name="encerramento"
                      onChange={handleChange}
                      id="encerramento"
                      className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="encerramento"
                      className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Encerramento
                    </label>
                  </div>
                </div>
                
                <div className=" flex justify-center mt-4 pt-4">
                  {loading ? (
                    <button
                      disabled
                      className="bg-transparent border w-full items-center justify-center flex border-green-700 uppercase text-white py-2 px-6 rounded-md"
                    >
                      <Loader />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubmit()}
                      className="hover:bg-green-800 w-full items-center flex justify-center bg-transparent border border-green-700 uppercase text-white py-2 px-6 rounded-md"
                    >
                      Salvar Modelo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
