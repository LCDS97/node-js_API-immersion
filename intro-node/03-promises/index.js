// ANCHOR Promises

/*
0 Obter um usuario
1 Obter o número de telefone de um usuario a partir do seu ID
2 Obter o endereco do usuario pelo ID
*/

// NOTE Importando módulo interno do node.js
const util = require('util');

const obterEnderecoAsync = util.promisify(obterEndereco);



// SECTION Promises -  Convertendo callbacks em promises
function obterUsuario() {
// NOTE Quando acontece um problema -> reject(erro) / Quando sucesso -> Resolve
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
// NOTE Para ver se o catch realmente esta funcionando, pode ser chamado o reject para retornar o erro
            //            return reject(new Error('Deu ruim de verdade!'))
            return resolve ({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })

}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '1199218',
                ddd: 11
            })
        }, 2000)
    })


}
function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dendezeiroasaa',
            numero: '400000'
        })
    }, 2000);
}

const usuarioPromise = obterUsuario()
// NOTE Para manipular com sucesso usamos a função .then / Para manipular erros usamos a função .catch

// NOTE Conceito funciona com o fluxo: usuario -> telefone -> telefone
usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function(resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return{
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })
    .then(function(resultado) {
        console.log(`
        
        Nome: ${resultado.usuario.nome}
        Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero} 
        Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone} 

        `)
    })
    .catch(function(error) {
        console.error('Deu ruim em', error)
    })



/* obterUsuario(function resolverUsuario(error, usuario) {
    // Em JS = null || "" || === é igual false
    if(error){
        console.error('Deu ruim em usuario', error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error){
            console.error('Deu ruim em telefone', error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error){
                console.error('Deu ruim em endereço', error)
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua},${endereco.numero},
                Telefone: (${telefone.ddd})${telefone.telefone}

            `)
        })
    })
}) */

// const telefone = obterTelefone(usuario.id)


// console.log('telefone', telefone)