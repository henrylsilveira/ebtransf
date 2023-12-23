import { formataValor, retornaValorSoldo, retornaValorM3Transportado } from "@/utils/scripts";
import { adcDisp, adcHab, adcLocEsp, adcMil, cubagemVeiculo } from "@/utils/valores";
import { useState } from "react";
import { FaCarSide, FaMotorcycle } from "react-icons/fa";

export default function CalcTransferencia() {
    const [pg, setPg] = useState("")
    const [hab, setHab] = useState(0)
    const [locEsp, setLocEsp] = useState(0)
    const [mil, setMil] = useState(0)
    const [disp, setDisp] = useState(0)
    const [dist, setDist] = useState(0)
    const [cuba, setCuba] = useState(0)
    const [pgCo, setPgCO] = useState("")
    const [compOrg, setCompOrg] = useState(0)
    const [passagemAdultoValor, setPassagemAdultoValor] = useState(0)
    const [passagemAdultoQnt, setPassagemAdultoQnt] = useState(0)
    const [passagemCriancaValor, setPassagemCriancaValor] = useState(0)
    const [passagemCriancaoQnt, setPassagemCriancaQnt] = useState(0)
    const [carro, setCarro] = useState(false)
    const [moto, setMoto] = useState(false)

    return (
        <>
            <div className="fixed left-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm shadow-lg w-screen shadow-black bottom-0 p-4 z-10">
                <div className="border-2 text-xs sm:text-base border-green-600 rounded p-2 flex flex-1 items-center justify-center text-white font-bold ">Valor aproximado a receber pela transferência:
                    <p className="text-sm sm:text-xl font-extrabold pl-4">{formataValor((retornaValorSoldo(pg)! * (disp + locEsp + mil + hab) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * 4 + (passagemAdultoValor * passagemAdultoQnt) + (passagemCriancaValor * passagemCriancaoQnt) + (retornaValorM3Transportado(dist) * cuba) + (carro ? retornaValorM3Transportado(dist) * cubagemVeiculo['carro'] : 0) + (moto ? retornaValorM3Transportado(dist) * cubagemVeiculo['moto'] : 0))}</p></div>
            </div>
            <div className="border border-green-600 rounded-md p-6 relative">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Militar</h1>

                <div className="grid xl:grid-cols-3 xl:gap-6 sm:grid-cols-1 md:grid-cols-3  gap-4">
                    <div className="relative z-0 mb-6 w-full group">
                        <select name="postGrad" id="postGrad" onChange={(e) => setPg(e.target.value)} className="leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:bg-gray-900 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
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
                        <label htmlFor="postGrad" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">P/G</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <select name="habilitacao" id="habilitacao" onChange={(e) => setHab(Number(e.target.value))} className="dark:focus:bg-gray-900 focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                            <option></option>
                            {adcHab.map((adc, index) => (
                                <option key={index} value={adc}>{adc}%</option>
                            ))}
                        </select>
                        <label htmlFor="habilitacao" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Habilitação</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <select name="militar" id="militar" onChange={(e) => setMil(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 focus:bg-transparent block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                            <option></option>
                            {adcMil.map((adc, index) => (
                                <option key={index} value={adc}>{adc}%</option>
                            ))}
                        </select>
                        <label htmlFor="militar" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Militar</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <select name="disponibilidade" id="disponibilidade" onChange={(e) => setDisp(Number(e.target.value))} className="dark:focus:bg-gray-900 focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                            <option></option>
                            {adcDisp.map((adc, index) => (
                                <option key={index} value={adc}>{adc}%</option>
                            ))}
                        </select>
                        <label htmlFor="disponibilidade" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Disp</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <select name="localizacao" id="localizacao" onChange={(e) => setLocEsp(Number(e.target.value))} className="dark:focus:bg-gray-900 focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                            <option></option>
                            {adcLocEsp.map((adc, index) => (
                                <option key={index} value={adc}>{adc}%</option>
                            ))}
                        </select>
                        <label htmlFor="localizacao" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Loc Esp</label>
                    </div>

                </div>
                <div className="flex flex-col gap-4 border border-green-600 rounded-md p-4">
                    <div className="relative z-0  w-full group">
                        <select name="postGrad" id="postGrad" onChange={(e) => setPgCO(e.target.value)} className="leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
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
                        <label htmlFor="postGrad" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">P/G da Comp Org</label>
                    </div>
                    <div className="relative z-0  w-full group">
                        <input name="compOrg" id="compOrg" maxLength={3} defaultValue={0} onChange={(e) => setCompOrg(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="compOrg" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Compensação Orgânica</label>
                        <span className="text-gray-600 text-sm">Insira a porcentagem</span>
                    </div>
                </div>
                <span className="text-gray-600 text-sm">Caso não possua deixe os campos vazios.</span>
            </div>
            {/* PASSAGEM */}
            <div className="border border-green-600 rounded-md p-6 relative my-4">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Passagem</h1>

                <div className="grid xl:grid-cols-2 md:grid-cols-2 md:gap-6 xl:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="number" name="passagemAdultoValor" onChange={(e) => setPassagemAdultoValor(Number(e.target.value))} id="passagemAdultoValor" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 [appearance:textfield] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="passagemAdultoValor" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor da Passagem</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="number" name="passagemAdultoQuantidade" onChange={(e) => setPassagemAdultoQnt(Number(e.target.value))} id="passagemAdultoQuantidade" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 [appearance:textfield] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="passagemAdultoQuantidade" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adultos</label>
                    </div>

                </div>
                <div className="grid xl:grid-cols-2 md:grid-cols-2 md:gap-6 xl:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="number" name="passagemCriancaValor" onChange={(e) => setPassagemCriancaValor(Number(e.target.value))} id="passagemCriancaValor" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 [appearance:textfield] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="passagemCriancaValor" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor da Passagem</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="number" name="passagemCriancaQuantidade" onChange={(e) => setPassagemCriancaQnt(Number(e.target.value))} id="passagemCriancaQuantidade" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 [appearance:textfield] dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="passagemCriancaQuantidade" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Crianças</label>
                    </div>

                </div>
            </div>
            {/* BAGAGEM */}
            <div className="border border-green-600 rounded-md p-6 relative ">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Bagagem</h1>

                <div className="grid xl:grid-cols-2 xl:gap-6">
                    <div className="relative z-0 mb-6 w-full group">
                        <select name="bagagem" id="bagagem" onChange={(e) => setCuba(Number(e.target.value))} className="leading-tight focus:bg-gray-900 focus:bg-transparent block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                            <option></option>
                            <option value={60}>Generais 60m³</option>
                            <option value={55}>Cel/Ten Cel/Maj 55m³</option>
                            <option value={50}>Cap/1ºTen/2ºTen 50m³</option>
                            <option value={45}>Asp Of 45m³</option>
                            <option value={50}>Sub Ten/1ºSgt 50m³</option>
                            <option value={45}>2ºSgt/3ºSgt 45m³</option>
                        </select>
                        <label htmlFor="bagagem" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cubagem</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="number" name="distanciaKm" onChange={(e) => setDist(Number(e.target.value))} id="distanciaKm" className="block py-2.5 px-0 w-full [appearance:textfield] text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="distanciaKm" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Distância em KM</label>
                    </div>

                </div>
            </div>
            {/* VEICULOS */}
            <div className="border border-green-600 rounded-md p-6 relative mt-4 flex flex-1">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Veículos</h1>
                <div className="flex flex-1 justify-evenly">
                    <div className="flex items-center gap-4">
                        <label htmlFor="carro" className="text-md font-bold text-gray-200 ml-3 dark:text-gray-200 flex items-center gap-2"><FaCarSide className="text-white" />Carro</label>
                        <input type="checkbox" id="carro" onChange={(e) => setCarro(e.target.checked)} className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200" />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="moto" className="text-md font-bold text-gray-200 ml-3 dark:text-gray-200 flex items-center gap-2"><FaMotorcycle className="text-white" />Moto</label>
                        <input type="checkbox" id="moto" onChange={(e) => setMoto(e.target.checked)} className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200" />
                    </div>

                </div>
            </div>
            {/* VALORES */}
            <div className="border border-green-600 rounded-md p-6 relative mt-4">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Valores</h1>
                <div className="border border-green-600 rounded-md p-6 relative mt-4">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Soldo Bruto</h1>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Soldo</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)!)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Adc Habilitação</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * hab / 100)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Adc Militar</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * mil / 100)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Adc Loc Esp</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * locEsp / 100)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Adc Disponibilidade</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * disp / 100)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Adc Compensação Orgânica</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pgCo)! * compOrg / 100)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Valor Bruto</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * (disp + locEsp + mil + hab) / 100 + (retornaValorSoldo(pgCo)! * compOrg / 100) + retornaValorSoldo(pg)!)}</p>
                    </div>

                </div>
                <div className="border border-green-600 rounded-md p-6 relative mt-4">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Ajuda de custo</h1>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Valor Bruto x 4</b><p className="pl-4 text-white">{formataValor((retornaValorSoldo(pg)! * (disp + locEsp + mil + hab) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * 4)}</p>
                    </div>

                </div>
                <div className="border border-green-600 rounded-md p-6 relative mt-4">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Passagem</h1>
                    <div className="flex flex-1">
                        <b className="text-gray-300">{`${formataValor(passagemAdultoValor)} X ${passagemAdultoQnt}`}</b><p className="pl-4 text-white">{formataValor(passagemAdultoValor * passagemAdultoQnt)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">{`${formataValor(passagemCriancaValor)} X ${passagemCriancaoQnt}`}</b><p className="pl-4 text-white">{formataValor(passagemCriancaValor * passagemCriancaoQnt)}</p>
                    </div>
                </div>
                <div className="border border-green-600 rounded-md p-6 relative mt-4">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Bagagem</h1>
                    <div className="flex flex-1">
                        <b className="text-gray-300">{`${formataValor(retornaValorM3Transportado(dist))} X ${cuba}M³`}</b><p className="pl-4 text-white">{formataValor(retornaValorM3Transportado(dist) * cuba)}</p>
                    </div>
                </div>
                <div className="border border-green-600 rounded-md p-6 relative mt-4">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Veículo</h1>
                    <div className="flex flex-1">
                        <b className="text-gray-300">{`Automóvel: ${formataValor(retornaValorM3Transportado(dist))} X ${cubagemVeiculo['carro']}M³`}</b><p className="pl-4 text-white">{carro ? formataValor(retornaValorM3Transportado(dist) * cubagemVeiculo['carro']) : formataValor(0)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">{`Moto: ${formataValor(retornaValorM3Transportado(dist))} X ${cubagemVeiculo['moto']}M³`}</b><p className="pl-4 text-white">{moto ? formataValor(retornaValorM3Transportado(dist) * cubagemVeiculo['moto']) : formataValor(0)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}