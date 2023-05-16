
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 9000;

//mongoDB connection
mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB Atlass');
    
})
.catch((error)=>{console.error(error)});

app.listen(port, ()=>{
    console.log('Server is stared, port: ', port);
});