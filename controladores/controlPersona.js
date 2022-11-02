const Persona = require('../models/Personas')
const { validationResult} = require('express-validator')

const editarPersona = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }

        const {nombres,apellidos,direccion,email,asistencia,estado,telefonos,documentos} = {...req.body}

        const persona = await Persona.findById(req.params.id)

        if(!persona) return res.status(400).json({ msg:'no se encontró la persona',status:1})

        persona.nombres = nombres
        persona.apellidos = apellidos
        persona.direccion = direccion
        persona.email = email
        persona.asistencia = asistencia
        persona.estado = estado
        persona.telefonos = telefonos
        persona.documentos = documentos

        await persona.save()

        return res.send({mensaje:'Se guardaron los cambios'})

    }catch(error){
            
        return res.status(500).json({ msg:'server error'})
    }
}

exports.editarPersona = editarPersona