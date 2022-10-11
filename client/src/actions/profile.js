import axios from 'axios'
import { setAlert } from './alert'
import { DELETE_ACCOUNT, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE,GET_REPOS, CLEAR_REPOS } from './types'

const urlTemp = 'http://localhost:5000'


//get all profiles
export const getAllProfiles = () => async dispatch => {
    
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: CLEAR_REPOS})

    try {
        
        const res = await axios.get('back/api/profile')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//get profile by id
export const getProfileById = userId => async dispatch => {
    //const url = "/back/api/profile/user/"
    dispatch({type: CLEAR_REPOS})
    dispatch({type: CLEAR_PROFILE})
    try {
        //TODO: LA RUTA DE ABAJO LLEVA UNA / X DELANTE, ---¿?
        const res = await axios.get(`/back/api/profile/user/${userId}`)
        
        console.log('PROFILE=>', res)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        console.log('ERROR=>',err)
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//get GH repos
export const getGitHubRepos = username => async dispatch => {

    console.log('username1!!!', username)
    
    try {
        
        const res = await axios.get(`/back/api/profile/github/${username}`)

        console.log(res)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//Get Current user profile
export const getCurrentProfile = () => async dispatch => {

    try {
        
        const res = await axios.get('back/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        
        //alternativa a la linea 39 de reducers/profile.js
        //dispatch({ type: CLEAR_PROFILE });

        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }

}

//Create or Update current profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        
        const config = {
            headers: {'Content-Type':'application/json'},
        }

        const res = await axios.post('back/api/profile', formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Perfil actualizado' : 'Perfil creado','success' ))

        if (!edit) history.push('/dashboard')

    } catch (err) {

        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
} 

// add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        
        const config = {
            headers: {'Content-Type':'application/json'},
        }

        const res = await axios.put('back/api/profile/experience', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experiencia añadida','success' ))

        history.push('/dashboard')

    } catch (error) {

        console.log('88 err=>', error)

        const errors = error.response.data.errors

        if(errors){
            
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        
        const config = {
            headers: {'Content-Type':'application/json'},
        }

        const res = await axios.put('back/api/profile/education', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Educación añadida','success' ))

        history.push('/dashboard')

    } catch (err) {

        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//delete experience
export const deleteExperience = id => async dispatch => {
    try {
        
        const res = await axios.delete(`back/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('experiencia removida', 'success'))

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    } 
}

//delete education
export const deleteEducation = id => async dispatch => {
    try {
        
        const res = await axios.delete(`back/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('educación removida', 'success'))

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    } 
}

//delete account & profile
export const deleteAccount = () => async dispatch => {

    if(window.confirm('Esta seguro que desea eliminar su cuenta? - No se puede deshacer')){
        try {
        
            const res = await axios.delete(`back/api/profile/`)
    
            dispatch({type: CLEAR_PROFILE})
            dispatch({type: DELETE_ACCOUNT})
    
            dispatch(setAlert('Su cuenta ha sido borrada', 'success'))
    
        } catch (err) {
    
            dispatch({
                type: PROFILE_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }

     
}
