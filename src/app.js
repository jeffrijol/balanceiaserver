const express = require('express');
const bodyParser = require('body-parser');
const api = require('../src/routes');
const app = express();
const cors = require("cors");

app.use(cors({origin: "*" }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api", api);

module.exports = app;