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