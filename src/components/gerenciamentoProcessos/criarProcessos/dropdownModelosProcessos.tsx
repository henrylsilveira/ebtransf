"use client";
import { ModeloProcessoProps } from "@/types/types";
import * as Accordion from "@radix-ui/react-accordion";
import * as Popover from "@radix-ui/react-popover";
import { CiWarning } from "react-icons/ci";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

import { NotData } from "@/components/NotData";
import { returnProgressBarValue } from "@/utils/scripts";
import { BsTrash3 } from "react-icons/bs";
export default function DropdownModelosProcessos({
  modelos,
  setModelos,
}: {
  modelos: ModeloProcessoProps[];
  setModelos: React.Dispatch<React.SetStateAction<ModeloProcessoProps[]>>;
}) {
  async function handleDeleteProcess(id: string) {
    try {
      if (modelos.length === 0)
        return toast.error("Nenhum processo encontrado!", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
      setModelos(modelos.filter((modelos) => modelos.id !== id));
      toast.success("Processo deletado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Erro durante a operação!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
    }
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger aria-controls="deletar-processo">
          <button className=" text-white hover:text-gray-400 text-xs uppercase py-1 px-2 rounded">
            Deletar Modelos
          </button>
        </Popover.Trigger>
        <Popover.Content className="bg-gray-900 z-10 p-2 rounded-md shadow-shape flex justify-center flex-col ">
          <div className="py-2 gap-2 flex flex-col flex-1">
            <div className="flex flex-col gap-2 mb-2">
              <h1 className="flex justify-center uppercase font-semibold border-b text-white border-green-800">
                Deletar Modelos
              </h1>
            </div>
            {modelos?.length === 0 ? (
              <NotData textoComponent="Nenhum processo encontrado." />
            ) : (
              <Accordion.Root
                type="single"
                className="rounded-md px-3 text-gray-400 flexgap-1 shadow-shape overflow-y-auto h-auto"
                collapsible
              >
                {modelos.map((modelos, index) => (
                  <Accordion.AccordionItem
                    value={modelos.id}
                    key={index + modelos.id}
                    className="border-b relative last:border-none border-green-800 py-3"
                  >
                    <Accordion.AccordionHeader className="flex relative">
                      <div className="text-gray-400 w-full flex items-center justify-between text-xs">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <MdOutlineKeyboardDoubleArrowRight className="text-green-600 w-4 h-4" />
                            <h1 className="uppercase font-bold">
                              {modelos.titulo}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </Accordion.AccordionHeader>
                    <button
                      onClick={() => handleDeleteProcess(modelos.id)}
                      className="absolute shadow-shape hover:bg-red-900 right-0 top-2 bg-red-800 rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <BsTrash3 className="w-3 h-3 text-white" />
                    </button>
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
