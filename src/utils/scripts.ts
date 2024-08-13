import { DadosTransferencia, FeedbackCidadesProps } from "@/types/types"
import { dependenteIR, impostoRenda, soldo } from "./valores"

export function formataValor(price: number, discount?: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price)
}

export function retornaValorSoldo(pg: string) {
    switch (pg) {
        case 'sdEv':
            return soldo["sdEv"]
        case 'sdEp':
            return soldo["sdEp"]
        case 'cb':
            return soldo["cb"]
        case '3sgt':
            return soldo["3sgt"]
        case '2sgt':
            return soldo["2sgt"]
        case '1sgt':
            return soldo["1sgt"]
        case 'st':
            return soldo["st"]
        case 'aspof':
            return soldo["aspof"]
        case '2ten':
            return soldo["2ten"]
        case '1ten':
            return soldo["1ten"]
        case 'cap':
            return soldo["cap"]
        case 'maj':
            return soldo["maj"]
        case 'tencel':
            return soldo["tencel"]
        case 'cel':
            return soldo["cel"]
        case 'genBda':
            return soldo["genBda"]
        case 'genDiv':
            return soldo["genDiv"]
        case 'genEx':
            return soldo["genEx"]
        default:
            return 0
    }
}

export function retornaValorM3Transportado(distancia: number) {
    switch (true) {
        case (distancia == 0):
            return 0
        case (distancia <= 50):
            return 29.64
        case (distancia >= 51 && distancia <= 100):
            return 32.50
        case (distancia >= 101 && distancia <= 200):
            return 38.48
        case (distancia >= 201 && distancia <= 400):
            return 51.47
        case (distancia >= 401 && distancia <= 600):
            return 63.77
        case (distancia >= 601 && distancia <= 800):
            return 76.67
        case (distancia >= 801 && distancia <= 1000):
            return 88.61
        case (distancia >= 1001 && distancia <= 1200):
            return 100.68
        case (distancia >= 1201 && distancia <= 1400):
            return 113.04
        case (distancia >= 1401 && distancia <= 1600):
            return 125.48
        case (distancia >= 1601 && distancia <= 1800):
            return 138.06
        case (distancia >= 1801 && distancia <= 2000):
            return 150.84
        case (distancia >= 2001 && distancia <= 2200):
            return 163.80
        case (distancia >= 2201 && distancia <= 2400):
            return 176.93
        case (distancia >= 2401 && distancia <= 2600):
            return 189.22
        case (distancia >= 2601 && distancia <= 2800):
            return 201.50
        case (distancia >= 2801 && distancia <= 3000):
            return 214.14
        case (distancia >= 3001 && distancia <= 3200):
            return 226.46
        case (distancia >= 3201 && distancia <= 3400):
            return 238.82
        case (distancia >= 3401 && distancia <= 3600):
            return 251.34
        case (distancia >= 3601 && distancia <= 3800):
            return 263.88
        case (distancia >= 3801 && distancia <= 4000):
            return 276.17
        case (distancia >= 4001 && distancia <= 4200):
            return 288.91
        case (distancia >= 4201 && distancia <= 4400):
            return 301.52
        case (distancia >= 4401 && distancia <= 4600):
            return 314.47
        case (distancia >= 4601 && distancia <= 4800):
            return 327.12
        case (distancia >= 4801 && distancia <= 5000):
            return 339.15
        case (distancia > 5000):
            return 352.61
        default:
            return 0
    }
}

export function calcularDiferencaAtual(data: any, dataT?: any) {
    // const m31 = [0,2,4,6,7,9,11]
    // const m30 = [3,5,8,10]
    // const m28 = 1
    const partesDaData = data.split("-");
    const ano = parseInt(partesDaData[0], 10);
    const mes = parseInt(partesDaData[1], 10);
    const dia = parseInt(partesDaData[2], 10);
    // const dataFornecidaObj = new Date(ano, mes - 1, dia);
    let dataAtual
    let difAno = 0
    let difMes = 0
    let difDia = 0
    if (dataT) {
        dataAtual = dataT.split("-");
    } else {
        dataAtual = new Date();
        dataAtual = dataAtual.toISOString().split("-")
    }

    // const dias = differenceInCalendarDays(dataAtual, dataFornecidaObj);

    const partesDaDataAtual = dataAtual;
    const anoA = parseInt(partesDaDataAtual[0], 10);
    const mesA = parseInt(partesDaDataAtual[1], 10);
    const diaA = parseInt(partesDaDataAtual[2], 10);
    if (ano == anoA && (mes >= mesA && dia > diaA)) {
        return { message: "Não utilize datas futuras." }
    }

    if (anoA >= ano) {
        difAno = anoA - ano
    } else {
        return { message: "Não utilize datas futuras." }
    }

    if (mesA >= mes) {
        difMes = mesA - mes
    } else {
        difMes = mesA - mes + 12
        difAno--
    }
    if (diaA >= dia) {
        difDia = diaA - dia
    } else {
        difDia = diaA - dia + 30
        difMes--
    }

    if (difAno < 0 || difMes < 0 || difDia < 0) {
        return { message: "Não utilize datas futuras." }
    }

    return { ano: difAno, mes: difMes, dia: difDia, totalDias: difAno * 365 + difMes * 30 + difDia };
}

interface ObjectProps {
    id: string
}

export function removerObjetoPorID(array: ObjectProps[], id: string): ObjectProps[] {
    const index = array.findIndex(objeto => objeto.id === id);

    if (index !== -1) {
        array.splice(index, 1);
    }

    return array;
}

export function converterParaFormatoPadrao(dataISO: string) {
    // Criar um objeto de data a partir da string ISO
    const data = new Date(dataISO);

    // Obter componentes da data
    const dia: number = data.getDate();
    const mes: number = data.getMonth() + 1; // Mês é base 0, então adicionamos 1
    const ano: number = data.getFullYear();
    const horas: number = data.getHours();
    const minutos: number = data.getMinutes();

    // Adicionar zero à esquerda se for necessário
    const diaFormatado: string = dia < 10 ? '0' + dia : dia.toString();
    const mesFormatado: string = mes < 10 ? '0' + mes : mes.toString();
    const horasFormatadas: string = horas < 10 ? '0' + horas : horas.toString();
    const minutosFormatados: string = minutos < 10 ? '0' + minutos : minutos.toString();

    // Formatar a data no padrão "Dia/mês/ano Horas:Minutos"
    const formatoPadraoComHorario: string =
        diaFormatado + '/' + mesFormatado + '/' + ano + ' ' + horasFormatadas + ':' + minutosFormatados;

    return formatoPadraoComHorario;
}

export function retornaTimeStamp(): string {
    const date = new Date()
    const timestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()

    return timestamp
}

export function generateNowISOTime() {
    const time = new Date();
    return time.toISOString();
}

export function convertDate(iso: string | number | Date) {
    const d = new Date(iso);
    const convertDate = d.toLocaleDateString("pt-BR");
    return convertDate;
}

export function formatarDataHora(iso: string | number | Date) {
    const data = new Date(iso);
    return data.toLocaleString("pt-BR");
}

export function hasFiveMinutesPassed(isoDateTime: string): number {
    // Converte a string em formato ISO para um objeto Date
    const providedDateTime = new Date(isoDateTime);

    // Obtém a data e hora atual
    const currentDateTime = new Date();

    // Calcula a diferença de tempo em milissegundos
    const timeDifference = currentDateTime.getTime() - providedDateTime.getTime();

    // Converte a diferença de tempo de milissegundos para minutos
    const timeDifferenceInMinutes = timeDifference / (1000 * 60);

    // Retorna true se já se passaram 5 minutos ou mais
    return timeDifferenceInMinutes;
}

export function getTimeRemainingForFiveMinutes(isoDateTime: string): number {
    // Converte a string em formato ISO para um objeto Date
    const providedDateTime = new Date(isoDateTime);

    // Obtém a data e hora atual
    const currentDateTime = new Date();

    // Calcula a diferença de tempo em milissegundos
    const timeDifferenceInMilliseconds = currentDateTime.getTime() - providedDateTime.getTime();

    // Duração de 5 minutos em milissegundos
    const fiveMinutesInMilliseconds = 5 * 60 * 1000;

    // Calcula o tempo restante para completar 5 minutos
    const timeRemaining = fiveMinutesInMilliseconds - timeDifferenceInMilliseconds;

    // Se já se passaram mais de 5 minutos, retorne 0
    if (timeRemaining <= 0) {
        return 0;
    }

    // Converte o tempo restante de milissegundos para segundos e retorne
    return timeRemaining / 1000;
}

export function returnCitiesOrigem(cities: DadosTransferencia[]) {
    const arrayCities = cities.map(city => city.cidadeOrigem)
    return [...new Set(arrayCities)].sort((x, y) => {
        let a = x,
            b = y;
        return a == b ? 0 : a > b ? 1 : -1;
    })
}

export function returnCitiesDestino(cities: DadosTransferencia[]) {
    const arrayCities = cities.map(city => city.cidadeDestino)
    return [...new Set(arrayCities)].sort((x, y) => {
        let a = x,
            b = y;
        return a == b ? 0 : a > b ? 1 : -1;
    })
}

export function returnCountCities(cities: DadosTransferencia[]) {
    const arrayCities = cities.map(city => city.cidadeDestino + " | " + city.estadoDestino)
    const arrayCitiesO = cities.map(city => city.cidadeOrigem + " | " + city.estadoOrigem)
    const allCities = [...new Set([...arrayCities, ...arrayCitiesO])]

    return allCities.map(city => {
        return {
            city: city,
            countDestino: arrayCities.filter(c => c === city).length,
            countOrigem: arrayCitiesO.filter(c => c === city).length,
            count: arrayCities.filter(c => c === city).length + arrayCitiesO.filter(c => c === city).length
        }
    })
}
export function returnFeedbackCities(cities: FeedbackCidadesProps[]) {
    const arrayCities = cities?.map(city => city.cidade + " | " + city.estado)
    const allCities = [...new Set([...arrayCities])]

    return allCities.map(city => {
        const totalArrayCidades = cities.filter(c => c.cidade + " | " + c.estado === city).length
        return {
            city: city,
            educacao: cities.reduce((accumulator, c) => { return c.cidade + " | " + c.estado === city ? accumulator + c.educacao : accumulator }, 0) / totalArrayCidades,
            saude: cities.reduce((accumulator, c) => { return c.cidade + " | " + c.estado === city ? accumulator + c.saude : accumulator }, 0) / totalArrayCidades,
            trabalho: cities.reduce((accumulator, c) => { return c.cidade + " | " + c.estado === city ? accumulator + c.trabalho : accumulator }, 0) / totalArrayCidades,
            seguranca: cities.reduce((accumulator, c) => { return c.cidade + " | " + c.estado === city ? accumulator + c.seguranca : accumulator }, 0) / totalArrayCidades,
            infraEstrutura: cities.reduce((accumulator, c) => { return c.cidade + " | " + c.estado === city ? accumulator + c.infraEstrutura : accumulator }, 0) / totalArrayCidades,
            pnr: cities.reduce((accumulator, c) => { return c.cidade + " | " + c.estado === city ? accumulator + c.pnr : accumulator }, 0) / totalArrayCidades,
            custoVida: cities.reduce((accumulator, c) => { return c.cidade + " | " + c.estado === city ? accumulator + c.custoVida : accumulator }, 0) / totalArrayCidades,
            batalhao: cities.reduce((accumulator, c) => { return c.cidade + " | " + c.estado === city ? accumulator + c.batalhao : accumulator }, 0) / totalArrayCidades,
        }
    })
}

export function parseISODate(isoDate?: string) {
    const date = new Date(isoDate ? isoDate : new Date());

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Os meses em JavaScript vão de 0 a 11, então é necessário adicionar 1
    const day = date.getDate();

    return {
        ano: year,
        mes: month,
        dia: day
    };
}

export function calculaImpostoRenda(valorBruto: number, descontos: number, dependentes: number): {
    aliquota: number, deducao: number, baseCalculo: number, impostoRenda: number
} {
    const baseCalculo = valorBruto - descontos - (dependentes * dependenteIR);
    let faixa: { aliquota: number, deducao: number } = { aliquota: 0, deducao: 0 }

    for (let index = 0; index < impostoRenda.length; index++) {
        if (baseCalculo >= impostoRenda[index].de && baseCalculo <= impostoRenda[index].ate) {
            faixa = { aliquota: impostoRenda[index].aliquota, deducao: impostoRenda[index].deducao }
        }
    }

    return {
        baseCalculo,
        aliquota: baseCalculo * faixa.aliquota,
        deducao: faixa.deducao,
        impostoRenda: ((baseCalculo * faixa.aliquota) - faixa.deducao)
    }
}