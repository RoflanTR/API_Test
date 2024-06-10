const Sequelize = require('sequelize')
const sequelize = require('../dataBase/connect')
const users = sequelize.define('Users',{
id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER.UNSIGNED
},
name:{
    allowNull: false,
    type: Sequelize.STRING(50)
},
lastname:{
    allowNull: true,
    type: Sequelize.STRING(50)
},
email:{
    allowNull: false,
    type: Sequelize.STRING(50)
},
password:{
    allowNull: false,
    type: Sequelize.STRING(100)
},
gender:{
    allowNull: true,
    type: Sequelize.TINYINT(1).UNSIGNED
},
photo:{
    allowNull: true,
    type: Sequelize.STRING(50)
},
date_register:{
    allowNull: false,
    type: Sequelize.DATE
}
},
{
    timestamps: false,
    tableName: 'users'
})

module.exports = users