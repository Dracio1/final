const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotasSchema = new mongoose.Schema({
    alumno:{
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
    nota : [{calificacion:{
            type: String,
            required: true}
        },
        {documento:{
            type: String,
            required: true}
        },
        {observaciones : {
        type: String}
        },
        {fechaCreacion : {
        type:Date}
        },
        {fechaActualizacion : {
            type:Date,
            default: Date.now()}
            }
    ],
    
    
    
    
    
})

module.exports = Notas = mongoose.model('Notas', NotasSchema)