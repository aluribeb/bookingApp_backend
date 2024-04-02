const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {logging:false }) // el loggin es para que sequelize no me envie tanta información basura

module.exports = sequelize;