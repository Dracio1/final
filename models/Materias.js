const  mongoose = require('mongoose')

const MateriasSchema = new mongoose.Schema({
    nombre:{type:String,
            required:true},
    

    
})

module.exports = Materias = mongoose.model('Materias', MateriasSchema)