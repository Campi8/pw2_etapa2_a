const { DataTypes }  = require ('sequelize')
const db = require('../db/conn')
const User = require('../models/User')

const Thoughts = db.define('Thought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Thoughts.belongsTo(User)
User.hasMany(Thoughts)

module.exports = Thoughts