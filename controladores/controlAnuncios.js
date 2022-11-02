const Persona = require('../models/Personas');
const Usuario = require('../models/Usuarios');
const Anuncio = require('../models/Anuncios');
const { validationResult} = require('express-validator')

const obtenerAnuncios = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        
        const anuncios = await Anuncio.find({materia: ''})

        if(!anuncios) return res.status(404).send({msg:'no se encontraron anuncios'})

        res.json(anuncios)

    }catch(error){
        
        res.status(500).json({msg:'server error',status:1})
    }

}

const obtenerAnunciosMateria = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        const anuncios = await Anuncio.find(req.params.materia)

        if(!anuncios) return res.status(404).send({msg:'no hay anuncios para esta materia',status:1})

        return res.json(anuncios)

    }catch(error){
        res.status(500).json({msg:'server error',status:1})
    }
}

const nuevoAnuncio = async(req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        const {usuario,materia,descripcion,imagen} = {...req.body}

        const user = await Usuario.findById(usuario)

        const anuncio = new Anuncio({
            usuario
            ,materia
            ,descripcion
            ,imagen
        })

        anuncio.save()
        return res.json({msg:'Nuevo anuncio agregado'})
        
    }catch(error){
        res.status(500).json({msg:'server error',status:1})
    }
}

const editarAnuncio = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        const {usuario,materia,descripcion,imagen} = {...req.body}

        const anuncio = await Anuncio.findById(req.params.idAnuncio)
        if(!anuncio) return res.status(404).json({msg:'no se encontró el anuncio'})

        anuncio.usuario = usuario
        anuncio.materia = materia
        anuncio.descripcion = descripcion
        anuncio.imagen = imagen

        await anuncio.save()

        res.json({msg:'el anuncio se editó correctamente'})


    }catch(error){
        res.status(500).json({msg:'server error',status:1})
    }
}

const eliminarAnuncio = async (req,res)=>{
    
    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        
        const usuario = req.body.usuario

        const anuncio = await Anuncio.findById(req.params.idAnuncio)

        if(!anuncio) return res.status(404).json({msg:'no se encontró el anuncio',status:1})

        if(anuncio.usuario == usuario){
            await anuncio.remove()
            return res.json({msg:'Anuncio eliminado'})
        }else{
            return res.status(404).json({msg:'el anuncio solo puede ser eliminado por su autor',status:1})
        }
    }catch(error){
        res.status(500).json({msg:'server error',status:1})
    }
}

const nuevoComentario = async (req,res)=>{

    const {texto,usuario,idAnuncio} = {...req.body}

    const anuncio = await Anuncio.findById(idAnuncio)
    
}


exports.obtenerAnuncios = obtenerAnuncios
exports.obtenerAnunciosMateria = obtenerAnunciosMateria
exports.nuevoAnuncio = nuevoAnuncio
exports.editarAnuncio = editarAnuncio
exports.eliminarAnuncio = eliminarAnuncio