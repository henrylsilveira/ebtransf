import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export function adicionarUmDia(data: string): string {
    const partesData = data.split("-");
    const ano = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; // Meses começam do zero (0 = Janeiro)
    const dia = parseInt(partesData[2], 10);

    // Cria a data a partir da data fornecida
    const dataOriginal = new Date(ano, mes, dia);

    // Adiciona um dia à data
    dataOriginal.setDate(dataOriginal.getDate() + 1);

    // Formata a data resultante no formato "yyyy-MM-dd"
    const anoNovo = dataOriginal.getFullYear();
    const mesNovo = String(dataOriginal.getMonth() + 1).padStart(2, '0'); // Meses começam de 0
    const diaNovo = String(dataOriginal.getDate()).padStart(2, '0');

    return `${anoNovo}-${mesNovo}-${diaNovo}`;
}

export function adicionarDiaVerificarFimDeSemana(data: string): boolean {
    const partesData = data.split("-");
    const ano = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; // Meses começam do zero (0 = Janeiro)
    const dia = parseInt(partesData[2], 10);

    // Cria a data a partir da data fornecida
    const dataOriginal = new Date(ano, mes, dia);

    // Adiciona um dia à data
    dataOriginal.setDate(dataOriginal.getDate());

    // Verifica o dia da semana da nova data
    const diaSemana = dataOriginal.getDay();

    // Se for sábado (6) ou domingo (0), retorna false (fim de semana)
    if (diaSemana === 0 || diaSemana === 6) {
        return false;
    } else {
        return true; // Caso contrário, é um dia de semana
    }
}

export function getDiaSemana(data: string): string {
    const dataFormatada = parse(data, 'yyyy-MM-dd', new Date()); // Cria a data a partir da string

    // Retorna o dia da semana formatado em português
    return format(dataFormatada, 'eeee', { locale: ptBR });
}