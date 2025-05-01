const matrizAdjacencia = [
    // 1  2  3  4  5  6
    [ 1, 1, 0, 0, 0, 0 ], // 1 - Avenida
    [ 0, 1, 1, 0, 0, 0 ], // 2 - Centro
    [ 1, 0, 1, 1, 0, 0 ], // 3 - Praça
    [ 0, 0, 0, 1, 1, 0 ], // 4 - Parque
    [ 0, 1, 0, 0, 1, 1 ], // 5 - Shopping
    [ 0, 1, 0, 0, 0, 1 ]  // 6 - Terminal
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

function fechoSimetrico(matriz, transposta) {
    const n = matriz.length;
    const fechoMatriz = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Se existe ligação de i para j ou de j para i, coloca 1
            if (matriz[i][j] === 1 || transposta[i][j] === 1) {
                fechoMatriz[i][j] = 1;
            }
        }
    }

    return fechoMatriz;
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

//CHAT GPT VERSION - DA TUDO 1 
function fechoTransitivoOrdem2(matriz) {
    const n = matriz.length;
    const resultado = matriz.map(linha => linha.slice()); // Copia original
    const fecho = Array.from({ length: n }, () => Array(n).fill(0)); // Inicializa tudo com 0

    for (let i = 0; i < n; i++) {
        for (let k = 0; k < n; k++) {
            if (resultado[i][k] === 1) { // Existe ligação i → k
                for (let j = 0; j < n; j++) {
                    if (resultado[k][j] === 1 && resultado[i][j] === 0) { 
                        // Existe k → j, mas não existe i → j direto
                        fecho[i][j] = 1; // Precisamos adicionar i → j
                    }
                }
            }
        }
    }

    return fecho;
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
fechoSimetrico(matrizAdjacencia, matrizAdjacenciaTransposta)
const fecho = fechoSimetrico(matrizAdjacencia, matrizAdjacenciaTransposta);
console.log("\nFecho Simétrico");
imprimirMatriz(fecho);
const fechoTransitivoMatriz = fechoTransitivoOrdem2(matrizAdjacencia);
console.log("\nFecho Transitivo:");
imprimirMatriz(fechoTransitivoMatriz);
