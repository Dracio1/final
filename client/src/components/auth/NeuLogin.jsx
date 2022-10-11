import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

const NeuLogin = ({login, isAuthenticated}) => {
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData

    const handleChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    const handleOnSubmit = async (e) => { 
        e.preventDefault()
        //console.log('success')
        login(email, password)
    }
    
    //redirect if logged in
    if(isAuthenticated) return <Redirect to='/dashboard' />

        
    return (
    <>
        <form onSubmit={(e)=>{handleOnSubmit(e)}}>
            <div className="segment">
                <h1>Inicia sesión con tu cuenta</h1>
            </div>

            <label>
                <input type="email" 
                    placeholder="correo electrónico" 
                    name="email"
                    value={email}
                    onChange={e => handleChange(e)}
                />
            </label>
            
            <label>
                <input type="password" 
                    placeholder="contraseña"
                    name="password"
                    minLength="6"
                    onChange={e => handleChange(e)}
                />
            </label>
            
            <button className="red" type="submit">
                Entrar {' '}
                <i className="fa fa-lock"></i>
            </button>
           
            <div className="segment">
                <p>¿Aún no estás registrado?</p>
                <Link to="/register">regístrate</Link>
            </div>
        </form>
        
    </>
  ) 
};<ion-icon name="code-slash-outline"></ion-icon>

//<ion-icon name="code-slash-sharp"></ion-icon>

NeuLogin.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(NeuLogin);
