// solo se utiliza en los modulos nativas que no tiene promesas nativas
// const readFilePromise = promisify(fs.readFile)
// const readFilePromise = promisify(fs.readFile)

const fs = require('node:fs')
const {promisify} = require('node:util')

const readFilePromise = promisify(fs.readFile)



console.log('leyendo el primer archivo...')
fs.readFilePromise('./archive.txt', 'utf-8')
.then(then(text =>{
    console.log('primer tecto', text)
}))
