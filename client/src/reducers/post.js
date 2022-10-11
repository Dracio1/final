
import {
    GET_POSTS,
    GET_POST,
    CLEAR_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions/types'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }   
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }  
        case CLEAR_POST:
            return {
                ...state,
                post: null,
                loading: false
            } 
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter
                (
                    item => item._id != payload
                ),
                loading: false
            }     
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map
                (
                    item => item._id === payload.id
                    ? 
                    {...item, likes: payload.likes} 
                    : item
                ),
                loading: false
            }   
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }   
        case ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: payload },
                loading: false
            }
        case REMOVE_COMMENT: 
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments
                    .filter(item=>item._id !== payload)
                },
                loading: false
            }    
        default:
            return state         
    }

}