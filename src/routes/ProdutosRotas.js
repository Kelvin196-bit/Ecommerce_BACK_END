const express = require('express');
const ProdutosController = require('../controllers/ProdutosController');
ProdutosRotas = express.Router();


ProdutosRotas.get('/v1/product/search', ProdutosController.buscarProdutos)
ProdutosRotas.get('/v1/product/:id', ProdutosController.consultarPorId)
ProdutosRotas.post('/v1/product', ProdutosController.criar)
ProdutosRotas.put('/v1/product/:id', ProdutosController.atualizar)
ProdutosRotas.delete('/v1/product/:id', ProdutosController.deletarProduto)

module.exports = ProdutosRotas;