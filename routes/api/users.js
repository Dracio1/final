const express = require('express')
const router = express.Router()
const  bcrypt = require('bcryptjs')


//@route POST api/users
//@desc: registration route
//@access: public
//]

router.post('/', 
[
check('nick', '-el nombre es requerido-').not().isEmpty(),
check('password', '-el password debe ser de un minimo de 6 caracteres-').isLength({min:6}),
check('email', '-debe incluir un email valido-').isEmail(),
check('nombres','el nombre es obligatorio').not().isEmpty(),
check('apellidos','el apellido es obligatorio').not().isEmpty()
],registrarUsuario(req,res)
)

module.exports = router