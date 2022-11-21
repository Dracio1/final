import axios from 'axios'
import { setAlert } from './alert'
import { DELETE_MATERIAS, GET_MATERIAS, GET_MATERIA, MATERIAS_ERROR, UPDATE_MATERIAS, CLEAR_MATERIAS, ADD_MATERIAS } from './types'

export const getMaterias = ()=> async dispatch => {

    dispatch({type: CLEAR_MATERIAS})

    try {
        
        const res = await axios.get('back/api/materias')

        dispatch({
            type: GET_MATERIAS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: MATERIAS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}


export const addMateria = (formData)=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/materias/`, formData, config)
    
        dispatch(setAlert('Materia agregada', 'success'))
            
        dispatch({
            type: ADD_MATERIAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: MATERIAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const updateMateria = ({ idMateria, nombre, horasCatedra })=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        const body = JSON.stringify({nombre, horasCatedra})
        
        const res = await axios.post(`/back/api/materias/${idMateria}`, body, config)
    
        dispatch(setAlert('Materia actualizada', 'success'))
            
        dispatch({
            type: UPDATE_MATERIAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: MATERIAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const deleteMateria = (idMateria)=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/materias/${idMateria}`)
    
        dispatch(setAlert('Materia eliminada', 'success'))
            
        dispatch({
            type: UPDATE_MATERIAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: MATERIAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}