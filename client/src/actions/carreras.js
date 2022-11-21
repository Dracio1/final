import axios from 'axios'
import { setAlert } from './alert'
import { DELETE_CARRERAS, GET_CARRERAS, GET_CARRERA, CARRERAS_ERROR, UPDATE_CARRERAS, CLEAR_CARRERA, ADD_CARRERAS } from './types'

export const getCarreras = ()=> async dispatch => {

    dispatch({type: CLEAR_CARRERA})

    try {
        
        const res = await axios.get('back/api/carreras')

        dispatch({
            type: GET_CARRERAS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: CARRERAS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}


export const addCarrera = (formData)=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/carreras/`, formData, config)
    
        dispatch(setAlert('Materia agregada', 'success'))
            
        dispatch({
            type: ADD_CARRERAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: CARRERAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const updateCarrera = ({ idCarrera, nombre, materias })=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        const body = JSON.stringify({nombre, materias})
        
        const res = await axios.post(`/back/api/carreras/${idCarrera}`, body, config)
    
        dispatch(setAlert('Carrera actualizada', 'success'))
            
        dispatch({
            type: UPDATE_CARRERAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: CARRERAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const deleteCarrera = (idCarrera)=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/carreras/${idCarrera}`)
    
        dispatch(setAlert('Carrera eliminada', 'success'))
            
        dispatch({
            type: UPDATE_CARRERAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: CARRERAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}