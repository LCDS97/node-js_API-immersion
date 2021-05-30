// ANCHOR For in e For Of

const service = require('./service');

async function main() {
    try {
       const result = await service.obterPessoas('a')
       const names = []
// NOTE Antiga maneira para fazer um incremento de for, iremos utilizar o for in e for of
/*        console.time('for')
       for(let i=0; i <= result.results.length - 1; i++) {
           const pessoa = result.results[i]
           names.push(pessoa.name)
       }
       console.timeEnd('for') */
       
// NOTE Com for in mesmo objetivo, mas com menos linha de código
/*         console.time('forin')       
        for(let i in result.results) {
           const pessoa = result.results[i]
           names.push(pessoa.name)
        }
        console.timeEnd('forin') */
    
    for (pessoa of result.results) {
        names.push(pessoa.name)
    }
       console.log('names', names)
    } catch (error) {
        console.error('Erro interno', error);
    }
}

main()