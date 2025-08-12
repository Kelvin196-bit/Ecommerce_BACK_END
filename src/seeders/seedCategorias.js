const  Categoria  = require('../models/CategoriaModel');
const sequelize = require('../config/connection');

//a tabela categoria foi criada mas não foi populada e a chave estrangeira precisa associar a um id para funcionar por isso criei esse arquivo script que insere dados iniciais no banco de dados

async function seed() {
  await sequelize.sync({ alter: true });

  await Categoria.bulkCreate([
  { id: 1, category: 'Camisetas' },
  { id: 2, category: 'Calças' },
  { id: 3, category: 'Tênis' },
  { id: 4, category: 'Acessórios' },
]);

  console.log('Categorias populadas com sucesso!');
}

seed();
