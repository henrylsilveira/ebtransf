import app from "@/firebase/config";
import { FatosObservados, InstalacaoLogisticaProps } from "@/types/types";
import { collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const db = getFirestore(app);
    const colRef = collection(db, "fatosObservados");

    const { id, nomeCurso, integrantes } = await request.json() as FatosObservados
    try {
        await setDoc(
            doc(db, colRef.path, id),
            {
                id,
                nomeCurso,
                integrantes: []
            },
            { merge: true }
        );
        return NextResponse.json({ status: true, message: "Mensagem enviada!" })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}

export async function PUT(request: NextRequest) {
    const db = getFirestore(app);
    const result = await request.json() as FatosObservados

    try {
        await updateDoc(doc(db, "fatosObservados", result.id), {
            integrantes: result.integrantes
        });
        return NextResponse.json({ status: true, message: "Mensagem enviada!" })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}