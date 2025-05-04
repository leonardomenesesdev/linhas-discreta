const matrizAdjacencia = [
    // 1  2  3  4  5  6
    [ 1, 1, 0, 0, 0, 0 ], // 1 - Avenida → Avenida, Centro
    [ 0, 1, 1, 0, 0, 0 ], // 2 - Centro → Centro, Praça
    [ 1, 0, 1, 1, 0, 0 ], // 3 - Praça → Praça, Avenida, Parque
    [ 0, 0, 0, 1, 1, 0 ], // 4 - Parque → Parque, Shopping
    [ 0, 1, 0, 0, 1, 1 ], // 5 - Shopping → Shopping, Centro, Terminal 
    [ 0, 1, 0, 0, 0, 1 ]  // 6 - Terminal → Terminal, Centro
];
const matrizOnibus = [
    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0]
];
      

// * funções que verificam as classificações
function isReflexiva(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i][i] !== 1) {
            return false;
        }
    }
    return true;
}

function isIrreflexiva(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i][i] !== 0) {
            return false;
        }
    }
    return true;
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


function isEquivalencia(matriz, transposta){
    let eq = false
    if(isSimetrica(matriz, transposta) && isTransitiva(matriz) && isReflexiva(matriz)){
        eq = true
    }
    return eq
}

function isOrdem(matriz){
    let od = false
    if(isAntiSimetrica(matriz) && isTransitiva(matriz) && isReflexiva(matriz)){
        od = true
    }
    return od
}

function findMaximais(matriz){
    n = matriz.length
    const maximais = []
    for(i = 0; i<n; i++){
        let isMaximal = true
        for(j = 0; j<n; j++){
            if (i !== j && matriz[i][j] === 1) {
                isMaximal = false
                break
            }
        }
        if (isMaximal) {
            maximais.push(i + 1)
        }
    }
    if(maximais.length>0){
        return maximais
    }
    var not = "Nenhum maximal"
    return not   
}

function findMinimais(matriz){
    n = matriz.length
    const minimais = []
    for(i = 0; i<n; i++){
        let isMinimal = true
        for(j = 0; j<n; j++){
            if (i !== j && matriz[j][i] === 1) {
                isMinimal = false
                break
            }
        }
        if (isMinimal) {
            minimais.push(i + 1)
        }
    }
    if(minimais.length>0){
        return minimais
    }
    var not = "Nenhum minimal"
    return not  
}
function encontrarMenorElemento(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        let ehMenor = true;

        for (let j = 0; j < matriz.length; j++) {
            if (matriz[i][j] !== 1) {
                ehMenor = false;
                break;
            }
        }

        if (ehMenor) {
            return i + 1; 
        }
    }
    return null;
}

function encontrarMaiorElemento(matriz) {
    for (let j = 0; j < matriz.length; j++) {
        let ehMaior = true;

        for (let i = 0; i < matriz.length; i++) {
            if (matriz[i][j] !== 1) {
                ehMaior = false;
                break;
            }
        }

        if (ehMaior) {
            return j + 1; 
        }
    }

    return null;
}

// * composição com a matriz do ônibus
function composicaoMetroOnibus(matrizAdjacencia, matrizOnibus) {
    // Metrô º Ônibus
    // 2º       1º

    const multiplicacao = multiplicarMatrizes(matrizOnibus, matrizAdjacencia) // Multiplicação de matrizes

    const composicao = transformaEmBinario(multiplicacao) // Transforma a matriz resultante em binário
    console.log("\nComposição Metrô º Ônibus:")
    imprimirMatriz(composicao) // Imprime a matriz resultante
}


function transformaEmBinario(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] > 0) {
                matriz[i][j] = 1;
            } else {
                matriz[i][j] = 0;
            }
        }
    }

    return matriz;
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

const equivalencia = isEquivalencia(matrizAdjacencia, matrizAdjacenciaTransposta) ? "Sim" : "Não"
const ordem = isOrdem(matrizAdjacencia) ? "Sim" : "Não"

console.log(`A matriz é reflexiva: ${reflexiva}`)
// console.log(`A matriz é irreflexiva: ${irreflexiva}`)
console.log(`A matriz é simetrica: ${simetrica}`)
console.log(`A matriz é antisimetrica: ${antisimetrica}`)
console.log(`A matriz é assimetrica: ${assimetrica}`)
console.log(`A matriz é transitiva: ${transitiva}`)
console.log(`É relação de equivalência: ${equivalencia}`)
console.log(`É relação de ordem: ${ordem}`)
const max = findMaximais(matrizAdjacencia);
console.log("Elementos maximais:", max);
const min = findMinimais(matrizAdjacencia)
console.log("Elementos minimais:", min);
const menor = encontrarMenorElemento(matrizAdjacencia);
console.log("Menor elemento:", menor ?? "Não existe");

const maior = encontrarMaiorElemento(matrizAdjacencia);
console.log("Maior elemento:", maior ?? "Não existe");




fechoSimetrico(matrizAdjacencia, matrizAdjacenciaTransposta)
const fecho = fechoSimetrico(matrizAdjacencia, matrizAdjacenciaTransposta);
console.log("\nFecho Simétrico");
imprimirMatriz(fecho);
const fechoTransitivoMatriz = fechoTransitivoOrdem2(matrizAdjacencia);
console.log("\nFecho Transitivo:");
imprimirMatriz(fechoTransitivoMatriz);
composicaoMetroOnibus(matrizAdjacencia, matrizOnibus)

