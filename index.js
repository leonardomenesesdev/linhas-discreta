const matrizAdjacencia = [
    // 1  2  3  4  5  6
    [ 0, 1, 0, 0, 0, 0 ], // 1 - Avenida
    [ 0, 0, 1, 0, 0, 0 ], // 2 - Centro
    [ 1, 0, 0, 1, 0, 0 ], // 3 - Praça
    [ 0, 0, 0, 0, 1, 0 ], // 4 - Parque
    [ 0, 1, 0, 0, 0, 1 ], // 5 - Shopping
    [ 0, 1, 0, 0, 0, 0 ]  // 6 - Terminal
  ];
  

// * funções que verificam as classificações
function isReflexiva(matriz) {
    for (i = 0; i < matriz.length; i++) {

        for (j = 0; j < matriz[0].length; j++) {
            
            if (i == j) {
                return matriz[i][j] == 1
            }
        }
    }
}

function isIrreflexiva(matriz) {
    for (i = 0; i < matriz.length; i++) {

        for (j = 0; j < matriz[0].length; j++) {
            
            if (i == j) {
                return matriz[i][j] == 0
            }
        }
    }
}

function isSimetrica(matriz, transposta) {
    let simetrica = true

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {

            if (matriz[i][j] != transposta[i][j]) {
                simetrica = false
                return simetrica
            }
        }
    }

    return simetrica
}

function isAntiSimetrica(matriz) {
    let antiSimetrica = true

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {

            if (i != j && matriz[i][j] == 1 && matriz[j][i] == matriz[i][j]){
                antiSimetrica = false
                return antiSimetrica
            }
        }
    }

    return antiSimetrica
}

function isAssimetrica(matriz) {
    return isIrreflexiva(matriz) && isAntiSimetrica(matriz)
}

function isTransitiva(matriz) {
    const resultado = multiplicarMatrizes(matriz, matriz)
    let transitiva = true

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            
            if (matriz[i][j] != resultado[i][j]) {
                transitiva = false
                return transitiva
            }
        }
    } 

    return transitiva
}



// ? funções auxiliares
function transposta(matrizAdjacencia) {
    const matriz = Array.from({ length: 6 }, () => Array(6).fill(0));

    for (i = 0; i < 6; i++) {

        for (j = 0; j < 6; j++) {
            
            matriz[i][j] = matrizAdjacencia[j][i]
        }
    }

    return matriz
}
function imprimirMatriz(matriz) {
    for (let linha of matriz) {
      console.log(linha.map(el => String(el).padStart(2, ' ')).join(' '));
    }
}
function multiplicarMatrizes(matrizA, matrizB) {
    const linhasA = matrizA.length;
    const colunasA = matrizA[0].length;
    const linhasB = matrizB.length;
    const colunasB = matrizB[0].length;

    if (colunasA !== linhasB) {
        throw new Error("As matrizes não podem ser multiplicadas: colunas de A ≠ linhas de B.");
    }

    const resultado = Array.from({ length: linhasA }, () => Array(colunasB).fill(0));

    for (let i = 0; i < linhasA; i++) {
        for (let j = 0; j < colunasB; j++) {
            for (let k = 0; k < colunasA; k++) {
                resultado[i][j] += matrizA[i][k] * matrizB[k][j];
            }
        }
    }

    return resultado;
}


console.log("MATRIZ ADJACENCIA")
imprimirMatriz(matrizAdjacencia)

console.log("\nTRANSPOSTA")
const matrizAdjacenciaTransposta = transposta(matrizAdjacencia)
imprimirMatriz(matrizAdjacenciaTransposta)

const reflexiva = isReflexiva(matrizAdjacencia) ? "Sim." : "Não." // Diagonal principal com tudo igual a 1  
const irreflexiva = isIrreflexiva(matrizAdjacencia) ? "Sim." : "Não" // Diagonal principal com tudo igual a 0  
const simetrica = isSimetrica(matrizAdjacencia, matrizAdjacenciaTransposta) ? "Sim." : "Não." // A matriz é igual a sua Transposta
const antisimetrica = isAntiSimetrica(matrizAdjacencia) ? "Sim." : "Não." // Para *i ≠ j*, se *Aij = 1* então *Aji = 0*
const assimetrica = isAssimetrica(matrizAdjacencia) ? "Sim." : "Não." //Anti-simétrica e irreflexiva.
const transitiva = isTransitiva(matrizAdjacencia) ? "Sim." : "Não."

console.log(`A matriz é reflexiva: ${reflexiva}`)
console.log(`A matriz é irreflexiva: ${irreflexiva}`)
console.log(`A matriz é simetrica: ${simetrica}`)
console.log(`A matriz é antisimetrica: ${antisimetrica}`)
console.log(`A matriz é assimetrica: ${assimetrica}`)
console.log(`A matriz é transitiva: ${transitiva}`)