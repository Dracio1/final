import {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost, clearPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'


const Post = ({ getPost, clearPost, post: {post, loading}, match}) => {            

    const history = useHistory()     

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])
    

    return (
        loading || post === null ? <Spinner/> : 
        <>  
            <button 
                className="blue-icon btn btn-light mt-3" 
                onClick={()=>{
                    history.goBack()
                    clearPost()
                }}
            > 
            volver a las publicaciones
            </button>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            
            {/*  */}
            {/* <div className=""> */}
                {
                    post.comments.length > 0 && post.comments.map(
                        item=> (
                            
                            <CommentItem 
                                key={item._id} 
                                comment={item}
                                postId={post._id}
                            />
                        )
                    )
                }
            {/* </div> */}
            {/*  */}
        </>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    clearPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost, clearPost } )(Post)