import {
  formataValor,
  retornaValorSoldo,
  retornaValorM3Transportado,
} from "@/utils/scripts";
import {
  adcDisp,
  adcHab,
  adcLocEsp,
  adcMil,
  cubagemVeiculo,
  dbSoldo,
} from "@/utils/valores";
import { SetStateAction, useEffect, useState } from "react";
import { FaCarSide, FaCity, FaMotorcycle, FaRegChartBar } from "react-icons/fa";
import { GiJungle } from "react-icons/gi";
import SelectCidades from "../selectCidades/SelectCidades";
import { toast } from "react-toastify";
import { api } from "@/services/axios";
import { DadosTransferencia } from "@/types/types";
import { Loader } from "../Loader/Loader";
import Link from "next/link";
import { TbClockSearch } from "react-icons/tb";
import { ModalMapaTransf } from "../modalMapaTransfe/ModalMapaTransf";
import { BsCalendar2Date } from "react-icons/bs";

export default function CalcTransferencia() {
  const year = new Date().getFullYear().toString();
  const [anoFilter, SetAnoFilter] = useState(year);
  const [pg, setPg] = useState("");
  const [hab, setHab] = useState(0);
  const [locEsp, setLocEsp] = useState(0);
  const [mil, setMil] = useState(0);
  const [disp, setDisp] = useState(0);
  const [dist, setDist] = useState(0);
  const [cuba, setCuba] = useState(0);
  const [pgCo, setPgCO] = useState("");
  const [compOrg, setCompOrg] = useState(0);
  const [passagemAdultoValor, setPassagemAdultoValor] = useState(0);
  const [passagemAdultoQnt, setPassagemAdultoQnt] = useState(0);
  const [passagemCriancaValor, setPassagemCriancaValor] = useState(0);
  const [passagemCriancaQnt, setPassagemCriancaQnt] = useState(0);
  const [carro, setCarro] = useState(false);
  const [moto, setMoto] = useState(false);
  const [especial, setEspecial] = useState(false);
  const [comum, setComum] = useState(false);

  const [estadoOrigem, setEstadoOrigem] = useState("");
  const [cidadeOrigem, setCidadeOrigem] = useState("");
  const [estadoDestino, setEstadoDestino] = useState("");
  const [cidadeDestino, setCidadeDestino] = useState("");

  const [loading, setLoading] = useState(false);
  const [transferencia, setTransferencia] = useState<DadosTransferencia[]>([]);

  const [reajuste, setReajuste] = useState(false);
  const [valorReajuste, setValorReajuste] = useState(0);

  function ativarReajuste() {
    setReajuste(!reajuste);
    setValorReajuste(0);
  }
  useEffect(() => {
    var registros = localStorage.getItem("transferencia");
    if (registros !== null) {
      setTransferencia(JSON.parse(registros));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("transferencia", JSON.stringify(transferencia));
  }, [transferencia]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/transferencia", {
        pg,
        percHabilitacao: hab,
        locEspecial: locEsp,
        percMil: mil,
        percDisp: disp,
        distancia: dist,
        cubagemDistancia: cuba,
        pgCompensacaoOrganica: pgCo,
        compensacaoOrganica: compOrg,
        passagemAdultoValor,
        passagemAdultoQnt,
        passagemCriancaValor,
        passagemCriancaQnt,
        carro,
        moto,
        especial,
        comum,
        estadoOrigem,
        estadoDestino,
        cidadeOrigem,
        cidadeDestino,
      } as DadosTransferencia);
      toast.success("Enviado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
      setTransferencia((prev) => [
        ...prev,
        {
          pg,
          percHabilitacao: hab,
          locEspecial: locEsp,
          percMil: mil,
          percDisp: disp,
          distancia: dist,
          cubagemDistancia: cuba,
          pgCompensacaoOrganica: pgCo,
          compensacaoOrganica: compOrg,
          passagemAdultoValor,
          passagemAdultoQnt,
          passagemCriancaValor,
          passagemCriancaQnt,
          carro,
          moto,
          especial,
          comum,
          estadoOrigem,
          estadoDestino,
          cidadeOrigem,
          cidadeDestino,
        },
      ]);
      setPg("");
      setHab(0);
      setLocEsp(0);
      setMil(0);
      setDisp(0);
      setDist(0);
      setCuba(0);
      setPgCO("");
      setCompOrg(0);
      setPassagemAdultoValor(0);
      setPassagemAdultoQnt(0);
      setPassagemCriancaValor(0);
      setPassagemCriancaQnt(0);
      setCarro(false);
      setMoto(false);
      setEspecial(false);
      setComum(false);
      setEstadoOrigem("");
      setCidadeOrigem("");
      setEstadoDestino("");
      setCidadeDestino("");
    } catch (error) {
      toast.error("Erro no envio da mensagem!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="fixed left-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm shadow-lg w-screen shadow-black bottom-0 p-4 z-10 hover:opacity-10">
        <div className="border-2 text-xs sm:text-base border-green-600 rounded p-2 flex flex-1 items-center justify-center text-white font-bold ">
          Valor aproximado a receber pela transferência:
          <p className="text-sm sm:text-xl font-extrabold pl-4">
          {/* {formataValor(retornaValorSoldo(pg, anoFilter)!)} */}
            {formataValor(
              ((retornaValorSoldo(pg, anoFilter, valorReajuste)! *
                (disp + locEsp + mil + hab)) /
                100 +
                retornaValorSoldo(pg, anoFilter, valorReajuste)! +
                (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! * compOrg) /
                  100) *
                (especial ? 4 : comum ? 2 : 0) +
                passagemAdultoValor * passagemAdultoQnt +
                passagemCriancaValor * passagemCriancaQnt +
                retornaValorM3Transportado(dist) * cuba +
                (carro
                  ? retornaValorM3Transportado(dist) * cubagemVeiculo["carro"]
                  : 0) +
                (moto
                  ? retornaValorM3Transportado(dist) * cubagemVeiculo["moto"]
                  : 0)
            )}
          </p>
        </div>
      </div>
      <div className="mb-6 flex justify-between">
        <Link
          href="/calculadora/minhassimulacoes"
          className="flex shadow-container gap-2 py-2 justify-center items-center px-4 text-white/80 bg-green-900/20 hover:bg-green-600/30 border border-green-400 rounded-lg "
        >
          <TbClockSearch />
          Minhas transferências
        </Link>
        <Link
          href="/calculadora/simulacoes"
          className="flex shadow-container gap-2 py-2 justify-center items-center px-4 text-white/80 bg-blue-900/20 hover:bg-blue-600/30 border border-blue-400 rounded-lg "
        >
          <FaRegChartBar />
          Análise de transferências
        </Link>
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
      <div className="border border-green-600 rounded-md p-6 relative">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Militar
        </h1>

        <div className="grid xl:grid-cols-3 xl:gap-6 sm:grid-cols-1 md:grid-cols-3  gap-4">
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
            {reajuste && (
              <span className="italic text-gray-700 text-xs">
                {formataValor(retornaValorSoldo(pg, anoFilter)!)} +{" "}
                {valorReajuste + "%"} ={" "}
                {formataValor(retornaValorSoldo(pg, anoFilter, valorReajuste)!)}
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
          <div className="relative z-0 mb-6 w-full group">
            <select
              name="habilitacao"
              id="habilitacao"
              onChange={(e) => setHab(Number(e.target.value))}
              className="dark:focus:bg-gray-900 focus:bg-gray-900 leading-tight block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            >
              <option></option>
              {adcHab.map((adc, index) => (
                <option key={index} value={adc}>
                  {adc}%
                </option>
              ))}
            </select>
            <label
              htmlFor="habilitacao"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adicional Habilitação
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
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
                <option key={index} value={adc}>
                  {adc}%
                </option>
              ))}
            </select>
            <label
              htmlFor="militar"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adicional Militar
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select
              name="disponibilidade"
              id="disponibilidade"
              onChange={(e) => setDisp(Number(e.target.value))}
              className="dark:focus:bg-gray-900 focus:bg-gray-900 leading-tight block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            >
              <option></option>
              {adcDisp.map((adc, index) => (
                <option key={index} value={adc}>
                  {adc}%
                </option>
              ))}
            </select>
            <label
              htmlFor="disponibilidade"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adicional Disp
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select
              name="localizacao"
              id="localizacao"
              onChange={(e) => setLocEsp(Number(e.target.value))}
              className="dark:focus:bg-gray-900 focus:bg-gray-900 leading-tight block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            >
              <option></option>
              {adcLocEsp.map((adc, index) => (
                <option key={index} value={adc}>
                  {adc}%
                </option>
              ))}
            </select>
            <label
              htmlFor="localizacao"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adicional Loc Esp
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 border border-green-600 rounded-md p-4">
          <div className="relative z-0  w-full group">
            <select
              name="postGrad"
              id="postGrad"
              onChange={(e) => setPgCO(e.target.value)}
              className="leading-tight block py-2.5 px-0 w-full text-md text-white focus:bg-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
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
              className="dark:focus:bg-gray-900 leading-tight block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="compOrg"
              className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Compensação Orgânica
            </label>
            <span className="text-gray-600 text-sm">Insira a porcentagem</span>
          </div>
        </div>
        <span className="text-gray-600 text-sm">
          Caso não possua deixe os campos vazios.
        </span>
      </div>

      {/* LOCAL / DESTINO */}
      <SelectCidades
        setEstadoOrigem={setEstadoOrigem}
        setEstadoDestino={setEstadoDestino}
        setCidadeOrigem={setCidadeOrigem}
        setCidadeDestino={setCidadeDestino}
        estadoOrigem={estadoOrigem}
        estadoDestino={estadoDestino}
        cidadeOrigem={cidadeOrigem}
        cidadeDestino={cidadeDestino}
      />

      {/* LOCALIDADE */}
      <div className="border border-green-600 rounded-md p-6 relative mt-4 flex flex-1">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Localidade
        </h1>
        <div className="flex flex-1 justify-evenly text-xs sm:text-base">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <label
                htmlFor="especial"
                className="text-md font-bold text-gray-200 ml-3 dark:text-gray-200 flex items-center gap-2"
              >
                <GiJungle className="text-white" />
                Gu Especial
              </label>
              <input
                type="checkbox"
                id="especial"
                onChange={(e) => setEspecial(e.target.checked)}
                className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200"
              />
            </div>
            <span className="text-gray-600">Ajuda de custo x4</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <label
                htmlFor="comum"
                className="text-md font-bold text-gray-200 ml-3 dark:text-gray-200 flex items-center gap-2"
              >
                <FaCity className="text-white" />
                Gu Comum
              </label>
              <input
                type="checkbox"
                id="comum"
                onChange={(e) => setComum(e.target.checked)}
                className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200"
              />
            </div>
            <span className="text-gray-600">Ajuda de custo x2</span>
          </div>
        </div>
      </div>
      {/* PASSAGEM */}
      <div className="border border-green-600 rounded-md p-6 relative my-4">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Passagem
        </h1>

        <div className="grid xl:grid-cols-2 md:grid-cols-2 md:gap-6 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="passagemAdultoValor"
              onChange={(e) => setPassagemAdultoValor(Number(e.target.value))}
              id="passagemAdultoValor"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 [appearance:textfield] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="passagemAdultoValor"
              className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Valor da Passagem
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="passagemAdultoQuantidade"
              onChange={(e) => setPassagemAdultoQnt(Number(e.target.value))}
              id="passagemAdultoQuantidade"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 [appearance:textfield] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="passagemAdultoQuantidade"
              className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Adultos
            </label>
          </div>
        </div>
        <div className="grid xl:grid-cols-2 md:grid-cols-2 md:gap-6 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="passagemCriancaValor"
              onChange={(e) => setPassagemCriancaValor(Number(e.target.value))}
              id="passagemCriancaValor"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 [appearance:textfield] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="passagemCriancaValor"
              className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Valor da Passagem
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="passagemCriancaQuantidade"
              onChange={(e) => setPassagemCriancaQnt(Number(e.target.value))}
              id="passagemCriancaQuantidade"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 [appearance:textfield] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="passagemCriancaQuantidade"
              className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Crianças
            </label>
          </div>
        </div>
      </div>
      {/* BAGAGEM */}
      <div className="border border-green-600 rounded-md p-6 relative ">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Bagagem
        </h1>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <select
              name="bagagem"
              id="bagagem"
              onChange={(e) => setCuba(Number(e.target.value))}
              className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            >
              <option></option>
              <option value={60}>Generais 60m³</option>
              <option value={55}>Cel/Ten Cel/Maj 55m³</option>
              <option value={50}>Cap/1ºTen/2ºTen 50m³</option>
              <option value={45}>Asp Of 45m³</option>
              <option value={50}>Sub Ten/1ºSgt 50m³</option>
              <option value={45}>2ºSgt/3ºSgt 45m³</option>
              <option value={35}>Cb 35m³</option>
              <option value={5}>Cadete/Aluno 5m³</option>
            </select>
            <label
              htmlFor="bagagem"
              className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Cubagem
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="distanciaKm"
              onChange={(e) => setDist(Number(e.target.value))}
              id="distanciaKm"
              className="block py-2.5 px-0 w-full [appearance:textfield] text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="distanciaKm"
              className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Distância em KM
            </label>
          </div>
        </div>
      </div>
      {/* VEICULOS */}
      <div className="border border-green-600 rounded-md p-6 relative mt-4 flex flex-1">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Veículos
        </h1>
        <div className="flex flex-1 justify-evenly">
          <div className="flex items-center gap-4">
            <label
              htmlFor="carro"
              className="text-md font-bold text-gray-200 ml-3 dark:text-gray-200 flex items-center gap-2"
            >
              <FaCarSide className="text-white" />
              Carro
            </label>
            <input
              type="checkbox"
              id="carro"
              onChange={(e) => setCarro(e.target.checked)}
              className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200"
            />
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="moto"
              className="text-md font-bold text-gray-200 ml-3 dark:text-gray-200 flex items-center gap-2"
            >
              <FaMotorcycle className="text-white" />
              Moto
            </label>
            <input
              type="checkbox"
              id="moto"
              onChange={(e) => setMoto(e.target.checked)}
              className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200"
            />
          </div>
        </div>
      </div>
      {/* VALORES */}
      <div className="border border-green-600 rounded-md p-6 relative mt-4">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
          Valores
        </h1>
        <div className="border border-green-600 rounded-md p-6 relative mt-4">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Soldo Bruto
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
          <div className="flex flex-1">
            <b className="text-gray-300">Adc Compensação Orgânica</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! * compOrg) /
                  100
              )}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">Valor Bruto</b>
            <p className="pl-4 text-white">
              {formataValor(
                (retornaValorSoldo(pg, anoFilter, valorReajuste)! *
                  (disp + locEsp + mil + hab)) /
                  100 +
                  (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! *
                    compOrg) /
                    100 +
                  retornaValorSoldo(pg, anoFilter, valorReajuste)!
              )}
            </p>
          </div>
        </div>
        <div className="border border-green-600 rounded-md p-6 relative mt-4">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Ajuda de custo
          </h1>
          <div className="flex flex-1">
            <b className="text-gray-300">
              Valor Bruto {especial ? "x 4" : comum ? "x 2" : "x 0"}
            </b>
            <p className="pl-4 text-white">
              {formataValor(
                ((retornaValorSoldo(pg, anoFilter, valorReajuste)! *
                  (disp + locEsp + mil + hab)) /
                  100 +
                  retornaValorSoldo(pg, anoFilter, valorReajuste)! +
                  (retornaValorSoldo(pgCo, anoFilter, valorReajuste)! *
                    compOrg) /
                    100) *
                  (especial ? 4 : comum ? 2 : 0)
              )}
            </p>
          </div>
        </div>
        <div className="border border-green-600 rounded-md p-6 relative mt-4">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Passagem
          </h1>
          <div className="flex flex-1">
            <b className="text-gray-300">{`${formataValor(
              passagemAdultoValor
            )} X ${passagemAdultoQnt}`}</b>
            <p className="pl-4 text-white">
              {formataValor(passagemAdultoValor * passagemAdultoQnt)}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">{`${formataValor(
              passagemCriancaValor
            )} X ${passagemCriancaQnt}`}</b>
            <p className="pl-4 text-white">
              {formataValor(passagemCriancaValor * passagemCriancaQnt)}
            </p>
          </div>
        </div>
        <div className="border border-green-600 rounded-md p-6 relative mt-4">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Bagagem
          </h1>
          <div className="flex flex-1">
            <b className="text-gray-300">{`${formataValor(
              retornaValorM3Transportado(dist)
            )} X ${cuba}M³`}</b>
            <p className="pl-4 text-white">
              {formataValor(retornaValorM3Transportado(dist) * cuba)}
            </p>
          </div>
        </div>
        <div className="border border-green-600 rounded-md p-6 relative mt-4">
          <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
            Veículo
          </h1>
          <div className="flex flex-1">
            <b className="text-gray-300">{`Automóvel: ${formataValor(
              retornaValorM3Transportado(dist)
            )} X ${cubagemVeiculo["carro"]}M³`}</b>
            <p className="pl-4 text-white">
              {carro
                ? formataValor(
                    retornaValorM3Transportado(dist) * cubagemVeiculo["carro"]
                  )
                : formataValor(0)}
            </p>
          </div>
          <div className="flex flex-1">
            <b className="text-gray-300">{`Moto: ${formataValor(
              retornaValorM3Transportado(dist)
            )} X ${cubagemVeiculo["moto"]}M³`}</b>
            <p className="pl-4 text-white">
              {moto
                ? formataValor(
                    retornaValorM3Transportado(dist) * cubagemVeiculo["moto"]
                  )
                : formataValor(0)}
            </p>
          </div>
        </div>
        {loading ? (
          <button
            disabled
            className="cursor-wait bg-green-600 hover:bg-green-800 flex justify-center shadow-container px-4 py-2 text-white w-full rounded-md my-2 hover:shadow-inner transition-all ease-in-out"
          >
            <Loader />
          </button>
        ) : (
          <button
            disabled={
              pg &&
              hab &&
              mil &&
              disp &&
              dist &&
              cuba &&
              passagemAdultoValor &&
              passagemAdultoQnt &&
              (especial || comum) &&
              estadoOrigem &&
              estadoDestino &&
              cidadeOrigem &&
              cidadeDestino
                ? false
                : true
            }
            onClick={() => handleSubmit()}
            className="disabled:bg-gray-600 cursor-pointer flex justify-center bg-green-600 hover:bg-green-800 shadow-container px-4 py-2 text-white w-full rounded-md my-2 hover:shadow-inner transition-all ease-in-out"
          >
            Salvar dados
          </button>
        )}
        <span className="text-gray-300 text-sm">
          Para salvar os dados é necessários que sejam preenchidos os campos
          abaixo:
        </span>
        <ul className="text-xs">
          <li className={pg ? "text-green-600" : "text-red-700"}>
            * Preencha o campo de Posto e Graduação
          </li>
          <li className={hab ? "text-green-600" : "text-red-700"}>
            * Preencha o campo de Adicional habilitação
          </li>
          <li className={mil ? "text-green-600" : "text-red-700"}>
            * Preencha o campo de Adicional militar
          </li>
          <li className={disp ? "text-green-600" : "text-red-700"}>
            * Preencha o campo de Adicional disponibilidade
          </li>
          <li className={dist ? "text-green-600" : "text-red-700"}>
            * Preencha o campo de distância entre as guarnições
          </li>
          <li className={cuba ? "text-green-600" : "text-red-700"}>
            * Preencha o campo de cubagem referente ao posto e graduação
          </li>
          <li
            className={
              passagemAdultoValor && passagemAdultoQnt
                ? "text-green-600"
                : "text-red-700"
            }
          >
            * Preencha o campo de passagem
          </li>
          <li className={especial || comum ? "text-green-600" : "text-red-700"}>
            * Preencha o campo de guarnição especial ou comum
          </li>
          <li
            className={
              estadoOrigem && estadoDestino ? "text-green-600" : "text-red-700"
            }
          >
            * Preencha o campo de estado origem e destino
          </li>
          <li
            className={
              cidadeOrigem && cidadeDestino ? "text-green-600" : "text-red-700"
            }
          >
            * Preencha o campo de cidade origem e destino
          </li>
        </ul>
      </div>
    </>
  );
}
