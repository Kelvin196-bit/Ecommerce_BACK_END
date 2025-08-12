const Produto = require('./ProdutoModel_DB');
const Categoria = require('./CategoriaModel');
const Imagem = require('./ImagemModel');
const Opcao = require('./OpcaoModel');
const ProdutoCategoria = require('./ProdutoCategoriaModel'); // tabela de junção

// Relações 1:N
Produto.hasMany(Imagem, { foreignKey: 'produto_id', as: 'images' });
Imagem.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });

Produto.hasMany(Opcao, { foreignKey: 'produto_id', as: 'options' });
Opcao.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });

// Relações N:N corretas usando a tabela de junção ProdutoCategoria
Produto.belongsToMany(Categoria, {
  through: ProdutoCategoria,
  foreignKey: 'produto_id',
  otherKey: 'categoria_id',
  as: 'categorias'
});

Categoria.belongsToMany(Produto, {
  through: ProdutoCategoria,
  foreignKey: 'categoria_id',
  otherKey: 'produto_id',
  as: 'products'
});

module.exports = {
  Produto,
  Categoria,
  Imagem,
  Opcao,
  ProdutoCategoria
};
