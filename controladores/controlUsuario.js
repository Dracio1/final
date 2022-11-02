const Persona = require('../models/Personas');
const Usuario = require('../models/Usuarios');
const {bcrypt} = require('bcryptjs');
const { check, validationResult} = require('express-validator')
const config =require('config')
const jwt = require('jsonwebtoken')

const registroUsuario = async  (req, res) => {
    
    
    const {nick, nombres, apellidos , email, password} = req.body

    console.log('informacion entrante=>', nick, nombres, apellidos, email, password)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
            return res.status(400).json({msg :  errors.msg})
    }

   //check user existence
    try {
        let persona = await Persona.findOne({email})
        let user  = await Persona.findOne({nick})
        if (persona)return res.status(400).json({msg: 'el usuario ya existe'})
        if (user)return res.status(400).json({msg: 'el nombre de usuario ya existe'})  
        
      
        //new instance of persona mongodb document model
        persona = new Usuario({
            email,
            nombres,
            apellidos      
           
        })      
        await persona.save()

        //new instance of user mongodb document model
        user = new Usuario({
            tipo:'aspirante'
            ,nick
            ,password
            ,persona : persona.id

        })

         //encrypt passw
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)
       
        await user.save()
        
        //return jsonwebtoken
        
        const payload = {
            user : {
                id: user.id
            }
        }

        return jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err, token) => {
                if(err) throw err
                return res.json({token})
            })
       
        /* console.log('user created')
        res.json({msg:'datos correctos user creado', datos : req.body.name + req.body.email}) */

    } catch (error) {
       
        return res.status(500).json({ msg:'server error'})
    }

    /*  res.json({msg:`user route + ${req.body.name}`}) */
   
}

exports.registroUsuario = registroUsuario