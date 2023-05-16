

const express = require('express');
const customerSchema = require('../models/customer');


var os = require('os');
if (os.platform() == 'win32') {  
    if (os.arch() == 'ia32') {
        var chilkat = require('@chilkat/ck-node16-win-ia32');
    } else {
        var chilkat = require('@chilkat/ck-node16-win64'); 
    }
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('@chilkat/ck-node16-arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('@chilkat/ck-node16-linux32');
    } else {
        var chilkat = require('@chilkat/ck-node16-linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('@chilkat/ck-node16-macosx');
}

const sendMail = (inputData, callback) => {
  var mailman = new chilkat.MailMan();
  mailman.SmtpHost = "smtp.office365.com";
  mailman.SmtpPort = 587;
  mailman.StartTLS = true;
  mailman.SmtpUsername = "ecladeron@logisticapp.us";
  mailman.SmtpPassword = "Global01.";
  var email = new chilkat.Email();
  email.Subject = "Primer correo desde Logistic App";
  email.Body = "Este es el primer correo enviado.";
  email.From = "Esteban Calderón <ecladeron@logisticapp.us>";
  var success = email.AddTo("Esteban Calderón","cr.esteban@gmail.com");

  success = mailman.SendEmail(email);
  if (success !== true) {
      console.log(mailman.LastErrorText);
      return;
  }
  success = mailman.CloseSmtpConnection();
  if (success !== true) {
      console.log("Connection to SMTP server not closed cleanly.");
  }

  console.log("Mail Sent!");

}

function send(req, res) {
  console.log("request came");
  let {to, parameters} = req.body;
  console.log("params: ", parameters);
  console.log("user: ", req.user);
  const pipeline = [
    {
        '$match': {
          'user_list': {
            '$elemMatch': {
              'user': req.user
            }
          }
        }
      }
  ];
  customerSchema.aggregate(pipeline)
    .then((data)=>{
      if(!data) res.status(404).send({message:`No se econtraron los datos del cliente para el usuario ${req.user}`});
      var templateData = data[0].email_template;
      var template = templateData.body;
      template = template.replace('[{curretYear}]',  new Date().getFullYear());
      var parameterNames = Object.keys(parameters);
      var parameterValues = Object.values(parameters);
      for (let i = 0; i < parameterNames.length; i++) {
        var param = parameterNames[i];
        var value = parameterValues[i];
        template = template.replace(`$${param}$`, `${value}`);
      }
      console.log(template);
      //TODO: ENVIAR EL CORREO
      res.status(200).send({
        result:'Correo enviado correctamente...'
      });
  })
  .catch((error)=>{console.log(error); res.json({message : error})})
  
}

module.exports = {send};