require('./config/config');

const express = require('express')
const mongoose = require('mongoose')
const app = express()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));
app.use(require('./routes/candidato'));

mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true, useUnifiedTopology: true}, (error, res) =>{
    if(error){
        throw error;
    }else{
        console.log("Base de datos online");
    }
});

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto: ", 3000);
})