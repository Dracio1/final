import { combineReducers } from "redux";
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post'
import anuncios from './anuncios'
//import asistencia from './asistencia'
import carreras from './carreras'
import materias from './materias'
//import notas from './notas'
//import personas from './personas'
//import usuarios from './usuarios'
import personas from './personas'

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    anuncios,
    carreras,    
    materias,
    personas
    
})

//export default combineReducers({
//    alert,
//    auth,
//    profile,
//    post,
//    anuncios,
//    asistencia,
//    carreras,    
//    materias,
//    notas,
//    personas,
//    usuarios
//})