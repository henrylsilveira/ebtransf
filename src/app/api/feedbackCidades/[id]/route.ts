import { getFirestore, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import app from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";
import { Fato, FatosObservados } from "@/types/types";
import { Integrantes } from '../../../../types/types';
import { generateNowISOTime } from "@/utils/scripts";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id
    const db = getFirestore(app);
    const colRef = collection(db, "feedbackCidades");
    try {
        const data = await getDoc(
            doc(db, colRef.path, id)
        );
        if (!data.data()) {
            return NextResponse.json({ status: false, message: "Id não associado a nenhuma análise!" })
        }
        return NextResponse.json({ status: true, data: data.data() })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}