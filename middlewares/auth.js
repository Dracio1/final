const jwt = require('jsonwebtoken')
const config = require('config')

const Usuario = require('../models/Usuarios')

const auth = function(req, res, next)  {
    //get token f. header
    const token = req.header('x-auth-token')
    //check token
    if(!token){
        return res.status(401).json({msg: 'no token, unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        //console.log('DECODED => ', decoded)

        //attach user at req and pass to next mware.
        req.user = decoded.user 

        next()

    } catch (error) {
        res.status(401).json({msg: 'unvalid token'})
    }
}

const esProfe = async (req,res,next)=>{
    try{
        const idUsuario = req.body.usuario
        const usuario = await Usuario.findById(idUsuario)

        if(usuario.tipo != 'Profesor'){
            res.json({msg:'Solo los profesores pueden acceder a esta función'})
        }
        next()
    } catch (error) {
        res.status(401).json({msg: 'unvalid token'})
    }
}

const esAdmin = async (req,res,next)=>{
    try{
        const idUsuario = req.body.usuario
        const usuario = await Usuario.findById(idUsuario)

        if(usuario.tipo != 'Administrador'){
            res.json({msg:'Solo los Administradores/Preceptores pueden acceder a esta función'})
        }
        next()
    } catch (error) {
        res.status(401).json({msg: 'unvalid token'})
    }
}

exports.auth = auth
exports.esProfe = esProfe
exports.esAdmin = esAdmin