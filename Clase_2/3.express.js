const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.send("<h1>Mi página</h1>");
});

app.post("/pokemon", (req, res) => {
  let body = "";

  // escucar el evento de data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    //llamar a una base de datos para guardar la info
    data.timestamp = Date.now();
    res.status(201).json(data)
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
