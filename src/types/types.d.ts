import { cubagemDistancia } from '../utils/valores';
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
    idAlimento: string;
    tipo: "entrada" | "saida" | "";
    finalidade?: string;
    data: string;
    quantidade: number;
    createdAt: string;
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

export type Fato = {
    id: string;
    tokenFato?: string;
    observacao: "positivo" | "negativo";
    descricao: string;
    createdAt: string;
    deleteFo?: boolean;
    deleteIntegrante?: boolean;
    integranteId?: string;
}

export type Integrantes = {
    id: string;
    nome: string;
    createdAt?: string;
    fatosObservados: Fato[];
    idGrupo?: string;
}

export type FatosObservados = {
    id: string;
    nomeCurso: string;
    integrantes: Integrantes[];
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
    updatedAt: string;
}

export type TokenProps = { nomeToken: string; token: string }

export type DadosTransferencia = {
    id?: string;
    date?: string;
    pg: string;
    percHabilitacao: number;
    locEspecial: number;
    percMil: number;
    percDisp: number;
    distancia: number;
    cubagemDistancia: number;
    pgCompensacaoOrganica: string;
    compensacaoOrganica: number;
    passagemAdultoValor: number;
    passagemAdultoQnt: number;
    passagemCriancaValor: number;
    passagemCriancaQnt: number;
    carro: boolean;
    moto: boolean;
    especial: boolean;
    comum: boolean;
    estadoOrigem: string;
    estadoDestino: string;
    cidadeOrigem: string;
    cidadeDestino: string;
}

export type FeedbackCidadesProps = {
    id?: string;
    estado: string;
    cidade:string;
    texto: string;
    saude: number;
    educacao: number;
    trabalho: number;
    seguranca: number;
    infraEstrutura: number;
    pnr: number;
    custoVida: number;
    batalhao: number;
    date: string;
}

export interface ModeloProcessoProps {
    id: string
    titulo: string
    pessoa: string
    dataInicio: string
    dataTermino: string
    status: boolean
    etapas: {
        fase: number
        nome: string
        observacao?: string[]
        data?: Date
        situacao: boolean
    }[]
}

export interface EstadosCidadesCoordProps {
    city: string
    city_ascii: string
    lat: number
    lng: number
    country: string
    iso2: string
    iso3: string
    admin_name: string
    capital: string
    population: number
    id: number
    sigla_state: string
}

export interface ModeloNota {
    id: string
    titulo: string
    subTitulo: string
    data: string
    conteudo: string
    encerramento: string
}

export interface servicoProps {
    id: string
    servicoPreta: string
    servicoVermelha: string
    folga: number
    totalDias: number
}

export interface infoServicoProps {
    preta: {
        data: string
        diaSemana: string
        servicosFuturos: string[]
    },
    vermelha: {
        data: string
        diaSemana: string
        servicosFuturos: string[]
    }
}