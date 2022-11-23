import axios from 'axios'
import { setAlert } from './alert'
import { GET_PERSONAS, GET_PERSONA, PERSONAS_ERROR, UPDATE_PERSONAS, CLEAR_PERSONAS } from './types'

export const getPersonas = ()=> async dispatch => {

    dispatch({type: CLEAR_PERSONAS})

    try {
        
        const res = await axios.get('back/api/personas')

        dispatch({
            type: GET_PERSONAS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: PERSONAS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const getPersona = (idPersona)=> async dispatch => {
  
    dispatch({type: CLEAR_PERSONAS})
    
    try {
       
        const res = await axios.get('back/api/personas/'+idPersona)
       console.log(res)
        dispatch({
            type: GET_PERSONA,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: PERSONAS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const updatePersona = ({idPersona,nombres,apellidos,direccion,email,estado,telefonos,documentos})=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        const body = JSON.stringify({nombres,apellidos,direccion,email,estado,telefonos,documentos})
        
        const res = await axios.put(`/back/api/personas/${idPersona}`, body, config)
    
        dispatch(setAlert('Persona actualizada', 'success'))
            
        dispatch({
            type: UPDATE_PERSONAS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: PERSONAS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}
