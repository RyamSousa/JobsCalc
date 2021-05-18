// biblioteca para criar o servidor
const express = require('express')

// função para criar as rotas 
const routes = express.Router()

// fazendo o ejs ler o views que está dentro do src
const views = __dirname + '/views/'

// dados a serem enviados para o motor para renderizar e enviar para o cliente
const profile = {
    name: "Ryam",
    avatar: "https://github.com/ryamsousa.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}


const jobs = [
    {
        id: 1,
        name: "Project 1",
        "daily-hours": 5,
        "total-hours": 25,
        createdAt: Date.now()
    },
    {
        id: 2,
        name: "Project 2",
        "daily-hours": 4,
        "total-hours": 47,
        createdAt: Date.now()
    }
]


function reamaingDays(job){

        // Descobrindo a quantidade de dias restantes
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();

        const createdDate = new Date(job.createdAt);

        // Quantidade de dias
        const dueDay = createdDate.getDate() + Number(remainingDays);
        
        // Data de vencimento        
        const dueDateInMs = createdDate.setDate(dueDay);

        // Diferença do tempo em milissegundos (calculo de um dia para o outro)
        const timeDiffinMs = dueDateInMste - Date.now();

        // Transformar ms em dia
        const dayInMs = 1000 * 60 * 60 * 24 

        const dayDiff = Math.floor(timeDiffinMs / dayInMs)  
}

// criando as rotas da aplicação
routes.get('/', (req, res) => {
    
    const updatedJobs = jobs.map((job) => {
        // Ajustes no job        
        // calculo de tempo restante      
        
        const remaining = remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress'
        
        return {

            // espalhamento (adicionando atributos ao job)
            ...job,
            remaining,
            status,
            budget: profile['value-hour'] * job['total-hours']
        }
    });    

    return res.render(views + 'index', {jobs: updatedJobs})
})




routes.get('/job', (req, res) => res.render(views + 'job'))
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }))


routes.post('/job', (req, res) => {
    // corpo da requisição com os atributos, nome, horas por dia, etc...

    const lastId = jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createdAt: Date.now() // Nova data (data de hoje) 
    })

    return res.redirect('/')
})

// exportando as rotas
module.exports = routes

