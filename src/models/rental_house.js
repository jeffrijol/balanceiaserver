const mongoose = require('mongoose');

const users = require('./user');


const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    contractDate: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

const RentalHouseSchema = mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Casa', 'Apartmento', 'Chalet', 'Other','Terreno'],
        required: true
    },
    constructionDate: {
        type: Date, default: Date.now(), required: false
    },
    lastReformDate: {
        type: Date, default: Date.now(), required: false
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    services: [serviceSchema],
    managedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      }
});


module.exports = mongoose.model('rental_house', RentalHouseSchema);