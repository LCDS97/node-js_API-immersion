const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function (callback) {
    const list = []
    for(index in this) {
        
        const item = this[index]
        const result = callback(item, index, this)
        // Se for 0, "", null, undefined === false
        if(!result) continue;
        list.push(item)
    }
    return list;
}

async function main(){
    try {
        const { results } = await obterPessoas('a')

/*         const familiaLiars = results.filter(function (item) {
            // Por padrão precisa retornar um booleano
            // Para informar se deve manter ou remover da lista
            // false > remove da lista
            // true > mantem
            // Se não encontrou = -1
            // Se encontrou = posicaoNoArray
            const result = item.name.toLowerCase().indexOf('lars') !== -1;
            return result;
        }) */
        const familiaLiars = results.meuFilter((item, index, list) => {
            console.log(`index: ${index}`, list.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familiaLiars.map((pessoa) => pessoa.name)
        console.log(names)

    } catch (error) {
        console.error('Deu ruim', error);
    }
}

main()