import app from "@/firebase/config";
import { FeedbackCidadesProps } from "@/types/types";
import { randomUUID } from "crypto";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const db = getFirestore(app);
    const colRef = query(collection(db, "feedbackCidades"));
    try {
        const data = await getDocs(colRef);
        const feedbacks = data.docs.map((e) => {
            return e.data();
          });

        return NextResponse.json({ status: true, feedbacks });
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}

export async function POST(request: NextRequest) {
    const db = getFirestore(app)
    const colRef = collection(db, "feedbackCidades");
    const date = new Date()
    const id = randomUUID()
    const { cidade,
        estado,
        saude,
        educacao,
        trabalho,
        seguranca,
        texto,
        pnr,
        custoVida,
        batalhao,
        infraEstrutura } = await request.json() as FeedbackCidadesProps
    try {
        await setDoc(
            doc(db, colRef.path, id),
            {
                id,
                date: date.toISOString(),
                cidade,
                estado,
                saude,
                educacao,
                trabalho,
                texto,
                seguranca,
                pnr,
                custoVida,
                batalhao,
                infraEstrutura,
            } as FeedbackCidadesProps ,
            { merge: true }
        );
        return NextResponse.json({ status: true, message: "Dados salvos com sucesso!" })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}

