const express = require('express')
const router = express.Router()
const  bcrypt = require('bcryptjs')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const Usuario = require('../../models/Usuarios')

//@route POST api/users
//@desc: registration route
//@access: public
//]

router.post('/', 
[
check('nick', '-el nombre es requerido-').not().isEmpty(),
check('password', '-el password debe ser de un minimo de 6 caracteres-').isLength({min:6}),
check('email', '-debe incluir un email valido-').isEmail(),
check('nombres','el nombre es obligatorio'),
check('apellidos','el apellido es obligatorio')
],
async (req, res) => {
    
    console.log(req.body)
    
    const {nick, nombres, apellidos , email, password} = req.body

    console.log('informacion entrante=>', nick, nombres, apellidos, email, password)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
            return res.status(400).json({errors :  errors.array()})
    }

   //check user existence
    try {
        let user = await Usuario.findOne({email})
        if (user){ res.status(400).json({errors : [{msg: 'el usuario ya existe'}] })  }
        
      
        //new instance of user mongodb document model
        user = new Usuario({
            email,
            nombres,
            apellidos,            
            usuario:{tipo:'aspirante',nick,password}
        })

         //encrypt passw
        const salt = await bcrypt.genSalt(10)

        user.usuario.password = await bcrypt.hash(password, salt)
       
        await user.save()
        
        //return jsonwebtoken
        
        const payload = {
            user : {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err, token) => {
                if(err) throw err
                res.json({token})
            })
       
        /* console.log('user created')
        res.json({msg:'datos correctos user creado', datos : req.body.name + req.body.email}) */

    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }

    /*  res.json({msg:`user route + ${req.body.name}`}) */
   
})

module.exports = router