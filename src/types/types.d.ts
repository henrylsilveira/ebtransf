export type FaleConoscoProps = {
    id?: string;
    email: string;
    mensagem: string;
}

export type ConsumoGeradorProps = {
    data: string;
    gerador: string;
    horaInicio: string;
    horaTermino: string;
    consumo: number;
    funcionamento: number;
}

export type LogisticaApoioProps = {
    id: string;
    tipo: string;
    data: string;
    peso: number;
    destino: string;
    materiais?: Material[];
}

export type MaterialProps = {
    id: string;
    codigoLogistica: string;
    nome: string;
    destinatario: string;
    peso: number;
}

export type LogisticaCombustivelProps = {
    id: string;
    idCombustivel: string;
    tipo: "entrada" | "saida" | "";
    finalidade?: string;
    data: string;
    quantidade: number;
}

export type CombustivelProps = {
    id: string;
    tipo: string;
    quantidade: number;
    total: number;
    logistica?: LogisticaCombustivelProps[];
}



