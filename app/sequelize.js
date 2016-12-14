var Sequelize = require('sequelize'),
    sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/medical_db')

module.exports = sequelize