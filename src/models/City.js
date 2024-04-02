const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const City = sequelize.define('city', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(100)
    },
    countryId: {
        type: DataTypes.STRING(20)
    }
});

module.exports = City;