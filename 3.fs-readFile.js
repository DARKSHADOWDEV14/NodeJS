// asincrono callbak

const fs = require('node:fs')


console.log('leyendo el primer archivo...')
fs.readFile('./archive.txt', 'utf-8', (err, text)=>{
    console.log('primer error', text)
})

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo')
fs.readFile('./archive2.txt', 'utf-8', (err, text2)=>{
    console.log('segundo error', text2)
})