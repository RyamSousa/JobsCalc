// biblioteca para criar o servidor
const express = require('express')

// função para criar as rotas 
const routes = express.Router()

// fazendo o ejs ler o views que está dentro do src
const views = __dirname + '/views/'

// dados a serem enviados para o motor para renderizar e enviar para o cliente
const Profile = {
    data: {
        name: "Ryam",
        avatar: "https://github.com/ryamsousa.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(req, res) {
            return res.render(views + 'profile', { profile: Profile.data })
        },
        update(req, res) { 

            const data = req.body

            const weeksPerYear = 52

            // Remover semanas de férias do ano e pegar quantas semanas tem 1 mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
           
            // Total de horas trabalhadas na semana
            const weeksTotalHours = data["hours-per-day"] * data["days-per-week"]
            
            // Total de horas trabalhadas no mês
            const monthlyTotalHours = weeksTotalHours * weeksPerMonth

            // Valor das horas de Trabalhos
            data["value-hour"] = data["monthly-budget"] / monthlyTotalHours
            
            Profile.data = data

            // Outra maneira de fazer
            /*valueHour = = data["monthly-budget"] / monthlyTotalHours
            
            Profile.data = {
                ...Profile.data,
                ...req.body, 
                "value-hour": valueHour
            }*/

            return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Project 1",
            "daily-hours": 2,
            "total-hours": 1,
            createdAt: Date.now()
        },
        {
            id: 2,
            name: "Project 2",
            "daily-hours": 4,
            "total-hours": 47,
            createdAt: Date.now()
        },
        {
            id: 3,
            name: "Project 3",
            "daily-hours": 5,
            "total-hours": 71,
            createdAt: Date.now()
        }
    ],

    controllers: {
        index(req, res) {

            const updatedJobs = Job.data.map((job) => {
                // Ajustes no job        
                // calculo de tempo restante      

                 const remaining = Job.services.remainigDays(job);

                const status = remaining <= 0 ? 'done' : 'progress'

                return {

                    // espalhamento (adicionando atributos ao job)
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data['value-hour'] * job['total-hours']
                }
            });

            return res.render(views + 'index', { jobs: updatedJobs })


        },
        create(req, res) {
            return res.render(views + 'job')
        },
        save(req, res) {

            // corpo da requisição com os atributos, nome, horas por dia, etc...
            const lastId = Job.data[Job.data.length - 1]?.id || 1;

            // Adicionando Job ao vetor
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createdAt: Date.now() // Nova data (data de hoje) 
            })

            return res.redirect('/')
        }
    },

    services: {
        remainigDays(job) {

            // Descobrindo a quantidade de dias restantes
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

            const createdDate = new Date(job.createdAt)

            // Quantidade de dias
            const dueDay = createdDate.getDate() + Number(remainingDays);

            // Data de vencimento        
            const dueDateInMs = createdDate.setDate(dueDay);

            // Diferença do tempo em milissegundos (calculo de um dia para o outro)
            const timeDiffinMs = dueDateInMs - Date.now();

            // Transformar ms em dia
            const dayInMs = 1000 * 60 * 60 * 24

            // Dias restantes
            const dayDiff = Math.floor(timeDiffinMs / dayInMs)


            return dayDiff
        }
    }
}

// criando as rotas da aplicação

// Faz a atualização dos jobs
routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

routes.get('/job/edit', Profile.controllers.update)

routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)




// exportando as rotas
module.exports = routes

