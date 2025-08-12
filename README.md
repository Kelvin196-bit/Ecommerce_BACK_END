# 🛒 Backend - Digital Store API

Este é o backend da **Digital Store**, uma API construída em **Node.js** com **Express.js**, conectada ao **MySQL** via **Sequelize ORM**.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **Sequelize**
- **JWT** (JSON Web Token)
- **Bcrypt** (para criptografia de senhas)

---

## 🔧 Configuração Inicial

### 1. Instale as dependências

npm install

2. Configure o banco de dados
Crie um banco de dados MySQL e adicione as configurações no arquivo .env

3. Rode o seed de categorias
Antes de iniciar o servidor, é necessário popular as categorias no banco de dados:

node src/seeders/seedCategorias

4. Inicie o servidor
 npm start

Autenticação
A autenticação é feita com JWT. As senhas são protegidas com bcrypt.

Rotas públicas:

POST /login

POST /register

Rotas privadas:
Todas as demais rotas exigem token JWT válido no header:

Cadastro de Usuário
Para se cadastrar, envie um POST para /register com o seguinte payload:

{
  "firstname": "Kelv",
  "surname": "Alves",
  "email": "kelvalves.4@gmail.com",
  "password": "ktz3@90"
}

Esse usuário poderá ser usado para login via Insomnia, Postman ou diretamente no frontend.

Cadastro de Produtos
Exemplo de payload para criação de produto (rota protegida):

{
  "enabled": true,
  "name": "Tênis K-swiss V8 - Masculino",
  "slug": "Tênis K-swiss V8 - Masculino",
  "stock": 15,
  "description": "Descrição do Tênis K-swiss V8 - Masculino",
  "price": 299.9,
  "price_with_discount": 199.9,
  "category_ids": [3],
  "images": [
    {
      "content": "/products/nike-black.png"
    },
    {
      "content": "/products/nike-blue.png",
      "className": "bg-blue-100"
    },
    {
      "content": "/products/nike-black.png",
      "className": "bg-amber-100"
    },
    {
      "content": "/products/nike-green.png",
      "className": "bg-green-100"
    }
  ],
  "options": []
}

Observação: É necessário que as categorias já estejam criadas antes do cadastro (por isso o comando seedCategorias).

Os arquivos de requisições do Insomnia estão disponíveis para facilitar os testes da API. Basta importar no Insomnia para ter acesso a todas as rotas e payloads prontos.

✉️ Contato
Kelv Alves - kelvalves.4@gmail.com


