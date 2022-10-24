import Carreras from '../models/Carreras'

const obtenerCarreras = async (req,res)=>{

    try{
         const carreras = await Carreras.find()

        if(!carreras) return res.status(400).send('Aun no existen carreras')

        res.json(carreras)
    }catch(error){
        console.error(err.message)
        res.status(500).send('server error')
    }

   
}

const nuevaCarrera = async (req,res)=>{


    try{
        const {nombre,materias} = {...req.body}

        const carreras = await Carreras.find(nombre)
    
        if(carreras) return res.status(400).send('Ya existe una carrera con ese nombre')
    
        const carrera = new Carreras({
            nombre,materias
        })
    
        await carrera.save()
    
        res.json('La carrera se creó correctamente')

    }catch(error){
        console.error(err.message)
        res.status(500).send('server error')
    }

   
}

const editarCarrera = async (req,res) =>{

    try{
        const {nombre,materias,idCarrera} = {...req.body}

        const carreras = await Carreras.findById(idCarrera)
    
        if(!carreras) return res.status(400).send('La carrera no existe')
    
        if(!nombre){
            carreras.nombre = nombre
        }
        if(!materias){
            carreras.materias = materias
        }
    
        await carreras.save()
    
        res.json('La carrera se editó correctamente')
    }catch(error){
        console.error(err.message)
        res.status(500).send('server error')
    }
        
}

const eliminarCarrera = async (req,res)=>{
    
    try{
        const {idCarrera} = {...req.body}

        const carreras = await Carreras.findById(idCarrera)

        if(!carreras) return res.status(400).send('La carrera no existe')

        await carreras.remove()

        res.json('La carrera se eliminó correctamente')

    }catch(error){
        console.error(err.message)
        res.status(500).send('server error')
    }
}