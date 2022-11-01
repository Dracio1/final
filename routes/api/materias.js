const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')

const User = require('../../models/Usuarios');

router.get('/:idCarrera',  auth, obtenerMaterias)


router.post('/', [ auth, [
    check('nombre','El nombre es obligatorio').isEmpty(),
   
]], nuevaMateria)