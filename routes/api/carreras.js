const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { check, validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')

const carrera = require('../../models/Carreras');

const { cookie } = require('request')


//@route POST api/posts
//desc: create post
//@private
router.get('/',  auth, async (req, res) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }

    try {
        const carrera = await carrera.find()

        res.json(carrera)

    } catch (err) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }

})


router.post('/', [ auth, [
    check('nombre','El nombre es obligatorio').isEmpty(),
    check('materia','La materia es obligatoria').isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }

    try {
        const carrera = await carrera.findById(req.materia.id)

        const newCarrera = {
            nombre: req.body.text,
            materia: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        const post = new Carrera(newCarrera)

        await post.save()

        res.json(post)

    } catch (err) {

        console.error(err.message)
        
        res.status(500).send('Server Error')
    }

})