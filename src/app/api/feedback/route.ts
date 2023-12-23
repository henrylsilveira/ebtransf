
import app from "@/firebase/config";
import { FeedbackProps } from "@/types/types";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const db = getFirestore(app);
    const date = new Date()
    const { mensagem } = await request.json() as FeedbackProps
    try {
        await addDoc(collection(db, "feedback"), {
            id: nanoid(6).toUpperCase(),
            date: date.toISOString(),
            mensagem
          });
          return NextResponse.json({status: true, message: "Mensagem registrada!" })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}