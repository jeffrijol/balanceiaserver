const express = require('express');
const api = express.Router();


const userCtrl = require('../../src/controllers/user');
const authCtrl = require('../../src/controllers/auth');

const alertCtrl = require('../controllers/mail');
const billFileList = require('../controllers/bill_files');
const customerCtrl = require('../controllers/customer');
const rentalHouseCtrl = require('../controllers/rental_house');
const auth = require('../middlewares/auth');
const logService = require('../middlewares/billable_services_log')


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

//archivos de facturas
api.post('/bill_files', auth, billFileList.create);
api.get('/bill_files', auth, billFileList.findAll);
api.get('/bill_files/:bill_id', auth, billFileList.find);
api.put('/bill_files/:bill_id', auth, billFileList.update);
api.delete('/bill_files/:bill_id', auth, billFileList.remove);

//archivos de facturas
api.post('/customer', auth, customerCtrl.create);
api.get('/customer', auth, customerCtrl.findAll);
api.delete('/customer/:id', auth, customerCtrl.remove);

//archivos de rental houses
api.post('/rentalHouse', rentalHouseCtrl.create);
api.get('/rentalHouse', auth, rentalHouseCtrl.findAll);
api.delete('/rentalHouse/:id', auth, rentalHouseCtrl.remove);


api.post('/mail', auth, logService, alertCtrl.send);





module.exports = api;