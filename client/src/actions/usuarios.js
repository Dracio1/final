import axios from 'axios'
import { setAlert } from './alert'
import { GET_USUARIOS, GET_USUARIO, USUARIOS_ERROR, UPDATE_USUARIOS, CLEAR_USUARIOS } from './types'

export const getUsuarios = ()=> async dispatch => {

    dispatch({type: CLEAR_USUARIOS})

    try {
        
        const res = await axios.get('back/api/usuarios')

        dispatch({
            type: GET_USUARIOS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: USUARIOS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const getUsuario = (idUsuario)=> async dispatch => {

    dispatch({type: CLEAR_USUARIOS})
    
    try {
        
        const res = await axios.get('back/api/usuarios/'+idUsuario)
        console.log('este es en el action',res.data)
        dispatch({
            type: GET_USUARIO,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: USUARIOS_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

export const updateUsuario = ({idUsuario,nombres,apellidos,direccion,email,estado,telefonos,documentos})=> async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        const body = JSON.stringify({nombres,apellidos,direccion,email,estado,telefonos,documentos})
        
        const res = await axios.post(`/back/api/usuarios/${idUsuario}`, body, config)
    
        dispatch(setAlert('Usuario actualizada', 'success'))
            
        dispatch({
            type: UPDATE_USUARIOS,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: USUARIOS_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}
