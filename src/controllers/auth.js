
const mongoose = require('mongoose');
const UserSchema = require('../models/user');
const tokenService = require('../services/index');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

function singUp(req, res){
    const user = UserSchema(req.body);
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(user.pass, salt, null, (error, hash) => {
            if(error) return next(error);
            user.pass = hash;
        })
    });
    if(!user.email){
        user.avatar = `https://gravatar.com/avatar/?s=200px=retro`;
    } else{
        const md5 = crypto.createHash('md5').update(user.email).digest('hex');
        user.avatar =  `https://gravatar.com/avatar/${md5}`
    }
    

    user.save()
    .then((data)=>res.status(200).send({ token: tokenService.createToken(user)}))
    .catch((error)=>res.status(500).send({message:'Error al crear el usuario', error}))

}


function singIn(req, res){
    
    const email = req.body.email;
    const pipeline = [
        {
          '$match': {
            'email': email
          }
        }
      ];
    UserSchema.aggregate(pipeline)
    .then((data)=>{
        if(!data) res.status(404).send({message:'No existe el usuario'});
        console.log(data);
        res.status(200).send({
            user:data[0],
            token: tokenService.createToken(data[0])
        });
    })
    .catch((error)=>{
        res.status(200).send({
            error
        });
    })
}

module.exports = {
    singUp, singIn
}