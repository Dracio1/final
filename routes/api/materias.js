const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')

const User = require('../../models/Usuarios');

const {eliminarMateria, editarMateria, obtenerMaterias,obtenerMateriasCarrera, nuevaMateria} = require('../../controladores/controlMaterias')

router.get('/',  auth, obtenerMaterias)
router.get('/:idMateria',  auth, obtenerMateriasCarrera)


router.post('/', [ auth, [
    check('nombre','El nombre es obligatorio').isEmpty(),
   
]], nuevaMateria)

router.put('/:idMateria',  [ auth, [
    check('nombre','El nombre es obligatorio').isEmpty(),
   
]], editarMateria)

router.delete('/:idMateria',  auth, eliminarMateria)

module.exports = router