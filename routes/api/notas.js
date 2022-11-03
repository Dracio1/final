const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')

const User = require('../../models/Usuarios');
const Materia = require('../../models/Materias');
const Nota = require('../../models/Notas');

const {obtenerNotasAlumno,obtenerNotasMateria,nuevaNota,actualizarNota,promedioNotasMateria,promedioNotasAlumno} = require('../../controladores/controlNotas')

router.get('/materia/:materia',  auth, obtenerNotasMateria)
router.get('/alumno/:alumno',  auth, obtenerNotasAlumno)
router.get('/documento/:documento',  auth, obtenerNotasDocumento)


router.post('/', [ auth, [
    check('materia','la materia es obligatoria').isEmpty(),
    check('profesor','el profesor es obligatorio').isEmpty(),
    check('alumno','el alumno es obligatorio').isEmpty(),
    check('nota','la nota es obligatoria').isEmpty(),
    check('documento','el documento es obligatorio').isEmpty(),
]], nuevaNota)

router.put('/:nota',[ auth, [
    check('materia','la materia es obligatoria').isEmpty(),
    check('profesor','el profesor es obligatorio').isEmpty(),
    check('alumno','el alumno es obligatorio').isEmpty(),
    check('nota','la nota es obligatoria').isEmpty(),
    check('documento','el documento es obligatorio').isEmpty(),
]],actualizarNota)

router.get('/materia/:materia',auth,promedioNotasMateria)

router.get('/alumno/:alumno',auth,promedioNotasAlumno)


module.exports = router