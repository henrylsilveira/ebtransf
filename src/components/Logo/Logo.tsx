import { cn } from "@/lib/utils";
import Link from "next/link";
import styles from "./styles.module.css";
export function Logo({ type }: { type?: "normal" | "grande" }) {
  return (
    <div className="flex flex-1">
      <div
        className={
          type === "grande"
            ? "flex mt-2 mx-auto text-5xl lg:text-8xl md:text-6xl  border-b rounded-md border-green-800 bg-gradient-to-tr from-gray-950 shadow-container to-gray-900"
            : "flex mt-2 mx-auto text-5xl  border-b rounded-md border-green-800 bg-gradient-to-tr from-gray-950 shadow-container to-gray-900"
        }
      >
        <Link href="/" className="flex flex-1 hover:shadow-md relative group">
          <p className="drop-shadow-[0_1.2px_1.2px_rgb(255, 255, 255)] font-bold bg-gradient-to-tr from-green-950 shadow-container to-green-800 text-green-400 px-2 py-1 rounded-bl-md rounded-tl-md">
            EB#
          </p>
          <p className="font-light text-green-300 px-2 py-1 shadow-container">
            calc
          </p>
          <div className="group-hover:shadow-green-900/60 group-hover:shadow-md transition ease-in-out duration-500 text-xs absolute -bottom-5 text-white w-full flex justify-center bg-gray-950 shadow-shape rounded-b-lg py-1 -z-10">
            <p className="uppercase">Calculadoras & Ferramentas</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
