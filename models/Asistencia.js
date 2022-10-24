const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const AsistenciaSchema = new mongoose.Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    
    materia:{
        type: Schema.Types.ObjectId,
        ref: 'Materias'
    },
   
    
    fecha : {
        type:Date,
        default: Date.now()
    },
    
    
    
})

module.exports = Anuncio = mongoose.model('Anuncio', AnuncioSchema)