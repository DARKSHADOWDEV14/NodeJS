// import del futuro, el codigo de abajo también valido y correcto, pero el de arriba es más moderno y recomendado para ESModules
//import movies from "./movies.json" with {type: "json"};
// como leer  un json en ESMOdules recomendado por ahora

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)