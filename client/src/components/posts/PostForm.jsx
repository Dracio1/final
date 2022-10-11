import { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addPost } from "../../actions/post"

const PostForm = ({ addPost}) => {

    const [ text , setText ] = useState('')

    return (
        <div className="post-form">
            <div className="bg-primary p-1">
                <h3 className='text-center'> Crea tu propio Post </h3>
            </div>

            <form 
                className="form my-1 centeredColumn" 
                onSubmit={ e => {
                e.preventDefault()
                addPost({text})
                setText('')
            }}>
                <textarea
                    name="text"
                    cols="100"
                    rows="5"
                    placeholder="..."
                    required
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    /* style={{maxWidth : "200%"}} */
                    style={{width : "200%"  }}
                ></textarea>

                <input 
                    type="submit" 
                    className="btn my-1" 
                    value="postear" 
                />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)