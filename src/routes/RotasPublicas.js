const express = require('express');
const jwt = require('jsonwebtoken')
const AuthController = require('../controllers/AuthController');
const  UsuariosController = require('../controllers/UsuariosController')
require('dotenv').config()

const RotasPublicas = express.Router();

RotasPublicas.post('/login', async(request, response) => {
    const body = request.body
    const auth = new AuthController()
    const dados = await auth.login(body.email, body.password)
    console.log(dados)
    if (dados){
        const token = jwt.sign(dados, process.env.APP_KEY_TOKEN, { expiresIn: '1h' })
        console.log(dados)
        return response.json({
            token: token,
            usuario: dados
        })}
    return response.status(404).json({
        message: "Login ou senha incorreto "
    })
})

RotasPublicas.post('/register', UsuariosController.criar )
module.exports = RotasPublicas