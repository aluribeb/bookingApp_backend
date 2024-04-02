const catchError = require('../utils/catchError');
const Image = require('../models/Image.js');
const {uploadToCloudinary, deleteFromCloudinary} = require('../utils/cloudinary.js')
const Hotel = require('../models/Hotel.js')

const getAll = catchError(async (req, res) => {
    const result = await Image.findAll();
    return res.json(result)
});

const create = catchError(async (req, res) => {
    const {url } = await uploadToCloudinary(req.file)
    const {hotelId} = req.body
    const image = await Image.create({ url, hotelId });
    return res.status(201).json(image)
});


const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id)
    await deleteFromCloudinary(image.url)
    await image.destroy()
    return res.sendStatus(204);
});


module.exports = {
    getAll,
    create,
    remove
}