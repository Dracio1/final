const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')

const User = require('../../models/Usuarios');

const {editarPersona, obtenerPersona} = require('../../controladores/controlPersona')

router.get('/:idPersonas',auth,obtenerPersona)

router.put('/:idPersonas',[auth,
    [check('nombres','Los nombres son obligatorios').not().isEmpty().trim().escape(),
    check('apellidos','Los apellidos son obligatorios').not().isEmpty().trim().escape(),
    check('direccion','La dirección es obligatoria').not().isEmpty().trim().escape(),
    check('telefonos','Los telefonos son obligatorios').not().isEmpty(),
    check('email','El correo electrónico no es correcto').isEmail(),
    check('documentos','Los documentos son obligatorios').not().isEmpty()]], editarPersona)


module.exports = router