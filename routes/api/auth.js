const express = require('express')
const router = express.Router()
const {auth} = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')

const User = require('../../models/Usuarios');
//import {login} from '../controladores/controlUsuaio.js'
//@route GET api/auth
//desc: test route
//@publica
router.get('/', auth , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).json({msg:'server error',status:1})
    }
})

//-------------------------------------------------//

//@route POST api/auth
//@desc: Authenticate user & get token
//@access: public
router.post('/', 
[
check('password', '-password requerido-').exists(),
check('nick', '-debe incluir un email válido-').not().isEmpty()
],
async (req, res) => {
    console.log(req. body)
    const { nick, password } = req.body
   
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors :  errors.array()})
    }
    
   //check user existence
    try {
        let user = await User.findOne({nick})
        if(!user){
            return res.status(404).json({errors : [{msg: 'usuario no encontrado'}] })  
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch){ 
            return res.status(403).json({errors : [{msg: 'las credenciales no son correctas'}] }) 
        }

        //return jsonwebtoken
        
        const payload = {
            user : {
                _id: user.id,
                persona: user.persona,
                tipo: user.tipo
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err, token) => {
                if(err) throw err
                console.log(token)
                res.json({token,user:payload.user})
            })
       
        /* console.log('user created')
        res.json({msg:'datos correctos user creado', datos : req.body.name + req.body.email}) */

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'server error',status:1})
    }

    /*  res.json({msg:`user route + ${req.body.name}`}) */
   
})


module.exports = router