const { getAll, create, getOne, remove, update } = require('../controllers/review.controllers.js');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT.js')

const reviewRouter = express.Router();

reviewRouter.route('/reviews')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

reviewRouter.route('/reviews/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = reviewRouter;