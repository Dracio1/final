import materias from '../models/Materias'
import carreras from '../models/Carreras'

const obtenerMaterias = async (req,res)=>{

    try{
       
        const Carrera = await carreras.findById(req.params.idCarrera)
        const cantidadMaterias = Carrera.materias.length
        let Materias = []

        if(cantidadMaterias == 0) res.send({mensaje:'La carrera no tiene materias asignadas',status:1})
        for(let i=0; i < cantidadMaterias;i++){
            let materia = await materias.findById(req.params.idCarrera.materias[i].__id)
            Materias.push(materia)
        }

        return res.json(Materias)
    }catch(error){
        console.error(err.message)
        return res.send({mensaje:'server error',status:1})
    }
    

}

const nuevaMateria = async(req,res)=>{

    try{
        const {nombre} = {...req.body}

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
        const {idMateria,nombre} = {...req.body}

        const materia = await materias.findById(idMateria)

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
        const {idMateria} = {...req.body}

        const materia = await materias.findById(idMateria)

        if(!materia) res.status(400).send('La materia no existe')

        await materia.remove()

        return res.send('La materia se eliminó correctamente')
    }catch(error){
        console.error(err.message)
        res.status(500).send('server error')
    }
    
    
}


exports.eliminarMateria= eliminarMateria
exports.editarMateria= editarMateria
exports.obtenerMaterias= obtenerMaterias