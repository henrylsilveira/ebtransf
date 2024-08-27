import app from "@/firebase/config";
import CryptoJS, { AES } from 'crypto-js';
import { collection, doc, getDoc, getDocs, getFirestore, query } from "firebase/firestore";
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