const Persona = require('../models/Personas')
const { validationResult} = require('express-validator')


const obtenerPersona = async (req,res)=>{
    console.log('aca por lo menos tiene que llegar')
    try{
        
        console.log('este es',req.params.idPersonas)
        let persona
        if(req.params.idPersonas){ console.log('no entra o que');persona = await Persona.findById(req.params.idPersonas)}
        else{persona = await Persona.find({}); console.log('se ve que entro aca')} 

        if(!persona) return res.status(400).json({ msg:'no se encontró la persona',status:1})
        console.log(persona)
        return res.json(persona)

    }catch(error){
            
        return res.status(500).json({ msg:'server error'})
    }
}

const editarPersona = async (req,res)=>{

    try{
        const errores = validationResult(req)
        
        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        
        const {nombres,apellidos,direccion,email,asistencia,estado,telefonos,documentos} = {...req.body}

        const persona = await Persona.findById(req.params.idPersonas)

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
        console.log(error)
        return res.status(500).json({ msg:'server error'})
    }
}



exports.obtenerPersona = obtenerPersona
exports.editarPersona = editarPersona
