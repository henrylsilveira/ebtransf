'use client'
import Cookies from "js-cookie";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

export default function GDPR() {
  const [cookie, setCookie] = useState(true)

  useEffect(() => {
    const getCookie = Cookies.get('gdpr') ? true : false
    setCookie(getCookie)
  }, [])

  function setCookies() {
    Cookies.set('gdpr', 'true', { expires: 7 });
    const gdpr = document.getElementById("gdpr");
    if (gdpr !== null) {
      gdpr.style.display = "none";
    }
  }

  return (
    <Suspense fallback={<Loader />}>
      {cookie ? <></> : (
        <section
          id="gdpr"
          className="z-50 backdrop-blur-sm fixed bottom-0 flex flex-col md:flex-row bg-black bg-opacity-40 py-5 px-10 items-center gap-4"
        >
          <p className=" text-green-500 text-justify p-4">
            EB#Calc está 100% em conformidade com a Lei Geral de Proteção de Dados (LGPD). Para saber mais sobre como coletamos, armazenamos e processamos suas informações em conformidade com o LGPD, por favor, veja nossa{' '}
            <Link
              href="/privacyPolicy"
              className="font-bold hover:decoration-none hover:text-green-700"
            >
              Politica de Privacidade
            </Link>
            .
          </p>
          <button
            onClick={setCookies}
            className="px-5 py-2 bg-black bg-opacity-40 text-green-500 border border-green-500 rounded-lg hover:bg-green-950 transition ease-in-out duration-300"
          >
            Aceitar
          </button>
        </section>
      )}
    </Suspense>

  );
}
