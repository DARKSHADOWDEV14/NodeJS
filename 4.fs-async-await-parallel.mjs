// solo se utiliza en los modulos nativas que no tiene promesas nativas
// const readFilePromise = promisify(fs.readFile)
// const readFilePromise = promisify(fs.readFile)

// asincrono paralelo

import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./archive.txt', 'utf-8'),
    readFile('./archive2.txt', 'utf-8')
]).then(([text, secondText])=>{
    console.log('primer texto:', text)
    console.log('segundo texto:', secondText)
})

