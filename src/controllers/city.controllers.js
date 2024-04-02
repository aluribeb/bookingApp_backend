const catchError = require('../utils/catchError');
const City = require('../models/City.js');
const Hotel = require('../models/Hotel.js')
const Image = require('../models/Image.js');
const User = require('../models/User.js');


const getAll = catchError(async (req, res) => {
    const result = await City.findAll({
        // include: [{ 
        //     model: Hotel, 
        //     // include: [Image, City]
        // }]
    });
    console.log("Me ejecute")
    return res.json(result)
});

const create = catchError(async (req, res) => {
    const { name, country, countryId } = req.body;
    const result = await City.create({
        name,
        country, 
        countryId
    });
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await City.findByPk(id, {include:[{
        model: Hotel,
        include: [Image,City]
    }]});
    if (!result) return res.sendStatus(404)
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await City.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await City.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}