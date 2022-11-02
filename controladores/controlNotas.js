const User = require('../../models/Usuarios');
const Notas = require('../../models/Notas');
const Persona = require('../../models/Personas');
const { validationResult} = require('express-validator')

const obtenerNotasAlumno = async (req,res)=>{
    

    try {

        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }

        const {alumno,materia}= {...req.body}
        let notas  = await Notas.findOne({usuario:alumno,materia})
        

        if(!notas) {
            let persona  = await Persona.findById({usuario:alumno})
            
            return res.status(400).json({ msg:'No hay notas para esta materia del alumno '+persona.nombres+ ' '+ persona.apellidos,status:1 })
        }
        return res.json(notas)
    } catch (error) {
        
        return res.status(500).json({ msg:'server error',status:1})
    }
    

}

const obtenerNotasMateria = async (req,res)=>{
    try {
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        //para consultas de profesores o administradores
        const {usuario,carrera}= {...req.body}
        const materia = req.params
        const user  = await User.findById({usuario})
        
        if(user.tipo == 'profesor' || user.tipo == 'administrador'){
            const notas  = await Notas.find({materia,carrera})
            res.json(notas)
            if(!notas) {
                return res.status(400).json({ msg:'No hay notas para esta materia'})
            }
        }
        

       
    } catch (error) {
        console.error(err.message)
        res.status(500).send('server error')
    }
}

const nuevaNota = async (req,res)=>{
    try {
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        //para consultas de profesores o administradores
        const {usuario,profesor,calificacion,documento,observaciones,materia,carrera}= {...req.body}

        let nota = await Notas.find({usuario,materia,carrera})

        const notas = {
            calificacion
            ,documento
            ,observaciones
            ,fechaCreacion: Date.now()
        }

        if(!nota){
            nota = new Notas({
            usuario
            ,profesor
            ,materia
            ,carrera
            ,nota :[]
           })
            

            notas.nota.unshift(notas)

            await notas.save()
        }else{
            nota.nota.unshift(notas)

            await notas.save()
        }
        
        return res.json({ msg:'Nota guardada correctamente'})

       
    } catch (error) {
       
        return res.status(500).json({ msg:'server error'})
    }
}


const actualizarNota = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        const {usuario,profesor,calificacion,documento,observaciones,materia,carrera,nota}= {...req.body}

        const notas = await Notas.find({nota})

        if(!notas) return res.status(400).json({ msg:'El alumno no tiene notas para actualizar'})

        const documentoActualizar = notas.findIndex(nota=>nota.documento == documento)

        if(!documentoActualizar) return res.status(400).json({ msg:'La nota a actualizar no existe'})

        notas.nota[documentoActualizar].calificacion = calificacion
        notas.nota[documentoActualizar].documento = documento
        notas.nota[documentoActualizar].fechaActualizacion = Date.now()

        await notas.save()

        return res.json({ msg:'Nota guardada correctamente'})


    }catch(error){
        
        return res.status(500).json({ msg:'server error'})
    }


}

const promedioNotasMateria = async (req,res)=>{

    try{
        const errores = validationResult(req)

        if(!errores){
            return res.status(400).json({ msg: errores.msg });
        }
        const {materia,carrera,usuario,documento}= {...req.body}

        const user = await User.find({usuario})
        if(user.tipo == 'administrador')return res.status(400).json({ msg:'no tiene permisos para esta función'})
        const notas = await Notas.find({materia,carrera})

        const numeroNotas = notas.length
        let sumNotas = 0

        for(i=0;i<numeroNotas;i++){
            if(notas.nota.length != 0){
                notas.nota.forEach(nota => {
                    if(nota.documento == documento) sumNotas += notas.nota.calificacion
                });
            }
            
        }

        return res.json(sumNotas/numeroNotas)

    }catch(error){
        
        return res.status(500).json({ msg:'server error'})
    }
}

const promedioNotasAlumno = async (req,res)=>{
    try{
        const {carrera,alumno,usuario,documento}= {...req.body}

        const user = await User.find({usuario})
        if(user.tipo == 'administrador')return res.status(400).json({ msg:'no tiene permisos para esta función'})
        const notas = await Notas.find({alumno,carrera})
        
        const numeroNotas = notas.length
        let sumNotas = 0

        for(i=0;i<numeroNotas;i++){
            if(notas.nota.length != 0){
                notas.nota.forEach(nota => {
                    if(nota.documento == documento) sumNotas += notas.nota.calificacion
                });
            }
            
        }

        return res.json(sumNotas/numeroNotas)
    }catch(error){
        
        return res.status(500).json({ msg:'server error'})
    }
}



exports.obtenerNotasAlumno = obtenerNotasAlumno
exports.obtenerNotasMateria = obtenerNotasMateria
exports.nuevaNota = nuevaNota
exports.actualizarNota = actualizarNota
exports.promedioNotasMateria = promedioNotasMateria
exports.promedioNotasAlumno = promedioNotasAlumno