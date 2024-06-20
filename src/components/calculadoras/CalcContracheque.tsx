'use client'
import { calculaImpostoRenda, formataValor, retornaValorSoldo } from "@/utils/scripts"
import { adcHab, adcMil, adcDisp, adcLocEsp, adcPermArr, fusexArr, pensMilArr, gratRepArr, impostoRenda, dependenteIR } from "@/utils/valores"
import { useState } from "react"
import { Links } from "../Links"
import Link from "next/link"

export default function CalcContraChequeComponent() {
    const [pg, setPg] = useState("")
    const [pgCo, setPgCO] = useState("")
    const [hab, setHab] = useState(0)
    const [locEsp, setLocEsp] = useState(0)
    const [mil, setMil] = useState(0)
    const [disp, setDisp] = useState(0)
    const [compOrg, setCompOrg] = useState(0)
    const [adcPerm, setAdcPerm] = useState(0)

    const [gratRep, setGratRep] = useState(0)
    const [qntDias, setQntDias] = useState(0)

    const [pMil, setPMil] = useState(0)
    const [pnr, setPnr] = useState("")
    const [fusex, setFusex] = useState(0)
    const [pensAlim, setPensAlim] = useState(0)
    const [dependentes, setDependentes] = useState(0)
    return (
        <div className="max-w-2xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
            <div className="flex flex-1 items-center justify-center mb-6 flex-col">
                <h1 className="text-green-600 font-bold uppercase text-xl">Calculadora do Contracheque para Militares</h1>
                <p className="font-light text-white text-justify py-4">Essa calculadora tem como objetivo auxiliar o militar a calcular seu contracheque de forma aproximada e não se trata de uma ferramenta oficial.</p>
                <article className="font-light text-white text-justify py-4">
                    Para calcular o contracheque militar, você geralmente precisa considerar o seguinte:
                    <ul>
                        <li>Soldo Base: O soldo base é o valor fundamental do salário do militar e varia de acordo com a graduação e o tempo de serviço. Quanto maior a graduação e o tempo de serviço, maior será o soldo base.</li>
                        <li>Adicional de Habilitação: Este adicional é concedido aos militares que possuem qualificações específicas, como cursos de especialização, e varia de acordo com a habilitação adquirida.</li>
                        <li>Adicional de Disponibilidae: Os militares recebem um adicional disponibilidade, que aumenta de acordo com o posto ou graduação.</li>
                        <li>Adicional de Localidade: Militares que são designados para servir em locais de difícil acesso ou com alto custo de vida podem receber um adicional de localidade.</li>
                        <li>Gratificações e Adicionais: Os militares podem ter direito a diferentes gratificações e adicionais, como o Adicional de Compensação Orgânica (ACO).</li>
                        <li>Descontos: Os militares têm descontos em seus contracheques, que podem incluir contribuições para a Pensão Militar e Imposto de Renda Retido na Fonte (IRRF). Os valores desses descontos dependem da faixa salarial e de outros fatores individuais.</li>
                        <li>Pensões e Benefícios: Em caso de morte ou invalidez do militar, podem ser concedidas pensões ou outros benefícios a seus dependentes.</li>
                    </ul>

                </article>
            </div>
            <div className="fixed left-0 bg-gray-900 backdrop-blur-sm bg-opacity-40 shadow-lg w-screen shadow-black bottom-0 p-4 z-10">
                <div className="border-2 gap-1 text-xs sm:text-base border-green-600 rounded p-2 flex flex-1 items-center justify-center text-white font-bold ">
                    <div className="flex">
                        <p>Bruto:</p>
                        <p className="font-extrabold pl-2">{
                            formataValor(
                                (retornaValorSoldo(pg)! * (disp + locEsp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100))
                                + ((retornaValorSoldo(pg)! * gratRep / 100) * qntDias)
                            )}</p>
                    </div>
                    <div className="flex border-x px-2 border-green-600">
                        <p>Despesas:</p>
                        <p className="font-extrabold pl-2">{formataValor(((retornaValorSoldo(pg)! * (disp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * (fusex + pMil) / 100) + pensAlim + (pnr === "true" ? retornaValorSoldo(pg)! * 0.05 : 0))}</p>
                    </div>
                    <div className="flex">
                        <p>Líquido:</p>
                        <p className="font-extrabold pl-2">
                            {formataValor(((retornaValorSoldo(pg)! * gratRep / 100) * qntDias) + (retornaValorSoldo(pg)! * (disp + locEsp + mil + hab) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) - (((retornaValorSoldo(pg)! * (disp + mil + hab + adcPerm) / 100) + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * (fusex + pMil) / 100 + (pnr === "true" ? retornaValorSoldo(pg)! * 0.05 : 0) + pensAlim))}
                        </p>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-2 gap-2 xs:grid-cols-1">
                <div className="border border-green-600 rounded-md p-6 relative">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Receita</h1>
                    <div className="grid sm:grid-cols-1 gap-4">
                        <div className="relative z-0  w-full group">
                            <select name="postGrad" id="postGrad" onChange={(e) => setPg(e.target.value)} className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
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
                            <label htmlFor="postGrad" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">P/G</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <select name="habilitacao" id="habilitacao" onChange={(e) => setHab(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option></option>
                                {adcHab.map((adc, index) => (
                                    <option key={adc + index} value={adc}>{adc}%</option>
                                ))}
                            </select>
                            <label htmlFor="habilitacao" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Habilitação</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <select name="militar" id="militar" onChange={(e) => setMil(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option></option>
                                {adcMil.map((adc, index) => (
                                    <option key={adc + index} value={adc}>{adc}%</option>
                                ))}
                            </select>
                            <label htmlFor="militar" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Militar</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <select name="disponibilidade" defaultValue=" " id="disponibilidade" onChange={(e) => setDisp(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option className="hidden"></option>
                                {adcDisp.map((adc, index) => (
                                    <option key={adc + index} value={adc}>{adc}%</option>
                                ))}
                            </select>
                            <label htmlFor="disponibilidade" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Disp</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <select name="localizacao" id="localizacao" onChange={(e) => setLocEsp(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option></option>
                                {adcLocEsp.map((adc, index) => (
                                    <option key={adc + index} value={adc}>{adc}%</option>
                                ))}
                            </select>
                            <label htmlFor="localizacao" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Loc Esp</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <select name="adcPerm" id="adcPerm" onChange={(e) => setAdcPerm(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option></option>
                                {adcPermArr.map((adc, index) => (
                                    <option key={adc + index} value={adc}>{adc}%</option>
                                ))}
                            </select>
                            <label htmlFor="adcPerm" className="z-10 absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Permanência</label>
                        </div>
                        <div className="flex flex-col gap-4 border border-green-600 rounded-md p-4">
                            <div className="relative z-0  w-full group">
                                <select name="postGrad" id="postGrad" onChange={(e) => setPgCO(e.target.value)} className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
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
                                <input name="compOrg" id="compOrg" maxLength={3} defaultValue={0} onChange={(e) => setCompOrg(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                                <label htmlFor="compOrg" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Compensação Orgânica</label>
                                <span className="text-gray-600 text-sm">Insira a porcentagem</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-green-600 rounded-md p-6 relative">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Despesas</h1>
                    <div className="grid sm:grid-cols-1 gap-4">
                        <div className="relative z-0  w-full group">
                            <select name="fusex" id="fusex" onChange={(e) => setFusex(Number(e.target.value))} className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option></option>
                                {fusexArr.map((adc, index) => (
                                    <option key={index} value={adc}>{adc}%</option>
                                ))}

                            </select>
                            <label htmlFor="fusex" className="z-10 absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fusex</label>
                            <span className="text-gray-600 text-xs">No caso dependente direto 3.4% e indireto 3.5%</span>
                        </div>
                        <div className="relative z-0  w-full group">
                            <select name="pMil" id="pMil" onChange={(e) => setPMil(Number(e.target.value))} className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option></option>
                                {pensMilArr.map((adc, index) => (
                                    <option key={index} value={adc}>{adc}%</option>
                                ))}
                            </select>
                            <label htmlFor="pMil" className="z-10 absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pensão Militar</label>
                            <span className="text-gray-600 text-xs">No caso de 1.5% da filha selecionar a opção 12%</span>
                        </div>
                        <div className="relative z-0 w-full group">
                            <select name="pnr" id="pnr" onChange={(e) => setPnr(e.target.value)} className="leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                                <option value="false">NÃO</option>
                                <option value="true">SIM</option>
                            </select>
                            <label htmlFor="pnr" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PNR</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input type="number" onChange={(e) => setPensAlim(Number(e.target.value))} className="block py-2.5 [appearance:textfield] px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pensão Alimenticia</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input type="number" value={dependentes} onChange={(e) => setDependentes(Number(e.target.value))} className="block py-2.5 [appearance:textfield] px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                            <label className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dependentes</label>
                        </div>
                    </div>
                </div>

            </div>
            <div className="border border-green-600 rounded-md p-6 relative my-4">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Grat Representação</h1>
                <div className="flex gap-4">
                    <div className="relative z-0 mb-6 w-full group">
                        <select name="gratRep" id="gratRep" onChange={(e) => setGratRep(Number(e.target.value))} className="dark:focus:bg-gray-900 leading-tight focus:bg-gray-900 block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
                            <option></option>
                            {gratRepArr.map((grat, index) => (
                                <option key={grat + index} value={grat}>{grat}%</option>
                            ))}
                        </select>
                        <label htmlFor="gratRep" className="absolute text-md text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Grat Rep</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="number" name="qntDias" onChange={(e) => setQntDias(Number(e.target.value))} id="qntDias" className="block py-2.5 px-0 w-full text-sm [appearance:textfield] text-white bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="qntDias" className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Qnt de Dias</label>
                    </div>

                </div>

            </div>
            {/* OUTRAS DEPENSAS */}
            {/* <div className="border border-green-600 rounded-md p-6 relative my-4">
        <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">outras Despesas</h1>
        <button className="flex border border-green-600 hover:text-green-600 transform transition-colors -top-3 right-4 absolute text-white rounded-full bg-gray-900 font-bold text-md uppercase px-2 text-center" onClick={() => setContInput([...contInput, contInput + 1])}>
            <FiPlusCircle className="pr-1 h-6 w-6 text-2xl " />Adicionar
        </button>
        
        <div className="flex">
            <div className="relative z-0 mb-6 w-full group">
                <input type="number" onChange={()=>{}} className="block py-2.5 [appearance:textfield] px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label className="absolute text-sm text-gray-200 dark:text-gray-200 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor</label>
            </div>

        </div>

    </div> */}

            {/* VALORES */}
            <div className="border border-green-600 rounded-md p-6 relative mt-4">
                <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Valores</h1>
                <div className="border border-green-600 rounded-md p-6 relative mt-4">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Bruto</h1>
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
                        <b className="text-gray-300">Adc Permanência</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * adcPerm / 100)}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Grat Rep:</b>
                        <p className="pl-2 text-white">{formataValor(retornaValorSoldo(pg)! * gratRep / 100)} x {qntDias} =</p>
                        <p className="pl-2 text-white">{formataValor(((retornaValorSoldo(pg)! * gratRep / 100) * qntDias))}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Salário Fámilia:</b>
                        <p className="pl-2 text-white">{formataValor(dependentes * 0.16)}</p>
                        
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Valor Bruto</b><p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * (disp + locEsp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100) + ((retornaValorSoldo(pg)! * gratRep / 100) * qntDias))}</p>
                    </div>

                </div>
                <div className="border border-green-600 rounded-md p-6 relative mt-4">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Despesas</h1>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Fusex</b><p className="pl-4 text-white">{formataValor((((retornaValorSoldo(pg)! * (disp + mil + hab + compOrg + adcPerm) / 100) + retornaValorSoldo(pg)!) * (fusex / 100)))}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Pensão Militar</b><p className="pl-4 text-white">{formataValor((((retornaValorSoldo(pg)! * (disp + mil + hab + compOrg + adcPerm) / 100) + retornaValorSoldo(pg)!) * (pMil / 100)))}</p>
                    </div>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Pensão Alimentícia</b><p className="pl-4 text-white">{formataValor(pensAlim)}</p>
                    </div>
                    {pnr === "true" ? (
                        <div className="flex flex-1 flex-col">
                            <div className="flex flex-1">
                                <b className="text-gray-300">PNR (F EX-CNST)</b>
                                <p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * 0.01)}</p>
                            </div>
                            <div className="flex flex-1">
                                <b className="text-gray-300">PNR (COD/UA)</b>
                                <p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * 0.035)}</p>
                            </div>
                            <div className="flex flex-1">
                                <b className="text-gray-300">PNR (F EX-MNT)</b>
                                <p className="pl-4 text-white">{formataValor(retornaValorSoldo(pg)! * 0.005)}</p>
                            </div>
                        </div>
                    ) : null}
                    <div className="flex flex-1">
                        <b className="text-gray-300">Imposto de renda</b>
                        <p className="pl-4 text-white">
                            {formataValor(calculaImpostoRenda(
                                retornaValorSoldo(pg)! * (disp + locEsp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100) + ((retornaValorSoldo(pg)! * gratRep / 100) * qntDias)
                                , ((retornaValorSoldo(pg)! * (disp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * (fusex + pMil) / 100) + pensAlim + (pnr === "true" ? retornaValorSoldo(pg)! * 0.05 : 0), dependentes).impostoRenda)}
                        </p>
                    </div>
                </div>
                <div className="border border-green-600 rounded-md p-6 relative mt-4">
                    <h1 className="-top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">Imposto de renda</h1>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Calculo Base</b>
                        <p className="pl-4 text-white">
                            {formataValor(calculaImpostoRenda(
                                retornaValorSoldo(pg)! * (disp + locEsp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100) + ((retornaValorSoldo(pg)! * gratRep / 100) * qntDias)
                                , ((retornaValorSoldo(pg)! * (disp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * (fusex + pMil) / 100) + pensAlim + (pnr === "true" ? retornaValorSoldo(pg)! * 0.05 : 0), dependentes).baseCalculo)}

                        </p>
                    </div>
                    <span className="text-xs text-gray-600 italic text-center">Cálculo: Valor Bruto - Descontos - (Dependentes * {formataValor(dependenteIR)})</span>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Aliquota</b>
                        <p className="pl-4 text-white">
                            {formataValor(calculaImpostoRenda(
                                retornaValorSoldo(pg)! * (disp + locEsp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100) + ((retornaValorSoldo(pg)! * gratRep / 100) * qntDias)
                                , ((retornaValorSoldo(pg)! * (disp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * (fusex + pMil) / 100) + pensAlim + (pnr === "true" ? retornaValorSoldo(pg)! * 0.05 : 0), dependentes).aliquota)}

                        </p>
                    </div>
                    <span className="text-xs text-gray-600 italic text-center">Cálculo: (Calculo Base * Aliquota) / 100</span>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Dedução</b>
                        <p className="pl-4 text-white">
                            {formataValor(calculaImpostoRenda(
                                retornaValorSoldo(pg)! * (disp + locEsp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100) + ((retornaValorSoldo(pg)! * gratRep / 100) * qntDias)
                                , ((retornaValorSoldo(pg)! * (disp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * (fusex + pMil) / 100) + pensAlim + (pnr === "true" ? retornaValorSoldo(pg)! * 0.05 : 0), dependentes).deducao)}

                        </p>
                    </div>
                    <span className="text-xs text-gray-600 italic text-center">De acordo com a tabela</span>
                    <div className="flex flex-1">
                        <b className="text-gray-300">Imposto de renda</b>
                        <p className="pl-4 text-white">
                            {formataValor(calculaImpostoRenda(
                                retornaValorSoldo(pg)! * (disp + locEsp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100) + ((retornaValorSoldo(pg)! * gratRep / 100) * qntDias)
                                , ((retornaValorSoldo(pg)! * (disp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * (fusex + pMil) / 100) + pensAlim + (pnr === "true" ? retornaValorSoldo(pg)! * 0.05 : 0), dependentes).impostoRenda)}
                        </p>
                    </div>
                    <span className="text-xs text-gray-600 italic text-center">Cálculo: (((Calculo Base * Aliquota) / 100) - Dedução)</span>
                    <article className="w-full">
                        <h1 id="#distCubagem" className="text-green-600 mt-6 font-bold uppercase pt-3 border-b border-green-600 flex flex-1 items-center">
                            Tabela IR
                        </h1>
                        <div className="text-xs sm:text-md flex flex-col justify-center relative overflow-x-auto shadow-container sm:rounded-lg mt-4 ">
                            <table className="w-100 sm:w-full text-left text-gray-400">
                                <thead className=" uppercase text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                                            De
                                        </th>
                                        <th scope="col" className="px-1 sm:px-6 py-3 text-center text-white">
                                            Até
                                        </th>
                                        <th scope="col" className="px-1 sm:px-6 py-3  bg-gray-800 text-center text-white">
                                            Alíquota
                                        </th>
                                        <th scope="col" className="px-1 sm:px-6 py-3 text-center text-white">
                                            Dedução
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {impostoRenda.map((val, index) => (
                                        <tr key={val + `${index}`} className={
                                            (calculaImpostoRenda(
                                                retornaValorSoldo(pg)! * (disp + locEsp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100) + ((retornaValorSoldo(pg)! * gratRep / 100) * qntDias)
                                                , ((retornaValorSoldo(pg)! * (disp + mil + hab + adcPerm) / 100 + retornaValorSoldo(pg)! + (retornaValorSoldo(pgCo)! * compOrg / 100)) * (fusex + pMil) / 100) + pensAlim + (pnr === "true" ? retornaValorSoldo(pg)! * 0.05 : 0), dependentes).deducao) == val.deducao ? "border-b border-gray-700 !shadow-container !text-green-600 " : "border-b border-gray-700"

                                        }>
                                            <td className="px-6 py-4 text-center bg-gray-800">
                                                {formataValor(val.de)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {val.ate > 999999 ? <span className="text-base">&#8734;</span> : formataValor(val.ate)}
                                            </td>
                                            <td className="px-6 py-4 text-center bg-gray-800">
                                                {(val.aliquota * 100).toFixed(2)}%
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {formataValor(val.deducao)}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div className="py-2">
                                <span className="text-xs text-gray-600 italic m-2 text-center">*Medida provisória nº 1.206, de 6 de fevereiro de 2024.</span>
                                <Link href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2024" target="_blank">
                                    <span className="text-xs text-gray-600 italic m-2 text-center hover:text-white">Acesse: Tributação de 2024.</span>
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <Links />
        </div>
    )
}