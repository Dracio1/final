import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


const MateriasItem = ({
    materias: {_id, nombre},
    auth: {user}
}) => {


    return ( <>{(user.tipo == "Administrador") ?
        <>
            <div className="post bg-white p-1 my-1">      
                <div>
                    <Link to={`/materia/${_id}`}>
                        <h4>{nombre}</h4>
                    </Link>
                </div>
            </div>
        </>
        :
        <>
            <div className="post bg-white p-1 my-1">      
                <div>
                    <h4>{nombre}</h4>
                </div>
            </div>
        </>
    }</> )
}



MateriasItem.propTypes = {
    materias: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(MateriasItem)