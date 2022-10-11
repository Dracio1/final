import axios from 'axios'
import { setAlert } from './alert'
import { GET_POSTS,
    GET_POST, 
    CLEAR_POST,
    POST_ERROR, 
    UPDATE_LIKES, 
    DELETE_POST,
    ADD_POST,
    CLEAR_PROFILE,
    CLEAR_REPOS,
    ADD_COMMENT,
    REMOVE_COMMENT
} from "./types"; 

//Get posts
export const getPosts = () => async dispatch => {

    dispatch({type: CLEAR_PROFILE})
    dispatch({type: CLEAR_REPOS})
    dispatch({type: CLEAR_POST})


    try {
        const res = await axios.get('/back/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
//Get post
export const getPost = id => async dispatch => {

    /* dispatch({type: CLEAR_PROFILE})
    dispatch({type: CLEAR_REPOS}) */

    try {
        const res = await axios.get(`/back/api/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })
        
    } catch (err) {
        console.log(err)
        /* dispatch({
            type: POST_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        }) */
    }
}

//Clear selected post
export const clearPost = () => {
    dispatch({
        type: CLEAR_POST,
        payload: null
    })
}


//Add like
export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/back/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data }
        })
        
    } catch (err) {
        console.log('linea 37', err)
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//Remove like
export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/back/api/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data }
        })
        
    } catch (err) {
        //console.log('linea 58',err)
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//Delete post
export const deletePost = (id) => async dispatch => {  

    try {

        await axios.delete(`/back/api/posts/${id}`)
    
        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('Post eliminado', 'success'))    
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    } 
}

//Add Post
export const addPost = formData => async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/posts/`, formData, config)
    
        dispatch(setAlert('Post creado', 'success'))
            
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: POST_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

//delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        
        const res = await axios.delete(`/back/api/posts/comment/${postId}/${commentId}`)
    
        
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        
        dispatch(setAlert('comentario eliminado', 'success'))

    } catch (err) {

        if(err.response){
            dispatch({
                type: POST_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

//Delete Comment
export const addComment = (postId, formData) => async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`/back/api/posts/comment/${postId}`, formData, config)
    
        
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        
        dispatch(setAlert('comentario agregado', 'success'))
        
    } catch (err) {

        if(err.response){
            dispatch({
                type: POST_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}