const express = require('express');
const UsuariosRotas = require('./UsuariosRotas');
const ProdutosRotas = require('./ProdutosRotas')
const autenticacao = require('../middleware/autenticacao')

const RotasPrivadas = express.Router();

RotasPrivadas.use(autenticacao)

RotasPrivadas.use(UsuariosRotas)

RotasPrivadas.use(ProdutosRotas)

module.exports = RotasPrivadas