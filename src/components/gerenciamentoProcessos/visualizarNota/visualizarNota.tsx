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
import { FaEye } from "react-icons/fa";
export default function VisualizarNota({
  modeloNota,
}: {
  modeloNota: ModeloNota;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger aria-controls="criar-processo" asChild>
          <div className="p-2 shadow-container shadow-container transition ease-in-out duration-500 bg-gray-950 border border-green-950 rounded-md">
            <FaEye className="w-4 h-4 text-white hover:text-green-600 cursor-pointer" />
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <AlertDialog.Content className="data-[state=open]:animate-contentShow overflow-y-auto fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-backgroundColor border border-green-700 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <AlertDialog.Title className="sm-0 text-xl font-medium">
              <div className="w-full flex mb-4 justify-center gap-2">
                <h1 className="text-green-600 font-bold uppercase text-2xl mb-1">
                  Nota
                </h1>
              </div>
            </AlertDialog.Title>
            <AlertDialog.Cancel>
              <button className="absolute right-2 top-2 text-white">
                <MdOutlineClose />
              </button>
            </AlertDialog.Cancel>

            <div className="flex flex-col gap-2">
              <div className="bg-gray-950 shadow-shape flex flex-1 flex-col rounded-md py-4 px-4">
                <h1 className="text-green-600 text-2xl font-bold uppercase">
                  {modeloNota.titulo}
                </h1>
                <h2 className="text-gray-600 mb-2 border-b pb-2 border-b-green-950">
                  {modeloNota.subTitulo}
                </h2>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-400 border-b border-b-green-950 py-2">
                    {modeloNota.conteudo}
                  </p>
                  <p className="text-gray-400">{modeloNota.encerramento}</p>
                </div>
              </div>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
