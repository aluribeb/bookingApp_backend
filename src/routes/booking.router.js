const { getAll, create, getOne, remove, update } = require('../controllers/booking.controllers.js');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT.js')

const bookingRouter = express.Router();

bookingRouter.route('/bookings')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

bookingRouter.route('/bookings/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = bookingRouter;