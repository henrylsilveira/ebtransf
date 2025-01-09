import Script from "next/script";
import { createClient } from "@/prismicio";
import { convertDate } from "@/utils/scripts";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
interface NoticiaProps {
    params: {
        uid: string;
    };
}
export default async function Noticias({ params }: NoticiaProps) {
    const prismicClient = createClient();
    const post = await prismicClient.getByUID("ebcalcnoticia", params.uid).catch(() => notFound());
    return (
        <>
            <title>EBCalc - Notícias</title>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"></Script>
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6B1SSXWE7');`}
            </Script>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054052131154955"
                crossOrigin="anonymous" />
            <div className="max-w-4xl mx-auto shadow-container p-10 rounded-lg mb-20 mt-6">
                <section key={post.id}>
                    <section>
                        <h3 className="text-3xl font-medium text-white">
                            {post.data.titulonoticia}
                        </h3>
                        <span className="text-sm text-gray-600">{convertDate(post.last_publication_date)}</span>
                        <section id="secNoticia" className="text-gray-400">
                            <PrismicImage field={post.data.image} />
                            <div id="noticia">
                                <PrismicRichText field={post.data.textonoticia} />
                            </div>
                        </section>
                    </section>

                </section>
                <span className="text-xs text-gray-600">**Textos gerado por IA com base nas informações fornecidas pelas fontes citadas.</span>
            </div>

        </>
    )
}