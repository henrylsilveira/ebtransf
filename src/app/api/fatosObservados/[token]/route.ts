import { getFirestore, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import app from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";
import { Fato, FatosObservados } from "@/types/types";
import { Integrantes } from '../../../../types/types';
import { generateNowISOTime } from "@/utils/scripts";

export async function GET(request: Request, { params }: { params: { token: string } }) {
    const id = params.token
    const db = getFirestore(app);
    const colRef = collection(db, "fatosObservados");
    try {
        const data = await getDoc(
            doc(db, colRef.path, id)
        );
        if (!data.data()) {
            return NextResponse.json({ status: false, message: "Token não associado a nenhum curso!" })
        }
        return NextResponse.json({ status: true, data: data.data() })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { token: string } }) {
    const idGrupo = params.token
    const db = getFirestore(app);
    const { id, observacao, descricao, tokenFato, deleteFo, integranteId, deleteIntegrante } = await request.json() as Fato
    console.log({ id, observacao, descricao, tokenFato, deleteFo, integranteId, deleteIntegrante })
    const colRef = collection(db, "fatosObservados");
  
    if (deleteFo) {
        try {
            const data = await getDoc(
                doc(db, colRef.path, idGrupo)
            );
            if (!data.data()) {
                return NextResponse.json({ status: false, message: "Token não associado a nenhum curso!" })
            }
            var { integrantes } = data.data() as FatosObservados;
            if (integrantes.length !== 0) {
                integrantes = integrantes.map(integrante =>
                    integrante.id === integranteId ? {...integrante, fatosObservados: integrante?.fatosObservados.splice(integrante?.fatosObservados.findIndex(fatoI => fatoI.id === id), 1)} : integrante)
            }
            await updateDoc(doc(db, "fatosObservados", idGrupo), {
                integrantes
            });
            return NextResponse.json({ status: true, message: "Fato observado armazenado no sistema!" })
        } catch (error) {
            return NextResponse.json({ message: error })
        }
    }else if(deleteIntegrante){
        try {
            const data = await getDoc(
                doc(db, colRef.path, idGrupo)
            );
            if (!data.data()) {
                return NextResponse.json({ status: false, message: "Token não associado a nenhum curso!" })
            }
            var { integrantes } = data.data() as FatosObservados;
            if (integrantes.length !== 0) {
                integrantes = integrantes.filter(integrante =>
                    integrante.id !== integranteId)
                }
            await updateDoc(doc(db, "fatosObservados", idGrupo), {
                integrantes
            });
            return NextResponse.json({ status: true, message: "Fato observado armazenado no sistema!" })
        } catch (error) {
            return NextResponse.json({ message: error })
        }
    } else {
        try {
            const data = await getDoc(
                doc(db, colRef.path, idGrupo)
            );
            if (!data.data()) {
                return NextResponse.json({ status: false, message: "Token não associado a nenhum curso!" })
            }
            var { integrantes } = data.data() as FatosObservados;

            if (integrantes.length !== 0 && tokenFato) {
                integrantes.map(integrante =>
                    integrante.id === id ? integrante?.fatosObservados.push({
                        id: tokenFato,
                        observacao,
                        descricao,
                        createdAt: generateNowISOTime(),
                    }) : integrante)
            }
            await updateDoc(doc(db, "fatosObservados", idGrupo), {
                integrantes
            });
            return NextResponse.json({ status: true, message: "Fato observado armazenado no sistema!" })
        } catch (error) {
            return NextResponse.json({ message: error })
        }
    }

}
