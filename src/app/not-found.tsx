import { Logo } from "@/components/Logo";


export default function NotFound() {
    return (
        <>
        <title>EBCalc | Pagina não encontrada</title>
        <div className="max-w-2xl mx-auto rounded-lg h-screen flex justify-between items-center">
            <Logo type="normal" />
            <h1 className="mx-auto text-white text-3xl">404 - Página não encontrada</h1>
        </div>
        </>
    )
}