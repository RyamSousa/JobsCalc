// biblioteca para criar o servidor
const express = require("express")

// importando as rotas do arquivo routes.js
const routes = require("./routes")

// importando a função necessária para atribuir configurações para o servidor
const server = express()

// setando ejs no server
server.set('view engine', 'ejs')

// Usabdo o req.body (liberando o body da requisição)
server.use(express.urlencoded({extended: true}))

// criando rotas dps arquivos estáticos da pasta public
server.use(express.static('public'))

// usando as rotas criadas no rout.js
server.use(routes)

// iniciandp o servidor na porta 3000
server.listen(5000, () => {console.log("rodando...")});
