import Script from "next/script";
import { createClient } from "@/prismicio";
import { convertDate } from "@/utils/scripts";
import { PrismicImage } from "@prismicio/react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function TodasNoticias() {
  const prismicClient = createClient();
  const post = await prismicClient
    .getAllByType("ebcalcnoticia")
    .then((posts) =>
      posts.sort((x, y) => {
        let a = x.first_publication_date,
          b = y.first_publication_date;
        return a == b ? 0 : a < b ? 1 : -1;
      })
    )
    .catch(() => notFound());
  return (
    <>
      <title>EBCalc - Notícias</title>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-W6B1SSXWE7"
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
      <section className="max-w-4xl mx-auto shadow-container p-10 rounded-lg mb-10 mt-6">
        <div className="flex flex-1 justify-center bg-green-950 items-center rounded shadow-container py-2">
          <h1 className="text-white font-bold uppercase text-xl">Notícias</h1>
        </div>
        {/* <section key={post.id}>
          <section>
            <h3 className="text-3xl font-medium text-white">
              {post.data.titulonoticia}
            </h3>
            <span className="text-sm text-gray-600">
              {convertDate(post.last_publication_date)}
            </span>
            <section id="secNoticia" className="text-gray-400">
              <PrismicImage field={post.data.image} />
              <div id="noticia">
                <PrismicRichText field={post.data.textonoticia} />
              </div>
            </section>
          </section>
        </section> */}
        {post.map((post) => (
          <Link
            href={`/noticias/${post.uid}`}
            key={post.id}
            className="py-2 px-2 flex gap-2 shadow-shape rounded m-2 hover:bg-gray-950 ease-in-out duration-700 transition-all cursor-pointer"
          >
            <div id="secNoticia" className="rounded-full w-32">
              <PrismicImage field={post.data.image} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-white uppercase">
                {post.data.titulonoticia}
              </h3>
              <span className="text-sm text-gray-600">
                {convertDate(post.last_publication_date)}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
