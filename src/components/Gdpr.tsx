'use client'
import Cookies from "js-cookie";
import Link from "next/link";

export default function GDPR() {
  function setCookies() {
    Cookies.set('gdpr', 'true',{ expires: 7 });
    const gdpr = document.getElementById("gdpr");
    localStorage.setItem('gdpr', "true");
    if (gdpr !== null) {
      gdpr.style.display = "none";
    }
  }
  
  return (
    <section
      id="gdpr"
      className="z-50 backdrop-blur-sm fixed bottom-0 flex bg-black bg-opacity-40 px-4"
    >
      <p className=" text-green-500 text-justify p-4">
      EB#Calc está 100% em conformidade com o Regulamento Geral de Proteção de Dados (GDPR). Para saber mais sobre como coletamos, armazenamos e processamos suas informações em conformidade com o GDPR, por favor, veja nossa{' '}
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
        className="p-4 my-6 bg-black bg-opacity-40 text-green-500 border border-green-500 rounded-lg hover:bg-green-950 transition ease-in-out delay-200"
      >
        Aceitar
      </button>
    </section>
  );
}
