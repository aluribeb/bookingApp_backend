const User = require('../models/User');
const sequelize = require('../utils/connection');
const request = require('supertest')
const app = require('../app.js')

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user = {
            firstName: "Test",
            lastName: "Supertest",
            email: "test@gmail.com",
            password: "test1234",
            gender: "OTHER"
        }

        const userTest = await User.findOne({where: {email: "test@gmail.com"}})
        if(!userTest) {
            await request(app).post('/users').send(user)
        }

        //final de las acciones pre-tests
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();