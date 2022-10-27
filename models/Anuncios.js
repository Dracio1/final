const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnuncioSchema = new mongoose.Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'user'
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
    comentario : [{
        texto: {type: String,},
        usuario:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },fechaCreacion : {
            type:Date,
            default: Date.now()
        },
    }],
    reacciones : [{tipo:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
    }]
    ,
    fechaCreacion : {
        type:Date,
        default: Date.now()
    },
})

module.exports = Anuncio = mongoose.model('Anuncio', AnuncioSchema)