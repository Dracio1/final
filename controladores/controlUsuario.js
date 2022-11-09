const Persona = require('../models/Personas');
const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const { check, validationResult} = require('express-validator')
const config =require('config')
const jwt = require('jsonwebtoken')

const registroUsuario = async  (req, res) => {
    
    const {nick, nombres, apellidos , email, password} = req.body

    console.log('informacion entrante=>', nick, nombres, apellidos, email, password)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
            return res.status(400).json({msg :  errors})
    }

   //check user existence
    try {
        let persona = await Persona.findOne({email})
         if (persona)return res.status(400).json({msg: 'el usuario ya existe'})
        let user  = await Usuario.findOne({nick})
        if (user)return res.status(400).json({msg: 'el nombre de usuario ya existe'})  
        
      
        //new instance of persona mongodb document model
        persona = new Persona({
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
       

        user.password = await bcrypt.hash(password, 10)
       
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
                return res.json({token,msg:'se segistro correctamente'})
            })
       
        /* console.log('user created')
        res.json({msg:'datos correctos user creado', datos : req.body.name + req.body.email}) */

    } catch (error) {
       console.log(error)
        return res.status(500).json({ msg:'server error'})
    }

    /*  res.json({msg:`user route + ${req.body.name}`}) */
   
}

exports.registroUsuario = registroUsuario