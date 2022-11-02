const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const {obtenerAnuncios,obtenerAnunciosMateria,nuevoAnuncio,editarAnuncio,eliminarAnuncio} = require('../../controladores/controlAnuncios')

router.get('/',auth,obtenerAnunciosGeneral)

router.get('/:idMateria',auth,obtenerAnunciosMateria)

router.post('/',auth,nuevoAnuncio)

router.put('/:idAnuncio',auth,actualizarAnuncio)

router.delete('/:idAnuncio',auth,borrarAnuncio)