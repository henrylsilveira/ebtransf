import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import app from "@/firebase/config";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { token: string } }) {
    const id = params.token
    const db = getFirestore(app);
    const colRef = collection(db, "instalacao");
    try {
        const data = await getDoc(
            doc(db, colRef.path, id)
        );
            if(!data.data()){
                return NextResponse.json({ status: false, message: "Token não associado a nenhuma instalação!" })
            }
        return NextResponse.json({ status: true, data: data.data() })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}