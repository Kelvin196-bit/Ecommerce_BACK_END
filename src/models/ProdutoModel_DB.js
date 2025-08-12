const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');


const Produto = connection.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  price_with_discount: {
    type: DataTypes.FLOAT
  },
}, {
  tableName: 'products', // nome real da tabela no banco
  timestamps: true,      
});

module.exports = Produto;