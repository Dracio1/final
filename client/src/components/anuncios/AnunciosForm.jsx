import { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addAnuncio } from "../../actions/anuncios"

const AnunciosForm = ({ addAnuncio}) => {

    const [ text , setText ] = useState('')
    const [ imagen , setImagen ] = useState('')
  
    return (
        <div className="post-form">
            <div className="bg-primary p-1">
                <h3 className='text-center'> Crea un nuevo anuncio </h3>
            </div>

            <form 
                className="form my-1 centeredColumn" 
                onSubmit={ e => {
                e.preventDefault()
                addAnuncio({text,materia})
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
                   
                    style={{width : "200%"  }}
                ></textarea>

                <input type="file" name="imagen" id="imagen" value={imagen}/>

                <input 
                    type="submit" 
                    className="btn my-1" 
                    value="Crear nuevo anuncio" 
                />
            </form>
        </div>
    )
}

AnunciosForm.propTypes = {
    addAnuncio: PropTypes.func.isRequired,
}

export default connect(null, {addAnuncio})(AnunciosForm)