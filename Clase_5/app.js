import express, { json } from "express"; // require -> commonJSimport { randomUUID } from "node:crypto";
import {corsMiddleware }  from "./middlewares/cors.js";
import { createMovieRouter } from "./routes/movies.js";
import 'dotenv/config'
export const createApp = ({ movieModel }) => {

const app = express();
app.use(json());
app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express
app.use(corsMiddleware())
app.use("/movies", createMovieRouter({ movieModel}));

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
})
}
