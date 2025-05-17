"use client";
import { Loader } from "@/components/Loader/Loader";
import { QrCodeIcon } from "lucide-react";
import Script from "next/dist/client/script";
import { Suspense, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import Loading from "../loading";
import { toast } from "react-toastify";
import styles from "../../components/Logo/styles.module.css";
export default function QrCode() {
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);

  const [qrCode, setQrCode] = useState("");
  const [Loading, setLoading] = useState(false);

  function generateQrCode() {
    if (link === "")
      return toast.error("Preencha o campo de link!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
      });
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setQrCode(link);
      setLoading(false);
    }, 3000);
  }

  function downloadQrCode() {
    const canvas: any = document.getElementById("qrcode");

    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }
  return (
    <>
      <title>EBCalc - Gerador QRCode</title>
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
      <div className="flex flex-col mx-auto max-w-4xl w-10/12 sm:text-md text-sm shadow-container p-10 rounded-lg mb-20 mt-6 min-h-screen max-h-full">
        <div className="w-full flex justify-center flex-col mb-4">
          <h1 className="text-green-600 font-bold uppercase text-2xl mx-auto mb-2">
            Gerador de QRCode
          </h1>
        </div>
        <div className="shadow-shape w-full p-2 mb-8 rounded-lg">
          <div className="flex justify-between items-center bg-gray-950 p-2 rounded-lg shadow-shape">
            <input
              onChange={(e) => setLink(e.target.value)}
              className="text-green-800 focus:outline-none bg-transparent placeholder:text-gray-700 italic w-full"
              placeholder="Cole o link aqui"
            />
            <button
              onClick={generateQrCode}
              className="shadow-container px-4 py-2 hover:bg-green-800 bg-green-700 rounded-md text-white"
            >
              <QrCodeIcon className="text-sm" />
            </button>
          </div>

          <div className="flex items-center justify-center my-2 transition-all ease-in-out duration-500">
            {open && (
              <div className="flex flex-col gap-2">
                <div className={styles.mediaObject}>
                  <div className="flex items-center justify-center z-10 rounded-lg">
                    {Loading && (
                      <div className="flex items-center justify-center absolute backdrop-blur-[8px] w-full h-full rounded-[20px] z-10">
                        <div className="flex items-center justify-center">
                          <Loader noLogo />
                        </div>
                      </div>
                    )}
                    <div className="relative">
                      {/* <img
                      id="imgLogo"
                        src="/ebcalclogo.png"
                        className="absolute z-0 opacity-20 right-4 bottom-4 w-24"
                      /> */}
                      <QRCode
                        id="qrcode"
                        style={{
                          borderRadius: "20px",
                        }}
                        logoImage="/ebcalclogo.png"
                        logoOpacity={0.1}
                        logoWidth={160}
                        logoHeight={48}
                        fgColor="#067c33"
                        bgColor="#ffffff0f"
                        value={qrCode}
                        qrStyle="dots"
                        size={300}
                        quietZone={14}
                        ecLevel="L"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => downloadQrCode()}
                  className=" w-full rounded-md px-3 py-1 shadow-button text-white text-lg flex items-center justify-center bg-green-600 hover:bg-green-900 active:shadow-inner transition-all ease-in-out duration-300"
                >
                  <QrCodeIcon className="size-6 p-1" />
                  Baixar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
