const City = require("./City.js")
const Hotel = require("./Hotel.js")
const User = require("./User.js")
const Image = require( "../models/Image");
const Review = require("./Review.js");
const Booking = require("./Booking.js");

City.hasMany(Hotel)
Hotel.belongsTo(City)

Hotel.hasMany(Image)
Image.belongsTo(Hotel)

Hotel.hasMany(Review)
Review.belongsTo(Hotel)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Booking)
Booking.belongsTo(User)

Hotel.hasMany(Booking)
Booking.belongsTo(Hotel)