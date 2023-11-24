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