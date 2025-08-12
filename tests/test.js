const express = require('express');

const test = express()

test.use(express.json());

test.get('/teste/:codigo', (request, response) => {

    //Query
    const query = request.query;
    let dados = "Rota de Testes " + query.nome + " - " + query.sobrenome
    //Params
    const codigo = request.params.codigo;
    dados += "<br > params: " + codigo
    //Body
    const body = request.body
    dados += "<br > Body: " + JSON.stringify(body);
    return response.send(dados);
});
test.listen(3001, () => {
  console.log("Servidor de teste rodando em http://localhost:3001");
});