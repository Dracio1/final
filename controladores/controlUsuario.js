import Persona from '../models/Personas';
import Usuario from '../models/Usuarios';
import {bcrypt} from 'bcryptjs';
import { check, validationResult} from ('express-validator')
import config from ('config')
import jwt from ('jsonwebtoken')

const registroUsuario = async  (req, res) => {
    
    console.log(req.body)
    
    const {nick, nombres, apellidos , email, password} = req.body

    console.log('informacion entrante=>', nick, nombres, apellidos, email, password)

    const errors = validationResult(req)

    if(!errors.isEmpty()){
            return res.status(400).json({errors :  errors.array()})
    }

   //check user existence
    try {
        let persona = await Persona.findOne({email})
        let user  = await Persona.findOne({nick})
        if (persona){ res.status(400).json({errors : [{msg: 'el usuario ya existe'}] })  }
        if (user){ res.status(400).json({errors : [{msg: 'el nombre de usuario ya existe'}] })  }
        
      
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
   
}

export default registroUsuario