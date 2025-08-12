const { DataTypes } = require('sequelize');
const connection = require('../config/connection');

const Opcao = connection.define('Opcao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING
  },
  valor: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'product_options',
  timestamps: false
});

module.exports = Opcao;
