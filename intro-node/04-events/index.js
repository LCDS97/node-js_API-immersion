// ANCHOR Events Emitter

const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:Click'
meuEmissor.on(nomeEvento, function(click) {
    console.log('Um usúario clicou', click)
})

/* meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

let count = 0
setInterval(function() {
    meuEmissor.emit(nomeEvento, 'no ok' + count ++)
}, 1000) */

// NOTE Esperando evento, preciso estudar mais sobre esse conceito
const stdin = process.openStdin()
stdin.addListener('data', function(value) {
    console.log(`Você digitou: ${value.toString().trim()}`)
})