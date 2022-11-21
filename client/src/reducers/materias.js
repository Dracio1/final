import {
    GET_MATERIAS
    ,GET_MATERIA
    ,CLEAR_MATERIAS
    ,MATERIAS_ERROR
    ,UPDATE_MATERIAS
    ,DELETE_MATERIAS
    ,ADD_MATERIAS
} from '../actions/types'

const inicialState= {
    materias:[]
    ,materia: {}
    ,loading: true
    ,errors: {}
}


export default function (state = inicialState, action){
    const {type, payload} = action
    switch (type) {
        case UPDATE_MATERIAS:
        case GET_MATERIAS:
            return {
                ...state
                ,materias: payload,
                loading:false
            }
        
        case GET_MATERIA:
            return {
                ...state
                ,materia: payload,
                loading:false
            }

        case CLEAR_MATERIAS:
            return {
                ...state
                ,materia: {},
                loading:false
            }
           
        case MATERIAS_ERROR:
            return {
                ...state
                ,errors: {},
                loading:false
            }
            
        case DELETE_MATERIAS:
            return {
                ...state
                ,materias: state.materias.filter
                (
                    item => item._id != payload
                ),
                loading:false
            }
            
        case ADD_MATERIAS:
            return {
                ...state
                ,materias: [payload,...state.materias]
                ,loading:false
            }

        default:
            return state;
    }

}