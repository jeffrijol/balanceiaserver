
const customerSchema = require('../models/customer');



//create client
function create(req, res){
    const customer = CustomerSchema(req.body);
    customer.save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
}


function findAll(req, res){
    customerSchema.find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
}

//find al clients
function findById(req, res) {
    const {id} = req.params;
    customerSchema.findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};


//find al clients
function remove(req, res) {
    const {id} = req.params;
    console.log('A eliminar ', id);
    customerSchema.deleteOne({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
}

module.exports = {create, findAll, findById, remove };