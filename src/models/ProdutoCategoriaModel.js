const { DataTypes } = require('sequelize');
const connection = require('../config/connection');

const ProdutoCategoria = connection.define('ProdutoCategoria', {
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // tabela correta do produto
      key: 'id'
    }
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias', // tabela correta de categorias
      key: 'id'
    }
  }
}, {
  tableName: 'product_categories',
  timestamps: false
});

module.exports = ProdutoCategoria;
