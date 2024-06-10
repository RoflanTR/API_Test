const Sequelize = require('sequelize')
const sequelize = require('../dataBase/connect')
const genders = sequelize.define('Genders',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.TINYINT(1).UNSIGNED
},
gender:{
    allowNull: false,
    type: Sequelize.STRING(7)
}
},
{
    timestamps: false,
    tableName: 'genders'
})

module.exports = genders