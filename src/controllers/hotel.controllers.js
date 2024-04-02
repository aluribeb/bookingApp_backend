const catchError = require('../utils/catchError');
const Hotel = require('../models/Hotel.js');
const {Op} = require('sequelize');
const City = require('../models/City.js');
const Image = require( '../models/Image.js' );
const Review = require('../models/Review.js')

const getAll = catchError(async (req, res) => {
    const {name, cityId} = req.query
    const where = {}
    if(cityId) where.cityId = cityId
    if(name) where.name = {[Op.iLike]: `%${name}%`}
    const result = await Hotel.findAll({
        include: [City, Image, Review],
        where: where,
    });
    const hotelWithRating = result.map(hotel => {
        const newsJson = hotel.toJSON()
        let sum = 0
        newsJson.reviews.forEach(review => {
            sum += review.rating
        })
        const totalReview = newsJson.reviews.length
        const average = totalReview > 0 ? sum / totalReview : 0
        delete newsJson.reviews
        return { ...newsJson, rating: average}
        
    })

    return res.json(hotelWithRating);
});

const create = catchError(async (req, res) => {
    const result = await Hotel.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Hotel.findByPk(id, {include: [City, Image] })
    if (!result) return res.status(404)
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Hotel.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Hotel.update(
        req.body,
        { where: { id }, returning: true }
    );
    if(result[0]  === 0) return res.status(404)
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}