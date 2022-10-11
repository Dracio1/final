import PropTypes from 'prop-types'
import {useEffect} from 'react'
import { connect }from 'react-redux'
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostForm from './PostForm';
import PostItem from './PostItem'


const Posts = ({getPosts, post: {posts, loading}}) => {

    useEffect(() => {
        
        getPosts()
      
    }, [getPosts])
    

  return (
    <>
        {
            loading ? <Spinner/> 
                : 
            <>
                <h1 className='text-primary'>Posts</h1>
                <p className='lead'>
                    <i className='fas fa user'>
                        Bienvenido a la comunidad
                    </i>
                </p>
               <PostForm/>

                {
                    posts && posts.length > 0 ? 

                    <div className="posts">

                        {
                            posts.map(item=>{
                                return <PostItem  key={item._id} post={item} />
                            })
                        }

                    </div>

                    : 
                    
                    <p>...nada por aquí 😥</p>
                }

                {/* <div className="posts">
                   
                    {
                        posts && posts.length > 0 ? 

                        <div className="posts">

                            {
                                posts.map(item=>{
                                    return <PostItem key={item._id} post={item} />
                                })
                            }

                        </div>

                        : 
                        
                        <p>...nada por aquí 😥</p>
                    }
                </div> */}
            </>
        }
    </>
  )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post : state.post,
})

export default connect(mapStateToProps, { getPosts })(Posts) 