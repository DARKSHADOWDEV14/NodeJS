// .js ->> por defecto utliza CommonJS
// .mjs ->> para utilizar ES Modules
// .cjs ->> para utilizr CommonJs

import {sum, mult, sub, div } from './sum.mjs'

console.log(sum(1,2))
console.log(mult(1,2))
console.log(sub(1,2))
console.log(div(1,2))