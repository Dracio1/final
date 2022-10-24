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


router.get('/:materia',  auth, obtenerNotasMateria)
router.get('/:alumno',  auth, obtenerNotasAlumno)
router.get('/:documento',  auth, obtenerNotasDocumento)


router.post('/', [ auth, [
    check('materia','la materia es obligatoria').isEmpty(),
    check('profesor','el profesor es obligatorio').isEmpty(),
    check('alumno','el alumno es obligatorio').isEmpty(),
    check('nota','la nota es obligatoria').isEmpty(),
    check('documento','el documento es obligatorio').isEmpty(),
]], nuevaNota)