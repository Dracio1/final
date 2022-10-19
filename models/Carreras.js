const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarreraSchema = new mongoose.Schema({
    nombre:{type:String,
            required:true},
    materias:{
        materia:{
            type: Schema.Types.ObjectId,
            ref: 'Materias'
        },
    }

    
})

module.exports = Carrera = mongoose.model('Carrera', CarreraSchema)