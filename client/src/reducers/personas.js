import {
    GET_PERSONAS
    ,GET_PERSONA
    ,CLEAR_PERSONAS
    ,PERSONAS_ERROR
    ,UPDATE_PERSONAS
} from '../actions/types'

const inicialState= {
    personas:[]
    ,persona: null
    ,loading: true
    ,errors: {}
}


export default function (state = inicialState, action){
    const {type, payload} = action
    switch (type) {
        case UPDATE_PERSONAS:
        case GET_PERSONAS:
            return {
                ...state
                ,personas: payload,
                loading:false
            }
        
        case GET_PERSONA:
            return {
                ...state
                ,persona: payload,
                loading:false
            }

        case CLEAR_PERSONAS:
            return {
                ...state
                ,personas: []
                ,persona: null
                ,loading:false
            }
           
        case PERSONAS_ERROR:
            return {
                ...state
                ,errors: {},
                loading:false
            }

        default:
            return state;
    }

}