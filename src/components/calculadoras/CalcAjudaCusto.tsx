"use client";
import { formataValor, retornaValorSoldo } from "@/utils/scripts";
import {
  adcHab,
  adcMil,
  adcDisp,
  adcLocEsp,
  adcPermArr,
  ajudaCusto,
  reserva,
} from "@/utils/valores";
import { Links } from "../Links";
import { useState } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface calcAjudaCustoProps {
  pg: string;
  disp: number;
  locEsp: number;
  hab: number;
  mil: number;
  adcPerm: number;
  pgCo: string;
  compOrg: number;
  dependentes: number;
  ajudaCusto: {
    ida: number;
    volta: number;
    inativo?: number;
  };
}

interface calcDiferencaAjudaCustoProps {
  valores: number[];
}

export default function CalcAjudaCustoComponent() {
  const [jsonData, setJsonData] = useState<calcAjudaCustoProps>({
    pg: "",
    disp: 0,
    locEsp: 0,
    hab: 0,
    mil: 0,
    adcPerm: 0,
    pgCo: "",
    compOrg: 0,
    dependentes: 0,
    ajudaCusto: {
      ida: 0,
      volta: 0,
      inativo: 0,
    },
  } as calcAjudaCustoProps);
  const [personalizarHab, setPersonalizarHab] = useState(false);
  const [valoresDiferenca, setValoresDiferenca] = useState([] as number[]);
  const [dividir, setDividir] = useState(false);

  const [reajuste, setReajuste] = useState(false);
  const [valorReajuste, setValorReajuste] = useState(0);

  function ativarReajuste() {
    setReajuste(!reajuste);
    setValorReajuste(0);
  }
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (event.target.name === "hab" && event.target.value === "outros")
      setPersonalizarHab(false);
    if (event.target.name === "ajudaCusto") {
      const { ida, volta, inativo } = JSON.parse(event.target.value);
      setJsonData({ ...jsonData, ajudaCusto: { ida, volta, inativo } });
    } else {
      setJsonData({ ...jsonData, [event.target.name]: event.target.value });
    }
  }

  function registrarValor(number: number) {
    setValoresDiferenca([...valoresDiferenca, number]);
  }
  return (
    <div className="max-w-4xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
      <div className="flex flex-1 items-center justify-center mb-6 flex-col">
        <h1 className="text-green-600 font-bold uppercase text-xl">
          Calculadora de Ajuda de Custo para Militares
        </h1>
        <p className="font-light text-white text-justify py-4">
          Essa calculadora tem como objetivo auxiliar o militar a calcular sua
          ajuda de custo de forma aproximada e não se trata de uma ferramenta
          oficial.
        </p>
      </div>
      <div className="flex flex-1 bg-gray-950 shadow-shape mb-6 px-4 py-2 rounded-md">
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
      </div>
      {/* VALOR BRUTO FOOTER */}
      <div className="fixed left-0 bg-gray-900 backdrop-blur-sm bg-opacity-40 shadow-lg w-screen shadow-black bottom-0 p-4 z-10">
        <div className="border-2 gap-1 text-[12px] sm:text-base border-green-600 rounded p-2 flex flex-1 items-center justify-center text-white font-bold ">
          <div className="flex">
            <p>Bruto:</p>
            <p className="font-extrabold pl-2">
              {formataValor(
                (retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  (Number(jsonData.disp) +
                    Number(jsonData.locEsp) +
                    Number(jsonData.mil) +
                    Number(jsonData.hab) +
                    Number(jsonData.adcPerm))) /
                  100 +
                  retornaValorSoldo(jsonData.pg, valorReajuste)! +
                  (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                    jsonData.compOrg) /
                    100
              )}
            </p>
          </div>
          {!jsonData.ajudaCusto.inativo ? (
            <p className="pl-4 text-white flex gap-2">
              <span>Total:</span>
              {formataValor(
                ((retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  (Number(jsonData.disp) +
                    Number(jsonData.locEsp) +
                    Number(jsonData.mil) +
                    Number(jsonData.hab) +
                    Number(jsonData.adcPerm))) /
                  100 +
                  retornaValorSoldo(jsonData.pg, valorReajuste)! +
                  (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                    Number(jsonData.compOrg)) /
                    100) *
                  Number(jsonData.ajudaCusto.ida) +
                  ((retornaValorSoldo(jsonData.pg, valorReajuste)! *
                    (Number(jsonData.disp) +
                      Number(jsonData.locEsp) +
                      Number(jsonData.mil) +
                      Number(jsonData.hab) +
                      Number(jsonData.adcPerm))) /
                    100 +
                    retornaValorSoldo(jsonData.pg, valorReajuste)! +
                    (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                      Number(jsonData.compOrg)) /
                      100) *
                    Number(jsonData.ajudaCusto.volta)
              )}
            </p>
          ) : (
            <p className="pl-4 text-white flex gap-2">
              <span className="text-gray-400">Inatividade:</span>
              {formataValor(
                ((retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  (Number(jsonData.disp) +
                    Number(jsonData.locEsp) +
                    Number(jsonData.mil) +
                    Number(jsonData.hab) +
                    Number(jsonData.adcPerm))) /
                  100 +
                  retornaValorSoldo(jsonData.pg, valorReajuste)! +
                  (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                    Number(jsonData.compOrg)) /
                    100) *
                  Number(jsonData.ajudaCusto.inativo)
              )}
            </p>
          )}
        </div>
      </div>

      <div className="border flex flex-1 w-full flex-col border-green-600 rounded-md p-6 relative">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Receita
        </h1>
        <div className="grid sm:grid-cols-2 grid-cols-2 gap-4">
          <div className="relative z-0 w-full group">
            <select
              name="pg"
              id="pg"
              onChange={(e) => handleChange(e)}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            >
              <option></option>
              <option value="sdEv">SD EV</option>
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
              <option value="genEx">GEN EX</option>
            </select>
            <label
              htmlFor="pg"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              P/G
            </label>
            {reajuste && (
                 <span className="italic text-gray-700 text-xs">{formataValor(retornaValorSoldo(jsonData.pg)!)} + {valorReajuste + "%"} = {formataValor(retornaValorSoldo(jsonData.pg, valorReajuste)!)}</span> 
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
              name="hab"
              id="hab"
              onChange={(e) =>
                e.target.value === "outros"
                  ? setPersonalizarHab(true)
                  : handleChange(e)
              }
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
              <option value={"outros"}>Outros valores</option>
            </select>

            <label
              htmlFor="hab"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adicional Habilitação
            </label>
          </div>
          {personalizarHab && (
            <div className="relative z-0  w-full group">
              <input
                name="hab"
                id="hab"
                maxLength={3}
                defaultValue={0}
                onChange={(e) => handleChange(e)}
                className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="hab"
                className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Outra habilitação
              </label>
            </div>
          )}
          <div className="relative z-0 w-full group">
            <select
              name="mil"
              id="mil"
              onChange={(e) => handleChange(e)}
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
              htmlFor="mil"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adicional Militar
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <select
              name="disp"
              defaultValue=" "
              id="disp"
              onChange={(e) => handleChange(e)}
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
              htmlFor="disp"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adicional Disp
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <select
              name="locEsp"
              id="locEsp"
              onChange={(e) => handleChange(e)}
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
              htmlFor="locEsp"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adicional Loc Esp
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <select
              name="adcPerm"
              id="adcPerm"
              onChange={(e) => handleChange(e)}
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
          <div className="relative z-0  w-full group">
            <input
              name="dependentes"
              id="dependentes"
              maxLength={3}
              defaultValue={0}
              onChange={(e) => handleChange(e)}
              className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="dependentes"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Dependentes
            </label>
          </div>
          <div className="flex flex-col gap-y-6 border border-green-600 rounded-md p-4">
            <div className="relative z-0  w-full group">
              <select
                name="pgCo"
                id="pgCo"
                onChange={(e) => handleChange(e)}
                className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                required
              >
                <option></option>
                <option value="sdEv">SD EV</option>
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
                <option value="genEx">GEN EX</option>
              </select>
              <label
                htmlFor="pgCo"
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
                onChange={(e) => handleChange(e)}
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
          </div>
        </div>
      </div>
      <article>
        <h1
          id="#distCubagem"
          className="text-green-600 mt-6 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center"
        >
          <MdOutlineKeyboardDoubleArrowRight className="text-green-600 pr-1 text-2xl" />
          Ajuda de Custo
        </h1>
        <div className="text-xs sm:text-md flex flex-col justify-center relative overflow-x-auto shadow-container sm:rounded-lg mt-4">
          <table className="w-100 sm:w-full text-left text-gray-400">
            <thead className=" uppercase text-gray-400">
              <tr>
                <th scope="col" className="w-6 text-center text-white"></th>
                <th
                  scope="col"
                  className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white"
                >
                  Situação
                </th>
                <th
                  scope="col"
                  className="px-1 sm:px-6 py-3 text-center text-white"
                >
                  Ida
                </th>
                <th
                  scope="col"
                  className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white"
                >
                  Volta
                </th>
              </tr>
            </thead>
            <tbody>
              {ajudaCusto.map((custo, index) => (
                <tr
                  key={custo + `${index}`}
                  className="border-b border-gray-700"
                >
                  <td className="text-center">
                    <div className="flex items-center px-4">
                      <input
                        id="ajudaCusto"
                        onChange={(e) => handleChange(e)}
                        type="radio"
                        value={JSON.stringify({
                          ida: custo.ida,
                          volta: custo.volta,
                        })}
                        name="ajudaCusto"
                        className="w-4 h-4"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center bg-gray-800">
                    {custo.situacao}
                  </td>
                  <td className="px-6 py-4 text-center">x{custo.ida}</td>
                  <td className="px-6 py-4 text-center bg-gray-800">
                    x{custo.volta}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="col" className="text-center text-white"></th>
                <th
                  scope="col"
                  className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white"
                >
                  Situação
                </th>
                <th
                  scope="col"
                  className="px-1 sm:px-6 py-3 text-center text-white"
                >
                  Oficial
                </th>
                <th
                  scope="col"
                  className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white"
                >
                  Praça
                </th>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="text-center">
                  <div className="flex items-center px-4">
                    <input
                      id="ajudaCusto"
                      onChange={(e) => handleChange(e)}
                      type="radio"
                      value={JSON.stringify({ inativo: reserva.tipo2 })}
                      name="ajudaCusto"
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-center bg-gray-800">
                  {reserva.situacao}
                  {reserva.condicao}
                </td>
                <td className="px-6 py-4 text-center">x{reserva.tipo1}</td>
                <td className="px-6 py-4 text-center bg-gray-800">
                  x{reserva.tipo2}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <span className="text-xs text-gray-600 italic m-2 text-center">
              *LEI Nº 13.954, DE 16 DE DEZEMBRO DE 2019.
            </span>
          </div>
        </div>
      </article>

      {/* VALORES */}
      <div className="border border-green-600 rounded-md p-6 relative mt-8">
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
              {formataValor(retornaValorSoldo(jsonData.pg, valorReajuste)!)}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Habilitação</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  Number(jsonData.hab)) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Militar</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  Number(jsonData.mil)) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Loc Esp</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  Number(jsonData.locEsp)) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Disponibilidade</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  Number(jsonData.disp)) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Compensação Orgânica</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                  Number(jsonData.compOrg)) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Permanência</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  Number(jsonData.adcPerm)) /
                  100
              )}
            </p>
          </div>

          <div className="flex flex-1">
            <b className="text-gray-300">Salário Fámilia:</b>
            <p className="pl-2 text-white">
              {formataValor(jsonData.dependentes * 0.16)}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Valor Bruto</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(jsonData.pg, valorReajuste)! *
                  (Number(jsonData.disp) +
                    Number(jsonData.locEsp) +
                    Number(jsonData.mil) +
                    Number(jsonData.hab) +
                    Number(jsonData.adcPerm))) /
                  100 +
                  retornaValorSoldo(jsonData.pg, valorReajuste)! +
                  (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                    Number(jsonData.compOrg)) /
                    100
              )}
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <b className="text-gray-300">Ajuda de Custo</b>
            {!jsonData.ajudaCusto.inativo ? (
              <>
                <p className="pl-4 text-white flex gap-2">
                  <span className="text-gray-400">Ida:</span>
                  {formataValor(
                    ((retornaValorSoldo(jsonData.pg, valorReajuste)! *
                      (Number(jsonData.disp) +
                        Number(jsonData.locEsp) +
                        Number(jsonData.mil) +
                        Number(jsonData.hab) +
                        Number(jsonData.adcPerm))) /
                      100 +
                      retornaValorSoldo(jsonData.pg, valorReajuste)! +
                      (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                        Number(jsonData.compOrg)) /
                        100) *
                      Number(jsonData.ajudaCusto.ida)
                  )}
                </p>
                <p className="pl-4 text-white flex gap-2">
                  <span className="text-gray-400">Volta:</span>
                  {formataValor(
                    ((retornaValorSoldo(jsonData.pg, valorReajuste)! *
                      (Number(jsonData.disp) +
                        Number(jsonData.locEsp) +
                        Number(jsonData.mil) +
                        Number(jsonData.hab) +
                        Number(jsonData.adcPerm))) /
                      100 +
                      retornaValorSoldo(jsonData.pg, valorReajuste)! +
                      (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                        Number(jsonData.compOrg)) /
                        100) *
                      Number(jsonData.ajudaCusto.volta)
                  )}
                </p>
              </>
            ) : (
              <p className="pl-4 text-white flex gap-2">
                <span className="text-gray-400">Inatividade:</span>
                {formataValor(
                  ((retornaValorSoldo(jsonData.pg, valorReajuste)! *
                    (Number(jsonData.disp) +
                      Number(jsonData.locEsp) +
                      Number(jsonData.mil) +
                      Number(jsonData.hab) +
                      Number(jsonData.adcPerm))) /
                    100 +
                    retornaValorSoldo(jsonData.pg, valorReajuste)! +
                    (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                      Number(jsonData.compOrg)) /
                      100) *
                    Number(jsonData.ajudaCusto.inativo)
                )}
              </p>
            )}
          </div>
        </div>
        <div className="border border-green-600 rounded-md p-6 relative mt-4 text-xs md:text-base">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Calcular diferença
          </h1>
          <div className="flex gap-2">
            <button
              className="bg-green-600 ml-auto hover:bg-green-800 text-white px-4 py-1 shadow-shape rounded-full text-xs"
              onClick={() =>
                registrarValor(
                  ((retornaValorSoldo(jsonData.pg, valorReajuste)! *
                    (Number(jsonData.disp) +
                      Number(jsonData.locEsp) +
                      Number(jsonData.mil) +
                      Number(jsonData.hab) +
                      Number(jsonData.adcPerm))) /
                    100 +
                    retornaValorSoldo(jsonData.pg, valorReajuste)! +
                    (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                      Number(jsonData.compOrg)) /
                      100) *
                    Number(jsonData.ajudaCusto.ida) +
                    ((retornaValorSoldo(jsonData.pg, valorReajuste)! *
                      (Number(jsonData.disp) +
                        Number(jsonData.locEsp) +
                        Number(jsonData.mil) +
                        Number(jsonData.hab) +
                        Number(jsonData.adcPerm))) /
                      100 +
                      retornaValorSoldo(jsonData.pg, valorReajuste)! +
                      (retornaValorSoldo(jsonData.pgCo, valorReajuste)! *
                        Number(jsonData.compOrg)) /
                        100) *
                      Number(jsonData.ajudaCusto.volta)
                )
              }
            >
              Gravar valor
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-800 text-white px-4 py-1 shadow-shape rounded-full text-xs"
              onClick={() => setValoresDiferenca([])}
            >
              Apagar
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-1 shadow-shape rounded-full text-xs"
              onClick={() => setDividir(!dividir)}
            >
              / 2
            </button>
          </div>
          <div className="flex flex-wrap justify-center my-6">
            {valoresDiferenca &&
              valoresDiferenca.map((value, index) => (
                <p className="pl-4 text-white text-xl sm:text-3xl">
                  {formataValor(value)}{" "}
                  {!(valoresDiferenca.length - 1 === index) && "-"}{" "}
                </p>
              ))}
          </div>
          {valoresDiferenca.length > 1 && (
            <div className="flex justify-between items-center">
              <p className="uppercase text-lg text-white">
                Diferença entre valores:{" "}
              </p>
              <p className="text-green-500 text-3xl">
                {valoresDiferenca.length > 1 &&
                  formataValor(
                    dividir
                      ? (valoresDiferenca.reduce(function (acc, value) {
                          return value - acc;
                        }, 0) *
                          -1) /
                          2
                      : valoresDiferenca.reduce(function (acc, value) {
                          return value - acc;
                        }, 0) * -1
                  )}
              </p>
            </div>
          )}
        </div>
      </div>
      <Links />
    </div>
  );
}
