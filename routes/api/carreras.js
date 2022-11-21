const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')

const carrera = require('../../models/Carreras');

const { cookie } = require('request')

const {obtenerCarreras,nuevaCarrera,editarCarrera,eliminarCarrera} = require('../../controladores/controlCarreras')
//@route POST api/posts
//desc: create post
//@private
router.get('/',  obtenerCarreras)


router.post('/', [ auth, [
    check('nombre','El nombre es obligatorio').isEmpty(),
    check('materia','La materia es obligatoria').isEmpty()
]], nuevaCarrera)
router.put('/', [ auth, [
    check('nombre','El nombre es obligatorio').isEmpty(),
    check('materia','La materia es obligatoria').isEmpty()
]], editarCarrera)
router.delete('/', [ auth, ], eliminarCarrera)

module.exports = router