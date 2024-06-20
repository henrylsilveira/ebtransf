export const soldo = {
    'sdEv': 956,
    'sdEp': 1856,
    'cb': 2627,
    '3sgt': 3825,
    '2sgt': 4770,
    '1sgt': 5483,
    'st': 6169,
    'aspof': 7315,
    '2ten': 7490,
    '1ten': 8245,
    'cap': 9135,
    'maj': 11088,
    'tencel': 11250,
    'cel': 11451,
    'genBda': 12490,
    'genDiv': 12912,
    'genEx': 13471,
}

export const soldos = [soldo['sdEv'],soldo['sdEp'],soldo['cb'],soldo['3sgt'],soldo['2sgt'],soldo['1sgt'],soldo['st'],soldo['aspof'],soldo['2ten'],soldo['1ten'],soldo['cap'],soldo['maj'],soldo['tencel'],soldo['cel'],soldo['genBda'],soldo['genDiv'],soldo['genEx']]
export const postosGrad = ['Soldado Ev', 'Soldado Ep', 'Cabo', '3º Sargento', '2º Sargento', '1º Sargento', 'Sub Tenente','Aspirante a Oficial', '2º Tenente', '1º Tenente', 'Capitão','Major', 'Tenente Coronel', 'Coronel', 'General de Brigada', 'General de Divisão', 'General de Exército']
export const adcHab = [12,27,45,68,73]
export const adcMil = [13,16,19,22,25]
export const adcDisp = [5,6,12,16,20,26,32]
export const adcLocEsp = [10,20]
export const gratRepArr = [2,10]

export const cubagemBagagem = {
    '3sgt': 45,
    '2sgt': 45,
    '1sgt': 50,
    'st': 50,
    'aspof': 45,
    '2ten': 50,
    '1ten': 50,
    'cap': 50,
    'maj': 55,
    'tencel': 55,
    'cel': 55,
    'genBda': 60,
    'genDiv': 60,
    'genEx': 60,
}

export const cubagemVeiculo = {
    'carro': 12,
    'moto': 3,
}

export const cubagemDistancia = [
    {
        distanciaMenor: 0,
        distanciaMaior: 50,
        valor: 29.64
    },{
        distanciaMenor: 51,
        distanciaMaior: 100,
        valor: 32.50
    },{
        distanciaMenor: 101,
        distanciaMaior: 200,
        valor: 38.48
    },{
        distanciaMenor: 201,
        distanciaMaior: 400,
        valor: 51.47
    },{
        distanciaMenor: 401,
        distanciaMaior: 600,
        valor: 63.77
    },{
        distanciaMenor: 601,
        distanciaMaior: 800,
        valor: 76.67
    },{
        distanciaMenor: 801,
        distanciaMaior: 1000,
        valor: 88.61
    },{
        distanciaMenor: 1001,
        distanciaMaior: 1200,
        valor: 100.68
    },{
        distanciaMenor: 1201,
        distanciaMaior: 1400,
        valor: 113.04
    },{
        distanciaMenor: 1401,
        distanciaMaior: 1600,
        valor: 125.48
    },{
        distanciaMenor: 1601,
        distanciaMaior: 1800,
        valor: 138.06
    },{
        distanciaMenor: 1801,
        distanciaMaior: 2000,
        valor: 150.84
    },{
        distanciaMenor: 2001,
        distanciaMaior: 2200,
        valor: 163.80
    },{
        distanciaMenor: 2201,
        distanciaMaior: 2400,
        valor: 176.93
    },{
        distanciaMenor: 2401,
        distanciaMaior: 2600,
        valor: 189.22
    },{
        distanciaMenor: 2601,
        distanciaMaior: 2800,
        valor: 201.50
    },{
        distanciaMenor: 2801,
        distanciaMaior: 3000,
        valor: 214.14
    },{
        distanciaMenor: 3001,
        distanciaMaior: 3200,
        valor: 226.46
    },{
        distanciaMenor: 3301,
        distanciaMaior: 3400,
        valor: 238.82
    },{
        distanciaMenor: 3401,
        distanciaMaior: 3600,
        valor: 251.34
    },{
        distanciaMenor: 3601,
        distanciaMaior: 3800,
        valor: 263.88
    },{
        distanciaMenor: 3801,
        distanciaMaior: 4000,
        valor: 276.17
    },{
        distanciaMenor: 4001,
        distanciaMaior: 4200,
        valor: 288.91
    },{
        distanciaMenor: 4201,
        distanciaMaior: 4400,
        valor: 301.52
    },{
        distanciaMenor: 4401,
        distanciaMaior: 4600,
        valor: 314.47
    },{
        distanciaMenor: 4601,
        distanciaMaior: 4800,
        valor: 327.12
    },{
        distanciaMenor: 4801,
        distanciaMaior: 5000,
        valor: 339.15
    },{
        distanciaMenor: 5001,
        distanciaMaior: 'Máximo',
        valor: 352.61
    }
]

export const calcIrrf = [
    {
        salMin: 0,
        salMax: 2112,
        aliquota: 0,
        deducao: 0,
    },
    {
        salMin: 2112.01,
        salMax: 2826.65,
        aliquota: 7.5,
        deducao: 158.40,
    },
    {
        salMin: 2826.66,
        salMax: 3751.05,
        aliquota: 15,
        deducao: 370.4,
    },
    {
        salMin: 3751.06,
        salMax: 4664.68,
        aliquota: 22.5,
        deducao: 651.73,
    },
    {
        salMin: 4664.68,
        aliquota: 27.5,
        deducao: 884.96,
    },
]

export const fusexArr = [3,3.4,3.5]
export const pensMilArr = [10.5,12]
export const adcPermArr = [5,10,15]

export const diarias = [{
    "PostGrad": "Oficiais Generais",
    "tipo1": 433.49,
    "tipo2": 387.86,
    "tipo3": 342.23
},{
    "PostGrad": "Oficiais Superiores",
    "tipo1": 409.58,
    "tipo2": 366.46,
    "tipo3": 323.25,
},{
    "PostGrad": "Oficiais Intermediários, Subalternos",
    "tipo1": 381.14,
    "tipo2": 341.02,
    "tipo3": 300.90
},{
    "PostGrad": "Suboficiais, Subtenentes, Sargentos, Aspirantes e Cadetes",
    "tipo1": 381.14,
    "tipo2": 341.02,
    "tipo3": 300.90
},{
    "PostGrad": "Alunos CPOR, EsPCEx",
    "tipo1": 316.54,
    "tipo2": 283.22,
    "tipo3": 249.90
},{
    "PostGrad": "Demais praças e praças especiais",
    "tipo1": 316.54,
    "tipo2": 283.22,
    "tipo3": 249.90
}]

export const ajudaCusto = [{
    "situacao": "Militar que possua dependente, nas movimentações com desligamento da organização militar.",
    "ida": 2,
    "volta": 0,
},{
    "situacao": "Militar que possua dependente, nas movimentações para comissão superior a 3 (três) e igual ou inferior a 12 (doze) meses, sem desligamento da organização militar. ",
     "ida": 2,
    "volta": 1,
},{
    "situacao": "Militar que possua dependente, nas movimentações para comissão superior a 15 (quinze) dias e igual ou inferior a 3 (três) meses, sem desligamento da organização militar. ",
     "ida": 1,
    "volta": 1,
},{
    "situacao": "Militar que possua dependente, quando transferido para Localidade Especial Categoria A ou de uma Localidade Especial Categoria A para qualquer outra localidade, nas movimentações com desligamento da organização militar. ",
     "ida": 4,
    "volta": 0,
},{
    "situacao": "Militar que não possua dependente e se encontre nas situações “a”, “b”, “c”, ou “d” desta Tabela. ",
    "ida": 1/2,
    "volta": 0,
}]

export const reserva = {
    "situacao": "Militar que possua ou não dependente, por ocasião de transferência para a inatividade remunerada. ",
    "condicao": "Oficial soldo de (Coronel) / Praça soldo de (Sub Tenente)",
    "tipo1": 8,
    "tipo2": 8
}


export const impostoRenda = [
    {
        "de": 0,
        "ate": 2259.20,
        "aliquota": 0,
        "deducao": 0
    },
    {
        "de": 2259.20,
        "ate": 2826.65,
        "aliquota": 0.075,
        "deducao": 169.44
    },
    {
        "de": 2826.66,
        "ate": 3751.05,
        "aliquota": 0.15,
        "deducao": 381.44
    },
    {
        "de": 3751.06,
        "ate": 4664.68,
        "aliquota": 0.225,
        "deducao": 662.77
    },
    {
        "de": 4664.68,
        "ate": 999999999,
        "aliquota": 0.275,
        "deducao": 896.00
    }
]

export const dependenteIR = 189.59