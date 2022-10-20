const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotasSchema = new mongoose.Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    materia:{
        type: Schema.Types.ObjectId,
        ref: 'Materia'
    },
    carrera:{
        type: Schema.Types.ObjectId,
        ref: 'Carrera'
    },
    profesor:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    nota : [{
        type: String,
        required: true
    },{}],
    observaciones : {
        type: String
    },
    
    fechaCreacion : {
        type:Date,
        default: Date.now()
    }
    ,
    
})

module.exports = Notas = mongoose.model('Notas', NotasSchema)