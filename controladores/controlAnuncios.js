const Persona = require('../models/Personas');
const Usuario = require('../models/Usuarios');
const Anuncio = require('../models/Anuncios');

const obtenerAnuncios = async (req,res)=>{

    try{
    
    const anuncios = await Anuncio.find({materia: ''})

    if(!anuncios) res.status(404).send({mensaje:'no se encontraron anuncios'})

    res.json(anuncios)

    }catch(error){
        console.log(error)
        res.send({mensaje:'server error',status:1})
    }

}

const obtenerAnunciosMateria = async (req,res)=>{

    try{
    
    const {materia} = req.body.materia

    const anuncios = await Anuncio.find(materia)

    if(!anuncios) return res.status(404).send({mensaje:'no hay anuncios para esta materia'})

    return res.json(anuncios)

    }catch(error){
        console.log(error)
        res.send({mensaje:'server error',status:1})
    }
}

const nuevoAnuncio = async(req,res)=>{

    try{
        const {usuario,materia,descripcion,imagen} = {...req.body}

        const user = await Usuario.findById(usuario)

        if(usuario.tipo == 'profesor'){

            const anuncio = new Anuncio({
                usuario
                ,materia
                ,descripcion
                ,imagen
            })

            anuncio.save()
        
        }
    }catch(error){
        console.log(error)
        res.send({mensaje:'server error',status:1})
    }
}

const editarAnuncio = async (req,res)=>{

    try{
    
    const {usuario,materia,descripcion,imagen,idAnuncio} = {...req.body}

    const anuncio = await Anuncio.findById(idAnuncio)
    if(!anuncio) return res.status(404).send({mensaje:'no se encontró el anuncio'})

    anuncio.usuario = usuario
    anuncio.materia = materia
    anuncio.descripcion = descripcion
    anuncio.imagen = imagen

    await anuncio.save()

    res.send({mensaje:'el anuncio se editó correctamente'})


    }catch(error){
        console.log(error)
        res.send({mensaje:'server error',status:1})
    }
}

const eliminarAnuncio = async (req,res)=>{
    
    try{
        const idAnuncio = req.body.idAnuncio
        const usuario = req.body.usuario

        const anuncio = await Anuncio.findById(idAnuncio)

        if(!anuncio) return res.json({mensaje:'no se encontró el anuncio',status:1})

        if(anuncio.usuario == usuario){
            await usuario.remove()
            return res.send({mensaje:'Anuncio eliminado'})
        }else{
            return res.json({mensaje:'el anuncio solo puede ser eliminado por su autor',status:1})
        }
    }catch(error){
        console.log(error)
        res.send({mensaje:'server error',status:1})
    }
}

const nuevoComentario = async (req,res)=>{

    const {texto,usuario,idAnuncio} = {...req.body}

    const anuncio = await Anuncio.findById(idAnuncio)
    
}