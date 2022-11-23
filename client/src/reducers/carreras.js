import {
    GET_CARRERAS
    ,GET_CARRERA
    ,CLEAR_CARRERA
    ,CARRERAS_ERROR
    ,UPDATE_CARRERAS
    ,DELETE_CARRERAS
    ,ADD_CARRERAS
} from '../actions/types'

const inicialState= {
    carreras:[]
    ,carrera: null
    ,loading: true
    ,errors: {}
}


export default function (state = inicialState, action){
    const {type, payload} = action
    switch (type) {
        case UPDATE_CARRERAS:
        case GET_CARRERAS:
            return {
                ...state
                ,carreras: payload,
                loading:false
            }
        
        case GET_CARRERA:
            return {
                ...state
                ,carrera: payload,
                loading:false
            }

        case CLEAR_CARRERA:
            return {
                ...state
                ,carrera: null
                ,loading:false
            }
           
        case CARRERAS_ERROR:
            return {
                ...state
                ,errors: {},
                loading:false
            }
            
        case DELETE_CARRERAS:
            return {
                ...state
                ,carreras: state.carreras.filter
                (
                    item => item._id != payload
                ),
                loading:false
            }
            
        case ADD_CARRERAS:
            return {
                ...state
                ,carreras: [payload,...state.carreras]
                ,loading:false
            }
       


        default:
            return state;
    }

}