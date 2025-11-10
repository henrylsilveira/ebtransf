import FormsNota from "@/components/gerenciamentoProcessos/forms/formsNota";
import Script from "next/dist/client/script";

export default function Form() {
  return (
    <>
      <title>EBCalc - Formulário de Processo</title>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?nome=G-W6B1SSXWE7"
      ></Script>
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-W6B1SSXWE7');`}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
        crossOrigin="anonymous"
      />
      <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-10 rounded-lg mb-20 mt-4 h-full min-h-screen">
      <FormsNota userId="21" />
      </div>
    </>
  );
}
