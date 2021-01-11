const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validLevels = {
    values: ['Regular', 'Bueno', 'Avanzado'],
    message: '{VALUE} No es un nivel válido'
}

let interviewers = {
    values: ['Valeria', 'Maria', 'Alejandra'],
    message: '{VALUE} '
}

let Schema = mongoose.Schema;

let candidatoSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    tel: {
        type: String,
        required: [true, 'El teléfono es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido']
    },
    englishLevel: {
        type: String,
        required: [true, 'El nivel de inglés es requerido'],
        enum: validLevels
    },
    wageAspiration: {
        type: Number,
        required: [true, 'La aspiración salarial es requerida']
    },
    interviewer: {
        type: String,
        required: [true, 'El entrevistador es obligatorio'],
        enum: interviewers
    },
    project: {
        type: String,
        required: false,
        default: ''
    },
    client: {
        type: String,
        required: false,
        default: ''
    },
    cv: {
        type: String,
        required: false
    },
    technicalLeader:{
        type: String,
        required: false
    }
});

candidatoSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('Candidato', candidatoSchema);

