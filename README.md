Descarga de programas:

Node fnm use 22.17.0 : comando para utilizar la actualización deseada
Rust : https://rust-lang.org/ -  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

para realizar un proyecto en node lo principal es descargar npm
- npm init
- npm init .y



dependencias de producción
picocolors
npm i picocolors
const picocolors = require('picocolors')
-----------------------------------------


dependencias de desarrollo
- las dependencias de desarrollo no es necesario tenerlas en producción.
npm install standar -D

"eslintConfig": {
    "extends": "standard"
}

para que funcione Eslint es necesario descargar la extension y además ingresar a Settings.JSON y colocar en true 'formatOn' y 'codeActionsOnSave' 'Default Formatter(esbendp.prettier-vscode)' 

{
  "files.autoSave": "afterDelay",
  "explorer.confirmDragAndDrop": false,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}

^ = se le llamama 'gareth' se utiliza en las dependencias para 







