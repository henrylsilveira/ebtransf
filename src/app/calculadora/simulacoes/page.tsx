import TableTransferencias from "@/components/TableTransferencias/TableTransferencias";
import Script from "next/dist/client/script";

async function getData() {
    const res = await fetch('https://ebcalc.net/api/transferencia', { next: { revalidate: 3600 * 7 } })
    if (!res.ok) {
        throw new Error('Erro na requisição de dados.')
    }
    return res.json()
}

export default async function Simulacoes() {
    const data = await getData()
    return (
        <>
            <title>EBCalc - Simulações
            </title>
            <Script async src="https://www.googletagmanager.com/gtag/js?nome=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-2 sm:p-10 rounded-lg mb-20 mt-4 min-w-[375px]">
                <TableTransferencias data={data?.transferencias} />
            </div>
        </>
    )
}