const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // si tu id es SERIAL
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuario', // importante: nombre exacto de la tabla
  timestamps: false
});

module.exports = Usuario;
