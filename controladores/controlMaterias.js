const {materias} = require('../models/Materias')
const {carreras} = require('../models/Carreras')
const { validationResult} = require('express-validator')

const obtenerMateriasCarrera = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
       
        const Carrera = await carreras.findById(req.params.idCarrera)
        const cantidadMaterias = Carrera.materias.length
        let Materias = []

        if(cantidadMaterias == 0) return res.send({mensaje:'La carrera no tiene materias asignadas',status:1})
        for(let i=0; i < cantidadMaterias;i++){
            let materia = await materias.findById(Carrera.materias[i].__id)
            Materias.push(materia)
        }

        return res.json(Materias)
    }catch(error){
        console.error(err.message)
        return res.send({mensaje:'server error',status:1})
    }
    

}

const obtenerMaterias = async (req,res)=>{
    const materia = await materias.find({})
    if(!materia) return res.status(400).json({msg:'La carrera no tiene materias asignadas',status:1}) 

    return res.json(materia)
}

const nuevaMateria = async(req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        const {nombre} = req.body.nombre

        const Carrera = await carreras.find(nombre)

        if(Carrera) return res.send({mensaje:'Ya existe una materia con ese nombre',status:1})

        const carrera = new carreras({nombre})

        await carrera.save()

        return res.send({mensaje:'Carrera guardada correctamente'})

    }catch(error){
        console.error(err.message)
        return res.send({mensaje:'server error',status:1})
    }
    
    
}

const editarMateria = async(req,res)=>{
    
    try{

        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }

        const {nombre} = req.body.nombre

        const materia = await materias.findById(req.params.idMateria)

        if(!materia) res.status(400).send('La materia no existe')

        materia.nombre = nombre

        await materia.save()

        return res.send({mensaje:'La materia se editó correctamente'})
    }catch(error){
        console.error(err.message)
        res.send({mensaje:'server error',status:1})
    }
    

}


const eliminarMateria = async(req,res)=>{
    
    try{

        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }

        const materia = await materias.findById(req.params.idMateria)

        if(!materia) res.status(400).send('La materia no existe')

        await materia.remove()

        return res.send('La materia se eliminó correctamente')
    }catch(error){
        
        return res.status(500).send('server error')
    }
    
    
}


exports.eliminarMateria= eliminarMateria
exports.editarMateria= editarMateria
exports.obtenerMateriasCarrera= obtenerMateriasCarrera
exports.nuevaMateria= nuevaMateria
exports.obtenerMaterias = obtenerMaterias