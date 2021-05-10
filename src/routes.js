// biblioteca para criar o servidor
const express = require('express')

// função para criar as rotas 
const routes = express.Router()

// fazendo o ejs ler o views que está dentro do src
const views = __dirname + '/views/'

// dados a serem enviados para o motor para renderizar e enviar para o cliente
const profile = {
    name: "Ryam",
    avatar: "https://avatars.githubusercontent.com/u/62619168?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// criando as rotas da aplicação
routes.get('/', (req, res) => res.render(views+ 'index'))
routes.get('/job', (req, res) => res.render(views+ 'job'))
routes.get('/job/edit', (req, res) => res.render(views+ 'job-edit'))

routes.get('/profile', (req, res) => res.render(views+ 'profile', {profile}))

// exportando as rotas
module.exports = routes

