"use client";
import {
  calculaImpostoRenda,
  formataValor,
  retornaValorSoldo,
} from "@/utils/scripts";
import {
  adcHab,
  adcMil,
  adcDisp,
  adcLocEsp,
  adcPermArr,
  fusexArr,
  pensMilArr,
  gratRepArr,
  impostoRenda,
  dependenteIR,
  adcPttcArr,
  dbSoldo,
} from "@/utils/valores";
import { useState } from "react";
import { Links } from "../Links";
import Link from "next/link";
import { BsCalendar2Date } from "react-icons/bs";

export default function CalcPecuniariaComponent() {
  const year = new Date().getFullYear().toString();
  const [anoFilter, SetAnoFilter] = useState(year);

  const [pg, setPg] = useState("");
  const [pgCo, setPgCO] = useState("");
  const [hab, setHab] = useState(0);
  const [locEsp, setLocEsp] = useState(0);
  const [mil, setMil] = useState(0);
  const [disp, setDisp] = useState(0);
  const [compOrg, setCompOrg] = useState(0);
  const [adcPerm, setAdcPerm] = useState(0);
  const [adcPttc, setAdcPttc] = useState(0);

  const [tempServ, setTempServ] = useState(0);

  const [reajuste, setReajuste] = useState(false);
  const [valorReajuste, setValorReajuste] = useState(0);

  function ativarReajuste() {
    setReajuste(!reajuste);
    setValorReajuste(0);
  }

  return (
    <div className="max-w-2xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
      <div className="flex flex-1 items-center justify-center mb-6 flex-col">
        <h1 className="text-green-600 font-bold uppercase text-xl">
          Calculadora de Pecuniaria para Militares
        </h1>
        <p className="font-light text-white text-justify py-4">
          A compensação pecuniária militar, também chamada de verba
          indenizatória, é um valor pago ao militar temporário ao ser
          licenciado, correspondente a uma remuneração mensal por ano de serviço
          efetivo. O cálculo é feito com base na remuneração do militar no
          momento do licenciamento, incluindo soldo e adicionais, e exclui o
          tempo de serviço obrigatório.
        </p>
        <article className="font-light text-white text-justify py-4">
          <ul>
            <li>
              1. Identifique a remuneração: Some o soldo e todos os adicionais
              que o militar recebe no momento do licenciamento.
            </li>
            <li>
              2. Determine o tempo de serviço: Considere apenas o tempo de
              serviço efetivo, excluindo o período de serviço obrigatório e
              outras licenças ou afastamentos não considerados para a
              compensação.
            </li>
            <li>
              3. Multiplique: Multiplique o valor da remuneração pelo número de
              anos de serviço efetivo.
            </li>
          </ul>
        </article>
      </div>
      <div className="fixed left-0 bg-gray-900 backdrop-blur-sm bg-opacity-40 shadow-lg w-screen shadow-black bottom-0 p-4 z-10">
        <div className="border-2 gap-1 text-[12px] sm:text-base border-green-600 rounded p-2 flex flex-col md:flex-row items-center justify-center text-white font-bold ">
          <div className="flex">
            <p>Bruto:</p>
            <p className="font-extrabold pl-2">
              {formataValor(
                (retornaValorSoldo(pg, anoFilter, valorReajuste)! *
                  (disp + locEsp + mil + hab + adcPerm)) /
                  100 +
                  (((retornaValorSoldo(pg, anoFilter, valorReajuste)! *
                    (disp + locEsp + mil + hab + adcPerm)) /
                    100 +
                    retornaValorSoldo(pg, anoFilter, valorReajuste)! +
                    (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! *
                      compOrg) /
                      100) *
                    adcPttc) /
                    100 +
                  retornaValorSoldo(pg, anoFilter, valorReajuste)! +
                  (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! *
                    compOrg) /
                    100
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 bg-gray-950 shadow-shape mb-6 px-4 py-4 rounded-md justify-between">
        <div className="flex items-center gap-4">
          <label
            htmlFor="ativarReajuste"
            className="text-sm font-bold text-gray-200 ml-3 dark:text-gray-200 flex items-center gap-2"
          >
            Usar valor de reajuste
          </label>
          <input
            type="checkbox"
            id="ativarReajuste"
            onChange={ativarReajuste}
            className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200"
          />
        </div>
        <div className="flex items-center gap-2  px-2">
          <BsCalendar2Date className="text-gray-400 w-4 h-4" />
          <div className="relative z-0 w-full group">
            <select
              name="filteryear"
              defaultValue={anoFilter}
              onChange={(e) => SetAnoFilter(e.target.value)}
              id="filteryear"
              className="block w-28 h-6 text-sm text-white bg-gray-950 border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
            <label
              htmlFor="filteryear"
              className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-4 scale-75 top-0 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Ano
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xs:grid-cols-2">
        <div className="border border-green-600 rounded-md p-6 relative">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Receita
          </h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative z-0 w-full group">
              <select
                name="postGrad"
                id="postGrad"
                onChange={(e) => setPg(e.target.value)}
                className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
              >
                <option></option>
                {dbSoldo[anoFilter as keyof typeof dbSoldo].map((pg) => (
                  <option key={pg.codigo} value={pg.codigo}>
                    {pg.nome}
                  </option>
                ))}

                {/* <option value="sdEv">SD EV</option>
                <option value="sdEp">SD EP</option>
                <option value="cb">CB</option>
                <option value="3sgt">3º SGT</option>
                <option value="2sgt">2º SGT</option>
                <option value="1sgt">1º SGT</option>
                <option value="st">ST</option>
                <option value="aspof">ASP OF</option>
                <option value="2ten">2º TEN</option>
                <option value="1ten">1º TEN</option>
                <option value="cap">CAP</option>
                <option value="maj">MAJ</option>
                <option value="tencel">TEN CEL</option>
                <option value="cel">CEL</option>
                <option value="genBda">GEN BDA</option>
                <option value="genDiv">GEN DIV</option>
                <option value="genEx">GEN EX</option> */}
              </select>
              <label
                htmlFor="postGrad"
                className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                P/G
              </label>
              {reajuste && (
                <span className="italic text-gray-700 text-xs">
                  {formataValor(retornaValorSoldo(pg, anoFilter)!)} +{" "}
                  {valorReajuste + "%"} ={" "}
                  {formataValor(
                    retornaValorSoldo(pg, anoFilter, valorReajuste)!
                  )}
                </span>
              )}
            </div>
            {reajuste && (
              <div className="relative z-0  w-full group">
                <input
                  name="reajuste"
                  id="reajuste"
                  maxLength={3}
                  defaultValue={0}
                  onChange={(e) => setValorReajuste(Number(e.target.value))}
                  className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="reajuste"
                  className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Reajuste
                </label>
                <span className="text-gray-600 text-xs italic">
                  Insira a porcentagem. Ex: 4.5
                </span>
              </div>
            )}

            <div className="relative z-0 w-full group">
              <select
                name="habilitacao"
                id="habilitacao"
                onChange={(e) => setHab(Number(e.target.value))}
                className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
              >
                <option></option>
                {adcHab.map((adc, index) => (
                  <option key={adc + index} value={adc}>
                    {adc}%
                  </option>
                ))}
              </select>
              <label
                htmlFor="habilitacao"
                className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adicional Habilitação
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <select
                name="militar"
                id="militar"
                onChange={(e) => setMil(Number(e.target.value))}
                className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
              >
                <option></option>
                {adcMil.map((adc, index) => (
                  <option key={adc + index} value={adc}>
                    {adc}%
                  </option>
                ))}
              </select>
              <label
                htmlFor="militar"
                className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adicional Militar
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <select
                name="disponibilidade"
                defaultValue=" "
                id="disponibilidade"
                onChange={(e) => setDisp(Number(e.target.value))}
                className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
              >
                <option className="hidden"></option>
                {adcDisp.map((adc, index) => (
                  <option key={adc + index} value={adc}>
                    {adc}%
                  </option>
                ))}
              </select>
              <label
                htmlFor="disponibilidade"
                className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adicional Disp
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <select
                name="localizacao"
                id="localizacao"
                onChange={(e) => setLocEsp(Number(e.target.value))}
                className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
              >
                <option></option>
                {adcLocEsp.map((adc, index) => (
                  <option key={adc + index} value={adc}>
                    {adc}%
                  </option>
                ))}
              </select>
              <label
                htmlFor="localizacao"
                className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adicional Loc Esp
              </label>
            </div>
            {/* <div className="relative z-0 w-full group">
              <select
                name="adcPerm"
                id="adcPerm"
                onChange={(e) => setAdcPerm(Number(e.target.value))}
                className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
              >
                <option></option>
                {adcPermArr.map((adc, index) => (
                  <option key={adc + index} value={adc}>
                    {adc}%
                  </option>
                ))}
              </select>
              <label
                htmlFor="adcPerm"
                className="z-10 absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adicional Permanência
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <select
                name="adcPttc"
                id="adcPttc"
                onChange={(e) => setAdcPttc(Number(e.target.value))}
                className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
              >
                <option></option>
                {adcPttcArr.map((adc, index) => (
                  <option key={adc + index} value={adc}>
                    {adc}%
                  </option>
                ))}
              </select>
              <label
                htmlFor="adcPerm"
                className="z-10 absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Adicional PTTC
              </label>
            </div> */}
            {/* <div className="flex flex-col gap-4 border border-green-600 rounded-md p-4">
              <div className="relative z-0  w-full group">
                <select
                  name="postGrad"
                  id="postGrad"
                  onChange={(e) => setPgCO(e.target.value)}
                  className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                >
                  <option></option>
                  {dbSoldo[anoFilter as keyof typeof dbSoldo].map((pg) => (
                    <option key={pg.codigo} value={pg.codigo}>
                      {pg.nome}
                    </option>
                  ))}
                  
                </select>
                <label
                  htmlFor="postGrad"
                  className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  P/G da Comp Org
                </label>
              </div>
              <div className="relative z-0  w-full group">
                <input
                  name="compOrg"
                  id="compOrg"
                  maxLength={3}
                  defaultValue={0}
                  onChange={(e) => setCompOrg(Number(e.target.value))}
                  className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="compOrg"
                  className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Compensação Orgânica
                </label>
                <span className="text-gray-600 text-sm">
                  Insira a porcentagem
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 xs:grid-cols-2 mt-6">
        <div className="border border-green-600 rounded-md p-6 relative">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Serviço
          </h1>
          <div className="relative z-0  w-full group">
            <input
              name="tempServ"
              id="tempServ"
              maxLength={3}
              defaultValue={0}
              onChange={(e) => setTempServ(Number(e.target.value))}
              className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="tempServ"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tempo de serviço
            </label>
            <span className="text-gray-600 text-sm">
              Tempo de serviço descontando o ano de recruta
            </span>
          </div>
        </div>
      </div>

      {/* VALORES */}
      <div className="border border-green-600 rounded-md p-6 relative mt-4">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Valores
        </h1>
        <div className="border border-green-600 rounded-md p-6 relative mt-4 text-xs md:text-base">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Bruto
          </h1>
          <div className="flex flex-1">
            <b className="text-gray-300">Soldo</b>
            <p className="pl-4 text-white">
              {formataValor(retornaValorSoldo(pg, anoFilter, valorReajuste)!)}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Habilitação</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(pg, anoFilter, valorReajuste)! * hab) / 100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Militar</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(pg, anoFilter, valorReajuste)! * mil) / 100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Loc Esp</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(pg, anoFilter, valorReajuste)! * locEsp) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Disponibilidade</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(pg, anoFilter, valorReajuste)! * disp) / 100
              )}
            </p>
          </div>
          {/* <div className="flex flex-1">
            <b className="text-gray-300">Adc Compensação Orgânica</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! * compOrg) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc PTTC</b>
            <p className="pl-4 text-white">
              {formataValor(
                (((retornaValorSoldo(pg, anoFilter, valorReajuste)! *
                  (disp + locEsp + mil + hab + adcPerm)) /
                  100 +
                  retornaValorSoldo(pg, anoFilter, valorReajuste)! +
                  (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! *
                    compOrg) /
                    100) *
                  adcPttc) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Permanência</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(pg, anoFilter, valorReajuste)! * adcPerm) /
                  100
              )}
            </p>
          </div> */}

          
        </div>
      </div>

      <div className="border border-green-600 rounded-md p-6 relative mt-4">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Pecuniária
        </h1>
        <div className="flex flex-1 justify-between">
            <b className="text-gray-300 text-2xl items-end flex">Valor</b>
             <p className="font-extrabold pl-2 text-green-800 text-5xl">
              {formataValor(
                ((retornaValorSoldo(pg, anoFilter, valorReajuste)! *
                  (disp + locEsp + mil + hab + adcPerm)) /
                  100 +
                  (((retornaValorSoldo(pg, anoFilter, valorReajuste)! *
                    (disp + locEsp + mil + hab + adcPerm)) /
                    100 +
                    retornaValorSoldo(pg, anoFilter, valorReajuste)! +
                    (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! *
                      compOrg) /
                      100) *
                    adcPttc) /
                    100 +
                  retornaValorSoldo(pg, anoFilter, valorReajuste)! +
                  (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! *
                    compOrg) /
                    100) * tempServ
              )}
            </p>
          </div>
        </div>
      <Links />
    </div>
  );
}
