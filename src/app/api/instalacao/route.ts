import app from "@/firebase/config";
import { InstalacaoLogisticaProps } from "@/types/types";
import { collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const db = getFirestore(app);
    const colRef = collection(db, "instalacao");

    const { id, nomeInsta, combustivel, farmacia, rancho, apoio } = await request.json() as InstalacaoLogisticaProps
    try {
        await setDoc(
            doc(db, colRef.path, id),
            {
                id,
                nomeInsta,
                combustivel,
                farmacia,
                rancho,
                apoio
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
    const { data } = await request.json() as {
        data: {
            data: {},
            tipo: string;
            id: string;
        }
    }

    try {
        await updateDoc(doc(db, "instalacao", data.id), {
            [data.tipo]: data.data
        });
        return NextResponse.json({ status: true, message: "Mensagem enviada!" })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}