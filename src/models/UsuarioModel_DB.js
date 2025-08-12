const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class Usuarios extends Model {}

//fiz esse usando classe Model para exercitar 
Usuarios.init(
  {
    id: 
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    firstname: 
        {
            type: DataTypes.STRING,
            allowNull: true 
        }, 
    surname: {
            type: DataTypes.STRING,
            allowNull: true 
        }, 
    email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true 
        }, 
    password: {
            type: DataTypes.STRING,
            allowNull: true 
        }
},
  {
    sequelize: connection,
  },
);


module.exports = Usuarios

