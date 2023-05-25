const express = require('express');
const api = express.Router();


const userCtrl = require('../../src/controllers/user');
const authCtrl = require('../../src/controllers/auth');
const rentalHouseController = require('../controllers/rental_house');

const auth = require('../middlewares/auth');
//const logService = require('../middlewares/billable_services_log')


api.get("/", (req, res) => {
    res.send("Welcome to my API");
});
//usuarios
api.post('/user', userCtrl.create);
api.get('/user', userCtrl.findAll);
api.put('/user/:id', auth, userCtrl.update);
api.get('/user/:id', userCtrl.findById);
api.delete('/user/:id', auth, userCtrl.remove);


//autenticaciones
api.post('/singin', authCtrl.singIn);
api.post('/singup', authCtrl.singUp);

//archivos de rental houses
// Ruta para crear una nueva propiedad de alquiler
api.post('/rentalHouse', rentalHouseController.createRentalHouse);

// Ruta para obtener todas las propiedades de alquiler
api.get('/rentalHouse', rentalHouseController.getAllRentalHouses);

// Ruta para obtener una propiedad de alquiler por su ID
api.get('/rentalHouse/:id', rentalHouseController.getRentalHouseById);

// Ruta para buscar propiedades de alquiler por el ID del usuario que las gestiona
api.get('/rentalHouse/user/:userId', rentalHouseController.getRentalHousesByUser);

// Ruta para actualizar una propiedad de alquiler por su ID
api.put('/rentalHouse/:id', rentalHouseController.updateRentalHouseById);

// Ruta para eliminar una propiedad de alquiler por su ID
api.delete('/rentalHouse/:id', rentalHouseController.deleteRentalHouseById);


//api.post('/mail', auth, logService, alertCtrl.send);

module.exports = api;