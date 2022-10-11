const  mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
    notas : [
        {materia:{
            type: String
        },
        calificaion:{
            type:String
        }
    }],

    usuario : {tipo:{
        type: String,
        required: true
    },
    nick : {
            type: String,
            required: true
        },
    password : {
        type: String,
        required: true
    },
    avatar : {
        type: String
    },
    },
})

module.exports = User = mongoose.model('user', UserSchema)