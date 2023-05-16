
const UserSchema = require('../models/user');



//create client
function create(req, res){
    const user = UserSchema(req.body);
    user.save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
}


function findAll(req, res){
    UserSchema.find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
}

//find al clients
function findById(req, res) {
    const {id} = req.params;
    UserSchema.findById(id)
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};

//find al clients
function update(req, res) {
    const {id} = req.params;
    const {email, pass, avatar, displayName} = req.body;
    UserSchema.updateOne({_id:id}, {$set : {email, pass, avatar, displayName}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};

//find al clients
function remove(req, res) {
    const {id} = req.params;
    UserSchema.remove({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
}

module.exports = {create, findAll, findById, update, remove };