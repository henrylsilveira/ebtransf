import app from "@/firebase/config";
import { DadosTransferencia, FaleConoscoProps } from "@/types/types";
import { randomUUID } from "crypto";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const db = getFirestore(app)
    const date = new Date()
    const { pg,
        percHabilitacao,
        locEspecial,
        percMil,
        percDisp,
        distancia,
        cubagemDistancia,
        pgCompensacaoOrganica,
        compensacaoOrganica,
        passagemAdultoValor,
        passagemAdultoQnt,
        passagemCriancaValor,
        passagemCriancaQnt,
        carro,
        moto,
        especial,
        comum,
        estadoOrigem,
        estadoDestino,
        cidadeOrigem,
        cidadeDestino } = await request.json() as DadosTransferencia
    try {
        await addDoc(collection(db, "transferencia"), {
            id: randomUUID(),
            date: date.toISOString(),
            pg,
            percHabilitacao,
            locEspecial,
            percMil,
            percDisp,
            distancia,
            cubagemDistancia,
            pgCompensacaoOrganica,
            compensacaoOrganica,
            passagemAdultoValor,
            passagemAdultoQnt,
            passagemCriancaValor,
            passagemCriancaQnt,
            carro,
            moto,
            especial,
            comum,
            estadoOrigem,
            estadoDestino,
            cidadeOrigem,
            cidadeDestino,
        } as DadosTransferencia);
        return NextResponse.json({ status: true, message: "Dados salvos com sucesso!" })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}