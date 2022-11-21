import {
    GET_USUARIOS
    ,GET_USUARIO
    ,CLEAR_USUARIOS
    ,USUARIOS_ERROR
    ,UPDATE_USUARIOS
} from '../actions/types'

const inicialState= {
    usuarios:[]
    ,usuario: null
    ,loading: true
    ,errors: {}
}


export default function (state = inicialState, action){
    const {type, payload} = action
    switch (type) {
        case UPDATE_USUARIOS:
        case GET_USUARIOS:
            return {
                ...state
                ,usuarios: payload,
                loading:false
            }
        
        case GET_USUARIO:
            return {
                ...state
                ,usuario: payload,
                loading:false
            }

        case CLEAR_USUARIOS:
            return {
                ...state
                ,usuarios: []
                ,usuario: null
                ,loading:false
            }
           
        case USUARIOS_ERROR:
            return {
                ...state
                ,errors: {},
                loading:false
            }

        default:
            return state;
    }

}