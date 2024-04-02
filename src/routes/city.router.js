const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers.js');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT.js');

const cityRouter = express.Router();

cityRouter.route('/city')
    .get(getAll)
    .post(verifyJWT, create);

cityRouter.route('/city/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cityRouter;