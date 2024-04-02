const catchError = require('../utils/catchError');
const User = require('../models/User.js');
const bcrypt = require("bcrypt");
const jwt = require( "jsonwebtoken" );

const getAll = catchError(async (req, res) => {
    const result = await User.findAll();
    return res.json(result)
});

const create = catchError(async (req, res) => {
    const { firstName, lastName, email, password, gender } = req.body;
    const encriptedPassword = await bcrypt.hash(password, 10)
    const result = await User.create({
        firstName,
        lastName,
        email,
        password: encriptedPassword,
        gender
    });
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if (!result) return res.status(404)
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, gender } = req.body;
    const result = await User.update(
        { firstName, lastName, email, gender },
        { where: { id }, returning: true }
    );
    return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ message: 'User not found' })
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(401).json({ message: 'Invalid Password' })
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
    )
    return  res.json({user, token})
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}