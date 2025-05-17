import { api } from "@/services/axios";
import { FeedbackCidadesProps } from "@/types/types";
import { formatarDataHora } from "@/utils/scripts";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Script from "next/dist/client/script";

async function getData(id: string) {
  const res = await fetch(`https://ebcalc.net/api/feedbackCidades/${id}`, {
    next: { revalidate: 3600 * 30 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  //    console.log(res.json())
  return res.json();
}

export default async function FeedbackCidadeId({
  params,
}: {
  params: { estado: string; cidade: string; id: string };
}) {
  // const { data } = await api.get(`/feedbackCidades/${params.id}`)
  const data = await getData(params.id);
  const cidade: FeedbackCidadesProps = data.data;
  return (
    <>
      <title>EBCalc - {params.cidade}</title>
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
      <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-10 rounded-lg mb-20 mt-6 h-full min-h-screen">
        <div className="w-full flex justify-center flex-col mb-4">
          <h1 className="text-green-600 font-bold uppercase text-3xl mx-auto mb-2">
            {decodeURIComponent(params.cidade)}
          </h1>
          <h2 className="text-gray-400 mx-auto text-2xl">
            {decodeURIComponent(params.estado)}
          </h2>
          <div className="flex mx-auto items-center">
            <Rating
              name="size-large"
              precision={0.1}
              value={
                (cidade.saude +
                  cidade.educacao +
                  cidade.trabalho +
                  cidade.seguranca +
                  cidade.infraEstrutura +
                  cidade.pnr +
                  cidade.batalhao +
                  cidade.custoVida) /
                8
              }
              size="large"
              readOnly
            />
            <div className="shadow-container bg-gradient-to-r from-green-700 to-green-900 rounded-full p-2 w-10 h-10 flex justify-center items-center">
              <p className="text-white uppercase text-xl ">
                {(
                  (cidade.saude +
                    cidade.educacao +
                    cidade.trabalho +
                    cidade.seguranca +
                    cidade.infraEstrutura +
                    cidade.pnr +
                    cidade.batalhao +
                    cidade.custoVida) /
                  8
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center flex-col">
          <div>
            <p className="text-justify text-gray-300 my-2">"{cidade.texto}"</p>
            <div className="text-gray-700 flex text-md mt-2 w-full">
              <p className="flex ml-auto">{formatarDataHora(cidade.date)}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 border border-green-600 rounded-md p-6 relative mt-4 mb-4">
            <h1 className="left-2 -top-4 absolute text-green-600 bg-gray-900 font-bold text-lg uppercase px-2">
              Análises
            </h1>
            <div className="flex flex-col">
              <Typography className="text-white" component="legend">
                Saúde
              </Typography>
              <Rating
                name="size-large"
                precision={0.5}
                size="large"
                value={cidade.saude}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <Typography className="text-white" component="legend">
                Educação
              </Typography>
              <div className="flex">
                <Rating
                  size="large"
                  precision={0.5}
                  name="size-large"
                  value={cidade.educacao}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Typography className="text-white" component="legend">
                Trabalho para dependentes
              </Typography>
              <Rating
                name="size-large"
                precision={0.5}
                value={cidade.trabalho}
                readOnly
                size="large"
              />
            </div>
            <div className="flex flex-col">
              <Typography className="text-white" component="legend">
                Segurança pública
              </Typography>
              <Rating
                name="size-large"
                precision={0.5}
                value={cidade.seguranca}
                readOnly
                size="large"
              />
            </div>
            <div className="flex flex-col">
              <Typography className="text-white" component="legend">
                Infraestrutura{" "}
              </Typography>
              <Rating
                name="size-large"
                precision={0.5}
                value={cidade.infraEstrutura}
                readOnly
                size="large"
              />
            </div>

            <div className="flex flex-col">
              <Typography className="text-white" component="legend">
                PNR{" "}
              </Typography>
              <Rating
                name="size-large"
                precision={0.5}
                value={cidade.pnr}
                readOnly
                size="large"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <Typography className="text-white" component="legend">
                  Custo de vida
                </Typography>
                <div className="flex">
                  <Rating
                    readOnly
                    size="large"
                    precision={0.5}
                    name="size-large"
                    value={cidade.custoVida}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Typography className="text-white" component="legend">
                Batalhão{" "}
              </Typography>
              <Rating
                name="size-large"
                precision={0.5}
                value={cidade.batalhao}
                readOnly
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
