import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, 
    USER_LOADED, AUTH_ERROR, 
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, CLEAR_PERSONAS } from "./types";
import { setAlert } from "./alert";
import setAuthToken from '../utils/setAuthToken'
import { getPersona } from './personas';

//REGISTER USER
export const register = ({ nick, nombres, apellidos, email, password }) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({nick, nombres, apellidos, email, password})

    console.info('body=>',body)

    try {
        const res = await axios.post('/back/api/users', body, config)
        getPersona(res.data.user.persona)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        //dispatch(loadUser())

    } catch (err) {

        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const login = (nick, password) => async dispatch => {
   
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({nick, password})

    //console.info('body=>',body)

    try {
        const res = await axios.post('/back/api/auth', body, config)
        
        dispatch(getPersona(res.data.user.persona))
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

       // dispatch(loadUser())
        
    } catch (err) {
        //console.log(err)
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const loadUser = () => async dispatch => {

    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        
        const res = await axios.get('back/api/auth')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const logout = () => dispatch => {
   dispatch({type : LOGOUT }) 
   dispatch({type: CLEAR_PERSONAS})
}