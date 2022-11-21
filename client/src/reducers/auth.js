import { REGISTER_SUCCESS, REGISTER_FAIL, 
    USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DELETE_ACCOUNT
} from "../actions/types"; 

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action){

    const {type, payload} = action

    switch(type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS: 
            localStorage.setItem('token', payload.token)
            
            return {
                token: payload.token,
                user: payload.user,
                isAuthenticated: true,
                loading: false
            }
            break;
        case AUTH_ERROR:  
        case LOGIN_FAIL:  
        case REGISTER_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:         
            localStorage.removeItem('token')
            return {
                user:null,
                token: null,
                isAuthenticated: false,
                loading: false
            }
            break;
        case USER_LOADED:
            return {
                isAuthenticated: true,
                loading: false,
                user: payload
            }
            break;
        default:
            return state        
    }
}