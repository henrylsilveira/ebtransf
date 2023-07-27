'use client'
import { retornaValorSoldo } from "@/utils/valores";
import Script from "next/script";
import { useState } from "react";


export default function Home() {
  const [pg, setPg] = useState("")
  return (
    <div className="max-w-2xl mx-auto shadow-container p-10 rounded-lg mt-6">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
      <Script id="google-analytics">
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-W6B1SSXWE7');`}
      </Script>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
        crossOrigin="anonymous" />
      <div className="border border-green-800 rounded-md p-6 relative">
        <h1 className="-top-4 absolute text-green-700 bg-gray-900 font-bold text-lg uppercase px-2">Militar</h1>

        <div className="grid xl:grid-cols-3 xl:gap-6 grid-cols-3 gap-4">
          <div className="relative z-0 mb-6 w-full group">
            <select name="floating_last_name" id="floating_last_name" onChange={(e) => setPg(e.target.value)} className="leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none dark:focus:bg-gray-900 focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
              <option></option>
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
            </select>
            <label htmlFor="floating_last_name" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">P/G</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select name="floating_last_name" id="floating_last_name" className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
              <option></option>
              <option value={12}>12%</option>
              <option value={27}>27%</option>
              <option value={45}>45%</option>
              <option value={68}>68%</option>
              <option value={76}>76%</option>

            </select>
            <label htmlFor="floating_last_name" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Habilitação</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select name="floating_last_name" id="floating_last_name" className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
              <option></option>
              <option value={13}>13%</option>
              <option value={16}>16%</option>
              <option value={19}>19%</option>
              <option value={22}>22%</option>
              <option value={25}>25%</option>

            </select>
            <label htmlFor="floating_last_name" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Militar</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select name="floating_last_name" id="floating_last_name" className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
              <option></option>
              <option value={5}>5%</option>
              <option value={6}>6%</option>
              <option value={12}>12%</option>
              <option value={16}>16%</option>
              <option value={20}>20%</option>
              <option value={26}>26%</option>
              <option value={32}>32%</option>
            </select>
            <label htmlFor="floating_last_name" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Disp</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select name="floating_last_name" id="floating_last_name" className="dark:focus:bg-gray-900 leading-tight focus:bg-transparent block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
              <option></option>
              <option value={10}>10%</option>
              <option value={20}>20%</option>
            </select>
            <label htmlFor="floating_last_name" className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adicional Loc Esp</label>
          </div>
        </div>
      </div>
      <div className="border border-green-800 rounded-md p-6 relative my-4">
        <h1 className="-top-4 absolute text-green-700 bg-gray-900 font-bold text-lg uppercase px-2">Passagem</h1>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="floating_last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
              <option></option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <label htmlFor="floating_last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
        </div>
      </div>
      <div className="border border-green-800 rounded-md p-6 relative ">
        <h1 className="-top-4 absolute text-green-700 bg-gray-900 font-bold text-lg uppercase px-2">Bagagem</h1>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="floating_last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <select name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required>
              <option></option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <label htmlFor="floating_last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
        </div>
      </div>
      <div className="border border-green-800 rounded-md p-6 relative mt-4">
        <h1 className="-top-4 absolute text-green-700 bg-gray-900 font-bold text-lg uppercase px-2">Veículos</h1>

        <div className="flex items-center gap-4">
          <label htmlFor="hs-valid-toggle-switch" className="text-md text-gray-500 ml-3 dark:text-gray-400">Carro</label>
          <input type="checkbox" id="hs-valid-toggle-switch" className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200" />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="hs-valid-toggle-switch" className="text-md text-gray-500 ml-3 dark:text-gray-400">Moto</label>
          <input type="checkbox" id="hs-valid-toggle-switch" className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-green-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent checked:hover:bg-green-600 checked:focus:bg-green-600 focus:border-green-600 focus:ring-green-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-green-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-green-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-green-200" />
        </div>
      </div>
      <div className="border border-green-800 rounded-md p-6 relative mt-4">
        <h1 className="-top-4 absolute text-green-700 bg-gray-900 font-bold text-lg uppercase px-2">Valores</h1>
        <div className="border border-green-800 rounded-md p-6 relative mt-4">
          <h1 className="-top-4 absolute text-green-700 bg-gray-900 font-bold text-lg uppercase px-2">Soldo Bruto</h1>
          <div className="flex flex-1">
            <b className="text-gray-400">Soldo</b><p className="pl-4 text-white">{retornaValorSoldo(pg)}</p>
          </div>

        </div>
        <div className="border border-green-800 rounded-md p-6 relative mt-4">
          <h1 className="-top-4 absolute text-green-700 bg-gray-900 font-bold text-lg uppercase px-2">Ajuda de custo</h1>
          <div className="flex flex-1">
            <b className="text-gray-400">Ajuda de custo</b><p className="pl-4 text-white">R$ 28.000,00</p>
          </div>

        </div>
      </div>
    </div>
  )
}
