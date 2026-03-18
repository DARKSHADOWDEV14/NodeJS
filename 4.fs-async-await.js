// solo se utiliza en los modulos nativas que no tiene promesas nativas
// const readFilePromise = promisify(fs.readFile)
// const readFilePromise = promisify(fs.readFile)

//IIFE = inmediatelly invoked function expression

// asincrono secuencial

const { readFile } = require('node:fs/promises')

    ; (async () => {

        console.log('leyendo el primer archivo...')
         const text =  await readFile('./archive.txt', 'utf-8')
            console.log('primer error', text)
        

        console.log('Hacer cosas mientras lee el archivo...')

        console.log('Leyendo el segundo archivo')
        const secondText = await readFile('./archive2.txt', 'utf-8')
            console.log('segundo error', secondText)
        
    })()

