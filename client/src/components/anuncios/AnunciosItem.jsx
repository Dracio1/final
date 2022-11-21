import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getPersona } from '../../actions/personas';

    
const AnunciosItem = ({
    auth, 
    anuncios: {_id, usuario, materia, descripcion, imagen, fechaCreacion},
    persona
}) => {


    return (
    <div className="post bg-white p-1 my-1">      
        <div>
           <h4>{persona.nombres+' '+persona.apellidos}</h4>
        </div>
        <div>
            {(imagen)? <img src={imagen}></img>:<></>}
            <p>{descripcion}</p>
            <p>{fechaCreacion}</p>
        </div>
        
    </div>

  )
}

AnunciosItem.defaultProps = {
    showActions: true
}

AnunciosItem.propTypes = {
    carreras: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getUsuario: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    persona: state.personas.persona
})

export default connect(mapStateToProps,{})( AnunciosItem)