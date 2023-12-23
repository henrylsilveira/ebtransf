export type FaleConoscoProps = {
    id?: string;
    email: string;
    mensagem: string;
}
export type FeedbackProps = {
    id?: string;
    mensagem: "like" | "dislike";
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

export type LogisticaRanchoProps = {
    id: string;
    idCombustivel: string;
    tipo: "entrada" | "saida" | "";
    finalidade?: string;
    data: string;
    quantidade: number;
}

export type RanchoProps = {
    id: string;
    tipo: string;
    valorEtapa: number;
    diasRestantes?: string;
    efetivo?: number;
    quantidade: number;
    total: number;
    logistica?: LogisticaCombustivelProps[];
}

export type InstalacaoLogisticaProps = {
    id: string;
    nomeInsta: string;
    combustivel: {};
    farmacia: {};
    rancho: {};
    apoio: {}
}

export type DadosBancoProps = {
    combustivel: {
        tiposCombustivel: CombustivelProps[],
        registroEntradaSaida: LogisticaCombustivelProps[],
    };
    farmacia: {};
    rancho: {
        efetivo: number;
        tiposRancho: RanchoProps[],
        registroEntradaSaida: LogisticaRanchoProps[],
    };
    apoio: {
        tiposMaterial: LogisticaApoioProps[],
        registroEntradaSaida: MaterialProps[],
    };
    id: string;
    nomeInsta: string;
}

export type TokenProps = { nomeToken: string; token: string }



