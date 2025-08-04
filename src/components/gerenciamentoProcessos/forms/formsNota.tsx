"use client";

import { dbSoldo } from "@/utils/valores";
import { useState } from "react";

export default function FormsNota({ userId }: { userId: string }) {
  const [formData, setFormData] = useState({
    id: "",
    nomeCurso: "",
    nomeToken: "",
    token: "",
  });

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
    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xs:grid-cols-2">
      <div className="border border-green-600 rounded-md p-6 relative">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Informações
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative z-0 w-full group">
            <input
              name="dataDiex"
              id="dataDiex"
              type="date"
              onChange={handleChange}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="dataDiex"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Data do DIEx
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              name="dataEntrada"
              id="dataEntrada"
              type="date"
              onChange={handleChange}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="dataEntrada"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Data de entrada
            </label>
          </div>
          
          <div className="relative z-0 w-full group">
            <input
              name="remetente"
              id="remetente"
              onChange={handleChange}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="remetente"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              De:
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              name="nup"
              id="nup"
              onChange={handleChange}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="nup"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              NUP
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <select
              name="postGrad"
              id="postGrad"
              onChange={handleChange}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            >
              <option></option>
              {dbSoldo["2025" as keyof typeof dbSoldo].map((pg) => (
                <option key={pg.codigo} value={pg.codigo}>
                  {pg.nome}
                </option>
              ))}
            </select>
            <label
              htmlFor="postGrad"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              P/G
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              name="nome"
              id="nome"
              onChange={handleChange}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="nome"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nome completo
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              name="motivo"
              id="motivo"
              onChange={handleChange}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="motivo"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Motivo
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              name="boldcem"
              id="boldcem"
              onChange={handleChange}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="boldcem"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Boletim DCEM
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
