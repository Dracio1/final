const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')

const User = require('../../models/Usuarios');

const {editarPersona} = require('../../controladores/controlPersona')

router.put('/:id',auth, editarPersona)


module.exports = router