const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(100)
    },
    email: {
        type: DataTypes.STRING(100), 
        unique: true
    },
    password: {
        type: DataTypes.STRING(100)
    },
    gender: {
        type: DataTypes.ENUM(['MALE', 'FEMALE', 'OTHER'])
    }
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

module.exports = User;