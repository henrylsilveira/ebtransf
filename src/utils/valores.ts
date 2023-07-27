export const soldo = {
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
}

export function retornaValorSoldo(pg: string) {
    switch (pg) {
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
        default:
            break;
    }
}