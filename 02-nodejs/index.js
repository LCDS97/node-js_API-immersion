/*
0 Obter um usuario
1 Obter o número de telefone de um usuario a partir do seu ID
2 Obter o endereco do usuario pelo ID
*/

function obterUsuario(callback) {
    setTimeout(function(){
        return callback (null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '1199218',
            ddd: 11
        })
    }, 2000)
}
function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dendezeiroasaa',
            numero: '400000'
        })
    }, 2000);
}

function resolverUsuario(erro, usuario){
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
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
})

// const telefone = obterTelefone(usuario.id)


// console.log('telefone', telefone)