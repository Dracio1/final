const Carreras = require('../models/Carreras')
const { validationResult} = require('express-validator')

const obtenerCarreras = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
         const carreras = await Carreras.find()

        if(!carreras) return res.send({mensaje:'Aun no existen carreras',status:1})

        res.json(carreras)
    }catch(error){
        console.error(err.message)
        res.status(500).send({mensaje:'server error',status:1})
    }

   
}

const nuevaCarrera = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }

        const {nombre,materias} = {...req.body}

        const carreras = await Carreras.find(nombre)
    
        if(carreras) return res.send({mensaje:'Ya existe una carrera con ese nombre',status:1})
    
        const carrera = new Carreras({
            nombre,materias
        })
    
        await carrera.save()
    
        res.json({mensaje:'La carrera se creó correctamente'})

    }catch(error){
        console.error(err.message)
        res.status(500).send({mensaje:'server error',status:1})
    }

   
}

const editarCarrera = async (req,res) =>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }

        const {nombre,materias,idCarrera} = {...req.body}

        const carreras = await Carreras.findById(idCarrera)
    
        if(!carreras) return res.status(400).send({mensaje:'La carrera no existe',status:1})
    
        if(!nombre){
            carreras.nombre = nombre
        }
        if(!materias){
            carreras.materias = materias
        }
    
        await carreras.save()
    
        res.json({mensaje:'La carrera se editó correctamente',status:1})
    }catch(error){
        console.error(err.message)
        res.status(500).send({mensaje:'server error',status:1})
    }
        
}

const eliminarCarrera = async (req,res)=>{
    
    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        
        const carreras = await Carreras.findById(req.params.idCarrera)

        if(!carreras) return res.send({mensaje:'La carrera no existe',status:1})

        await carreras.remove()

        res.json({mensaje:'La carrera se eliminó correctamente'})

    }catch(error){
        console.error(err.message)
        res.status(500).send({mensaje:'server error',status:1})
    }
}

exports.obtenerCarreras = obtenerCarreras
exports.nuevaCarrera = nuevaCarrera
exports.editarCarrera = editarCarrera
exports.eliminarCarrera = eliminarCarrera