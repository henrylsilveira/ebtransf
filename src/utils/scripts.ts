import { soldo } from "./valores"

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