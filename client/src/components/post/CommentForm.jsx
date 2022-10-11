import {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from "../../actions/post";

const CommentForm = ({postId, addComment}) => {

    const [ text , setText ] = useState('')
    
    return (
        <div className="post-form">
            <div className="bg-primary p-1">
                <h3 className='text-center'> 
                    deja un comentario 
                </h3>
            </div>

            <form 
                className="form my-1 centeredColumn" 
                onSubmit={ e => {
                e.preventDefault()
                addComment(postId,{text})
                setText('')
            }}>
                <textarea
                    name="text"
                    cols="100"
                    rows="2"
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
                    value="enviar comentario"
                />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default  connect(null,{addComment})(CommentForm)