const  mongoose = require('mongoose')

const AnuncioSchema = new mongoose.Schema({
    tipo : {
        type: String,
        required: true
    },
    materia : {
        type: String,
        required: true
    },
    descripcion : {
        type: String,
        required: true
    },
    imagen : {
        type: String,
        required: true
    },
    comentario : {
        type: String
    },
    reacciones : [{tipo:{
        type: String
    },
    }],
    
})

module.exports = Anuncio = mongoose.model('Anuncio', AnuncioSchema)