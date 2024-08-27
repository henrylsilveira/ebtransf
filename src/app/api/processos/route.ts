import app from "@/firebase/config";
import { ModeloProcessoProps } from "@/types/types";
import { AES } from 'crypto-js';
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { nanoid } from "nanoid";
export async function POST(request: NextRequest) {
    const db = getFirestore(app)
    const date = new Date()
    const colRef = collection(db, "processos");
    const token = nanoid(4).toUpperCase()
    const locator = nanoid(5).toUpperCase()
    const { processos } = await request.json() as { processos: string }

    const ciphertext = AES.encrypt(processos, token).toString();
    try {
        await setDoc(
            doc(db, colRef.path, locator),
            {
                id: locator,
            date: date.toISOString(),
            data: ciphertext
            },
            { merge: true }
        );
        return NextResponse.json({ status: true, message: "Dados salvos com sucesso!", token, locator })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}

