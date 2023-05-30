const express = require("express")
const server = express()

//Midllewere
server.use(express.json())
server.use(rotasDoServidor)

// Iniciando o servidor
server.listen(3333)
console.log("O servidor está rodando na porta 3333: http://localhost:3333") 