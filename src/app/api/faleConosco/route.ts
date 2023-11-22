
import app from "@/firebase/config";
import { FaleConoscoProps } from "@/types/types";
import { randomUUID } from "crypto";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export async function POST(request: Request) {
    const db = getFirestore(app);
    const { email, mensagem } = await request.json() as FaleConoscoProps
    try {
        await addDoc(collection(db, "faleconosco"), {
            id: randomUUID(),
            email,
            mensagem
          });
          return Response.json({status: true, message: "Mensagem enviada!" })
    } catch (error) {
        console.error(error)
        return Response.json({ message: error })
    }
}