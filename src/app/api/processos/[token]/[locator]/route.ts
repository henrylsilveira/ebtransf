import app from "@/firebase/config";
import { ModeloProcessoProps } from "@/types/types";
import CryptoJS, { AES } from 'crypto-js';
import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
type Params = {
    token: string,
    locator: string
}
export async function GET(request: NextRequest, context: { params: Params }) {
    const db = getFirestore(app);
    const colRef = collection(db, "processos");
    const { token, locator } = context.params;
    
    try {
        const data = await getDoc(
            doc(db, colRef.path, locator)
        );
        if (!data.data()) {
            return NextResponse.json({status: false, message: "Localizador não associado a nenhum grupo de processos!" })
        }
        const result = data.data()
        const plaintext = AES.decrypt(result?.data, token)
        const decrypt = plaintext.toString(CryptoJS.enc.Utf8);
        
        return NextResponse.json({ status: true, decrypt })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}

export async function PUT(request: NextRequest, context: { params: Params }) {
    const db = getFirestore(app);
    const colRef = collection(db, "processos");
    const { token, locator } = context.params;
    const processos = await request.json() as ModeloProcessoProps;

    const date = new Date()
    const stringifyProcessos = JSON.stringify(processos)
    
    try {
        const data = await getDoc(
            doc(db, colRef.path, locator)
        );
        if (!data.data()) {
            return NextResponse.json({status: false, message: "Localizador não associado a nenhum grupo de processos!" })
        }

        const ciphertext = AES.encrypt(stringifyProcessos, token).toString();

        try {
            await updateDoc(doc(db, "processos", locator), {
                updated_at: date.toISOString(),
                data: ciphertext
            },);
            return NextResponse.json({ status: true, message: "Processos atualizados com sucesso!" })
        } catch (error) {
            return NextResponse.json({ message: error })
        }
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}