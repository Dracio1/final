import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


const CarrerasItem = ({
    auth, 
    carreras: {_id, nombre},
}) => {


    return (
    <div className="post bg-white p-1 my-1">      
        <div>
            <Link to={`/carreras/${_id}`}>
                <h4>{nombre}</h4>
            </Link>
        </div>
    </div>

  )
}

CarrerasItem.defaultProps = {
    showActions: true
}

CarrerasItem.propTypes = {
    carreras: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)( CarrerasItem)