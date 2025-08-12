const { DataTypes } = require('sequelize');
const connection = require('../config/connection');

const Categoria = connection.define('Categoria', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  category: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'categorias',
  timestamps: false
});

module.exports = Categoria;
