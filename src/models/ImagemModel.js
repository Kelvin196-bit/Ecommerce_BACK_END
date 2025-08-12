const { DataTypes } = require('sequelize');
const connection = require('../config/connection');

const Imagem = connection.define('Imagem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    type: DataTypes.STRING
  },
  className: {
    type: DataTypes.STRING,
    allowNull: true 
  }
}, {
  tableName: 'product_images',
  timestamps: false
});

module.exports = Imagem;
