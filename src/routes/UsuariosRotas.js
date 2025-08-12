const express = require('express');
const UsuariosController = require('../controllers/UsuariosController')
const UsuariosRotas = express.Router();


UsuariosRotas.get('/v1/user/', UsuariosController.listar)
UsuariosRotas.get('/v1/user/:id', UsuariosController.consultarPorId)
// UsuariosRotas.post('/v1/user', UsuariosController.criar) movido para rotas publicas pois cadastro não precisa de autenticação
UsuariosRotas.put('/v1/user/:id', UsuariosController.atualizar)
UsuariosRotas.delete('/v1/user/:id', UsuariosController.deletar)
UsuariosRotas.post('/v1/user/:id', UsuariosController.consultarPorId)

module.exports= UsuariosRotas;