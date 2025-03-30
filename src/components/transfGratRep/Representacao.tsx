import { formataValor, retornaValorSoldo } from "@/utils/scripts";
import { dbSoldo, gratRepArr } from "@/utils/valores";
import { useState } from "react";

export default function CalcRepresentacao() {
  const year = new Date().getFullYear().toString();
  const [anoFilter, SetAnoFilter] = useState(year);
  const [pg, setPg] = useState("");
  const [gratRep, setGratRep] = useState(0);
  const [qntDias, setQntDias] = useState(0);

  return (
    <>
      <div className="fixed left-0 bg-gray-900 opacity-80 shadow-lg w-screen shadow-black bottom-0 p-4 z-10">
        <div className="border-2 border-green-600 rounded p-2 flex flex-1 items-center justify-center text-white font-bold text-lg">
          Valor aproximado a receber pela Grat Rep:
          <p className="text-xl font-extrabold pl-4">
            {formataValor(
              ((retornaValorSoldo(pg, anoFilter)! * gratRep) / 100) * qntDias
            )}
          </p>
        </div>
      </div>
      <div className="border border-green-600 rounded-md p-6 relative">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          BASE DE CÁLCULO
        </h1>
        <div className="grid xl:grid-cols-3 xl:gap-6 sm:grid-cols-1 gap-4">
          <div className="relative z-0 mb-6 w-full group">
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
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              P/G
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select
              name="gratRep"
              id="gratRep"
              onChange={(e) => setGratRep(Number(e.target.value))}
              className=" text-white focus:text-white leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            >
              <option></option>
              {gratRepArr.map((grat, index) => (
                <option key={grat + index} value={grat}>
                  {grat}%
                </option>
              ))}
            </select>
            <label
              htmlFor="gratRep"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Grat Rep
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="qntDias"
              onChange={(e) => setQntDias(Number(e.target.value))}
              id="qntDias"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="qntDias"
              className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Qnt de Dias
            </label>
          </div>
        </div>
      </div>

      {/* VALORES */}
      <div className="border border-green-600 rounded-md p-6 relative mt-4">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Valores
        </h1>
        <div className="flex flex-1">
          <b className="text-gray-300">Soldo</b>
          <p className="pl-4 text-white">
            {formataValor(retornaValorSoldo(pg, anoFilter)!)}
          </p>
        </div>
        <div className="flex flex-1">
          <b className="text-gray-300">{gratRep + "% do soldo:"}</b>
          <p className="pl-4 text-white">
            {formataValor((retornaValorSoldo(pg, anoFilter)! * gratRep) / 100)}
          </p>
        </div>
        <div className="flex flex-1">
          <b className="text-gray-300">Dias:</b>
          <p className="pl-4 text-white">{qntDias}</p>
        </div>
        <div className="flex flex-1">
          <b className="text-gray-300">Total:</b>
          <p className="pl-4 text-white">
            {formataValor(
              ((retornaValorSoldo(pg, anoFilter)! * gratRep) / 100) * qntDias
            )}
          </p>
        </div>
      </div>
    </>
  );
}
