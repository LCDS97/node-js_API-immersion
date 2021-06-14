// ANCHOR Callback to Promise
// SECTION requires do projeto
const { existsSync, appendFile, writeFile } = require('fs')

const readLine = require('readline')
const { promisify } = require('util')
const writeFileAsync = promisify(writeFile)
const appendFileASync = promisify(appendFile)
const terminal = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
// !SECTION
// NOTE Callback sempre são dois parametros, primeiro Erro e depois Sucesso

// NOTE Simulando o que o promisify deve fazer, mas ignorando o primeiro parametro, agora, o primeiro parametro será considera com sucesso
const functionToPromise = (func, ...args) => {
    return new Promise(resolve => func(...args, resolve))
}

const questionFunc = terminal.question.bind(terminal)
const questionAsync = msg => functionToPromise(questionFunc, `${msg}\n`)

;(async function main() {
    try {
        // await writeFileASync('./teste', 'Testando!')
        //NOTE Precisa manter o 'this' do terminal, mas question não segue padrão de callbacks (error, res), portanto não é possível transformar em promisify
        // console.log('resposta', await questionAsync('Qual seu nome?\n'))
        const filename = await questionAsync('Qual é o arquivo que deseja trabalhar?')
        const text = await questionAsync('Escreva algo para incluir')
        const fileExists = existsSync(filename)
        if(fileExists){
            await appendFileASync(filename, `\n${text}`)
            console.log(`${text} adicionado à ${filename}`)
            return;
        }

        await writeFileAsync(filename, text)
    } catch (error) {
        console.error('Deu ruim', error)
    } finally {
        console.log('Processo finalizado com sucesso!')
        terminal.close();
    }
}) ()
