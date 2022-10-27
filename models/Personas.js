const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new mongoose.Schema({
    nombres : {
        type: String,
        required: true
    },
    apellidos : {
        type: String,
        required: true
    },
    direccion : {
        type: String
    },
    email : {
        type: String,
        required: true
    },
    
    asistencia : [{
        type: Date,
        default: Date.now
    }],
    estado : {
        type: String
    },
    telefonos : [{
        type: String
    }],
    documentos : [{imagen:{
        type: String
    },descripcion:{
        type: String
    },
    contenido:{
        type: String
    }}],
    fechaCreacion : {
        type:Date,
        default: Date.now()
    },
    
})

module.exports =  mongoose.model('Persona', PersonSchema)