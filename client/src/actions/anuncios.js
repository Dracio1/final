import axios from 'axios'
import { setAlert } from './alert'
import { DELETE_ANUNCIOS, GET_ANUNCIOS, GET_ANUNCIO, ANUNCIOS_ERROR, UPDATE_ANUNCIOS, CLEAR_ANUNCIO, ADD_ANUNCIOS } from './types'

export const getAnuncios = ()=> async dispatch => {

    dispatch({type: CLEAR_ANUNCIO})

    try {
        
        const res = await axios.get('back/api/anuncios')

        dispatch({
            type: GET_ANUNCIOS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: ANUNCIOS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const getAnunciosMateria = (materia)=> async dispatch => {

    dispatch({type: CLEAR_ANUNCIO})

    try {
        
        const res = await axios.get('back/api/anuncios/'+materia)

        dispatch({
            type: GET_ANUNCIOS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: ANUNCIOS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const addAnuncio = (formData)=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/anuncios/`, formData, config)
    
        dispatch(setAlert('Anuncio agregada', 'success'))
            
        dispatch({
            type: ADD_ANUNCIOS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: ANUNCIOS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const updateAnuncio = ({ idAnuncio, nombre, horasCatedra })=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        const body = JSON.stringify({nombre, horasCatedra})
        
        const res = await axios.post(`/back/api/anuncios/${idAnuncio}`, body, config)
    
        dispatch(setAlert('Anuncio actualizada', 'success'))
            
        dispatch({
            type: UPDATE_ANUNCIOS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: ANUNCIOS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const deleteAnuncio = (idAnuncio)=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/anuncios/${idAnuncio}`)
    
        dispatch(setAlert('Anuncio eliminada', 'success'))
            
        dispatch({
            type: DELETE_ANUNCIOS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: ANUNCIOS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}