require('./database/sync');
require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors');
//proteção do navegador
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const RotasPrivadas = require('./routes/RotasPrivadas');
const RotasPublicas = require('./routes/RotasPublicas');

const host = "localhost"
const port = 3000



app.use(express.json())

app.get('/', (request, response) => {
    return response.send("olá, eu sou o Backend")
})

app.use('/api/public', RotasPublicas)
//Rotas Privadas
app.use('/api/private', RotasPrivadas)

//estabelecendo a conexão
app.listen(port, host, () =>{
    console.log(`servidor executando em http://${host}:${port}`)
})
