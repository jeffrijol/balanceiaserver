const express = require('express');
const rentalHouseSchema = require('../models/rental_house');

//create template
function create(req, res) {
    console.log(req.body);
    const billFiles = rentalHouseSchema(req.body);
    billFiles.save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};
//find all templates
function findAll(req, res) {
  rentalHouseSchema.find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};

//find template by code
function find(req, res) {
  const {code} = req.params;
  const pipeline = [
    {
      '$match': {
        'codigo': code
      }
    }
  ];
  rentalHouseSchema.aggregate(pipeline)
  .then((data)=>{
      if(!data) res.status(404).send({message:`No existe la platilla con código ${code}`});
      res.status(200).send({
        template:data
      });
  })
  .catch((error)=>{
      res.status(200).send({
          error
      });
  })
};


//find al clients
function update (req, res) {
    const {id} = req.params;
    const {code, templateHtml} = req.body;
    rentalHouseSchema.updateOne({_id:id}, {$set : {code, templateHtml}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};

//find al clients
function remove(req, res) {
    const {id} = req.params;
    rentalHouseSchema.remove({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};

module.exports = {create, findAll, update, remove, find};