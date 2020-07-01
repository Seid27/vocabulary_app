const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

//connecting to database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise;
mongoose.connection
.on('connected',()=>{
    console.log(`mongoose connection on ${process.env.DATABASE}`);
})
.on('error',(error)=>{
    console.log(`connection error ${error.message}`);
})

app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use('/',routes);

module.exports = app;