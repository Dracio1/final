import axios from 'axios'
import { setAlert } from './alert'
import { DELETE_NOTAS, GET_NOTAS, GET_NOTA, NOTAS_ERROR, UPDATE_NOTAS, CLEAR_NOTAS, ADD_NOTAS } from './types'

export const getNotasMateria = (idMateria)=> async dispatch => {

    dispatch({type: CLEAR_NOTAS})

    try {
        
        const res = await axios.get('back/api/notas/materia/'+idMateria)

        dispatch({
            type: GET_NOTAS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: NOTAS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
export const getNotasAlumno = (idAlumno)=> async dispatch => {

    dispatch({type: CLEAR_NOTAS})

    try {
        
        const res = await axios.get('back/api/notas/alumno/'+idAlumno)

        dispatch({
            type: GET_NOTAS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: NOTAS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
export const getNotasDocumento = (documento)=> async dispatch => {

    dispatch({type: CLEAR_NOTAS})

    try {
        
        const res = await axios.get('back/api/notas/documento/'+documento)

        dispatch({
            type: GET_NOTAS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: NOTAS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
export const addNota = (formData)=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/notas/`, formData, config)
    
        dispatch(setAlert('Materia agregada', 'success'))
            
        dispatch({
            type: ADD_NOTAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: NOTAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const updateNota = ({ idNota, materia, profesor, alumno, nota, documento })=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        const body = JSON.stringify({materia, profesor, alumno, nota, documento})
        
        const res = await axios.post(`/back/api/notas/${idNota}`, body, config)
    
        dispatch(setAlert('Nota actualizada', 'success'))
            
        dispatch({
            type: UPDATE_NOTAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: NOTAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const deleteNota = (idNota)=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/notas/${idNota}`)
    
        dispatch(setAlert('Nota eliminada', 'success'))
            
        dispatch({
            type: UPDATE_NOTAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: NOTAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}