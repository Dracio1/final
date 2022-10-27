const User = require('../../models/Usuarios');
const Notas = require('../../models/Notas');
const Persona = require('../../models/Personas');
const Materia = require('../../models/Materias');
const Carrera = require('../../models/Carreras');

const notasAlumno = async (req,res)=>{
    

    try {
        const {alumno,materia}= {...req.body}
        let notas  = await Notas.findOne({usuario:alumno,materia})
        

        if(!notas) {
            let persona  = await Persona.findById({usuario:alumno})
            res.json(persona)
            return res.status(200).send('No hay notas para esta materia del alumno '+persona.nombres+ ' '+ persona.apellidos )
        }
    } catch (error) {
        console.error(err.message)
        res.status(500).send('server error')
    }
    

}

const notasMateria = async (req,res)=>{
    try {
        //para consultas de profesores o administradores
        const {usuario,materia,carrera}= {...req.body}
        const user  = await User.findById({usuario})
        
        if(user.tipo == 'profesor' || user.tipo == 'administrador'){
            const notas  = await Notas.find({materia,carrera})
            res.json(notas)
            if(!notas) {
                return res.status(200).send('No hay notas para esta materia')
            }
        }
        

       
    } catch (error) {
        console.error(err.message)
        res.status(500).send('server error')
    }
}

const nuevaNota = async (req,res)=>{
    try {
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
        
        return res.status(200).send('Nota guardada correctamente')

       
    } catch (error) {
        console.error(err.message)
        res.status(500).send('server error')
    }
}


const actualizarNota = async (req,res)=>{

    try{
        const {usuario,profesor,calificacion,documento,observaciones,materia,carrera,nota}= {...req.body}

        const notas = await Notas.find({nota})

        if(!notas) return res.status(400).send('El alumno no tiene notas para actualizar')

        const documentoActualizar = notas.findIndex(nota=>nota.documento == documento)

        if(!documentoActualizar) return res.status(400).send('La nota a actualizar no existe')

        notas.nota[documentoActualizar].calificacion = calificacion
        notas.nota[documentoActualizar].documento = documento
        notas.nota[documentoActualizar].fechaActualizacion = Date.now()

        await notas.save()

        return res.status(200).send('Nota guardada correctamente')


    }catch(error){
        console.error(err.message)
        res.status(500).send('server error')
    }


}

const promedioNotasMateria = async (req,res)=>{
    const {materia,carrera,usuario,documento}= {...req.body}

    const user = await User.find({usuario})
    if(user.tipo == 'administrador')return res.status(400).send('no tiene permisos para esta función')
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

    return sumNotas/numeroNotas


}

const promedioNotasAlumno = async (req,res)=>{
    const {carrera,alumno,usuario,documento}= {...req.body}

    const user = await User.find({usuario})
    if(user.tipo == 'administrador')return res.status(400).send('no tiene permisos para esta función')
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

    return sumNotas/numeroNotas

}



exports.notasAlumno = notasAlumno
exports.notasMateria = notasMateria
exports.nuevaNota = nuevaNota
exports.actualizarNota = actualizarNota
exports.promedioNotasMateria = promedioNotasMateria
exports.promedioNotasAlumno = promedioNotasAlumno