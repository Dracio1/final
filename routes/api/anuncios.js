const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')

router.get('/',auth,obtenerAnunciosGeneral)

router.get('/:idMateria',auth,obtenerAnunciosMateria)

router.post('/',auth,nuevoAnuncio)

router.put('/:idAnuncio',auth,actualizarAnuncio)

router.delete('/delete/:idMateria',auth,borrarAnuncio)