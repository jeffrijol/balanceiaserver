const express = require('express');
const billFilesSchema = require('../models/bill_files');

//create template
function create(req, res) {
    console.log(req.body);
    const billFiles = billFilesSchema(req.body);
    billFiles.save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};
//find all templates
function findAll(req, res) {
  billFilesSchema.find()
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
  billFilesSchema.aggregate(pipeline)
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
    billFilesSchema.updateOne({_id:id}, {$set : {code, templateHtml}})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};

//find al clients
function remove(req, res) {
    const {id} = req.params;
    billFilesSchema.remove({_id: id})
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message : error}))
};

module.exports = {create, findAll, update, remove, find};