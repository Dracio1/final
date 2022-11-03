const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')


//router.post('/',auth,nuevoComentario)

//router.put('/:id',auth,actualizarComentario)

//router.delete('/delete/:id',auth,borrarComentario)