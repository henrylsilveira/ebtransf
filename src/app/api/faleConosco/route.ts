
import app from "@/firebase/config";
import { FaleConoscoProps } from "@/types/types";
import { randomUUID } from "crypto";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const db = getFirestore(app);
    const { email, mensagem } = await request.json() as FaleConoscoProps
    try {
        await addDoc(collection(db, "faleconosco"), {
            id: randomUUID(),
            email,
            mensagem
          });
          return NextResponse.json({status: true, message: "Mensagem enviada!" })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}