const express = require("express");
const desiredPort = process.env.PORT ?? 1234;
const app = express();

// con este código se desactiva y se evitan problemas de seguridad
app.disable('x-powered-by') 

app.use(express.json()) // lo siguiente es como funciona express

// app.use((req, res, next) =>{

//   if (req.method === 'POST') return next()
//     if (req.headers['content-type'] === 'application/json')
//       return next()

//   // solo llegan request que son de POST y que tienen el header Content-type: application/json
//   let body = ''
//   // escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.tostring()
//   })

//   req.on('end', () =>{
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // mutar la request y meter la información en el req.body
//     req.body = data
//     next() 
//   })
//   console.log('mi pirmer middleware')
//   // trackear la request a la base de datos
//   // revisar si el usuario tiene cookies

  
// })

app.get.apply('/pokemos/ditto', (req, res)=>{
  res.json(ditto)

})

app.post('/pokemon', (req, res)=>{
  let body = ''

  // escuchar el evento data

  req.on('data', chunk =>{
    body += chunk.tostring()
  })

  req.on('end', () =>{
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

app.use((req, res)=>{
  res.status(404).send('<h1>404</h1>')
})


app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
