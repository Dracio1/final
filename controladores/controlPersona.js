const Persona = require('../models/Personas')

const editarPersona = async (req,res)=>{
    const {nombres,apellidos,direccion,email,asistencia,estado,telefonos,documentos,idPersona} = {...req.body}

    const persona = await Persona.find(idPersona)

    if(!persona) return res.status(400).send('no se encontró la persona')

    persona.nombres = nombres
    persona.apellidos = apellidos
    persona.direccion = direccion
    persona.email = email
    persona.asistencia = asistencia
    persona.estado = estado
    persona.telefonos = telefonos
    persona.documentos = documentos

    await persona.save()

    return res.status(200).send({mensaje:'Se guardaron los cambios'})

   
}

exports.editarPersona = editarPersona