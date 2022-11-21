import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated, token}) => {

    if(isAuthenticated && token){
        return <Redirect to='/dashboard'/>
    } 
    
    return (
        <section className="landing">

            <div className="landing-inner">
                
                <h1 className="x-large my-3">Instituto Random</h1>
                <p className="lead" >
                    Completa el formulario e inscribite a alguna de nuestras maravillosas carreras
                </p>
                <div className="buttons round-buttons mb-3">
                    <Link to="/register" className="btn btn-primary round-buttons">Postularse</Link>
                    <Link to="/login" className="btn btn-light">Entrar</Link>
                </div>
            </div>
                
           
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    token : state.auth.token
})

export default connect(mapStateToProps)(Landing)
