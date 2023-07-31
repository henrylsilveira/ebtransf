import { soldo } from "./valores"

export function formataValor(price: number, discount?: number){
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