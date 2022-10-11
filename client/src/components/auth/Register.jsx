import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
//import  axios from "axios";
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types';
import EnviarVolver from "../layout/EnviarVolver";

const Register = ({setAlert, register, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        nick: "",
        nombres: "",
        apellidos: "",
        email: "",
        password: "",
        passwordDos: ""

    })

    const {nick, nombres, apellidos, email, password, passwordDos} = formData

    const handleChange = e => setFormData({...formData, [e.target.name] : e.target.value})

    const handleOnSubmit = async (e) => { 
        e.preventDefault()

        if(password !== passwordDos){
            //console.log('las contraseñas no coinciden')
            setAlert('las contraseñas no coinciden','danger')
        }else{
            register({nick, nombres, apellidos, email, password})
            //console.log('success')
        }
    }
     
    if(isAuthenticated) return <Redirect to='/dashboard' />

    ////////testing proxy 
    /* const handleTest = async () => { 

            try {

                const res = await fetch('/api')
                const data = await res.json()

                console.log(data)
                
                return 
            } catch (err) {
                console.error(err.response.data)
            }
        
    } */

    return (
        <>
            <div className="centeredColumn my-3">
                <h1 className="large text-primary">Registrarse/Sing Up</h1>
                
                <p className="lead"><i className="fas fa-user"></i> Crea tu cuenta/Create Your Account</p>

                <small>* = el campo es obligatorio </small>
            </div>
            
            <form className="form w-75" onSubmit={(e)=>handleOnSubmit(e)}>
                
                <div className="my-1 centeredColumn">

                    <input className="round"
                        type="text" 
                        placeholder="Apodo(nombre de usuario)/nickname(username)" 
                        name="nick"
                        value={nick}
                        onChange={e => handleChange(e)} 
                        //required 
                    />

                    <small className="form-text">
                        Tu nombre de usuario
                    </small>

                </div>

                <div className="my-1 centeredColumn">

                    <input className="round"
                        type="text" 
                        placeholder="nombre/name" 
                        name="nombres"
                        value={nombres}
                        onChange={e => handleChange(e)} 
                        //required 
                    />

                    <small className="form-text">
                        Tu nombre  
                    </small>

                </div>

                <div className="my-1 centeredColumn">

                <input className="round"
                    type="text" 
                    placeholder="Apellido/Surname" 
                    name="apellidos"
                    value={apellidos}
                    onChange={e => handleChange(e)} 
                    //required 
                />

                <small className="form-text">
                    tu Apellido 
                </small>

                </div>

                <div className="my-1 centeredColumn">

                    <input type="email" 
                        placeholder="correo electrónico/email" 
                        name="email"
                        value={email} 
                        onChange={e => handleChange(e)}
                        //required
                    />
                   <p className="text-center my-1">
                        <small >
                            Tu correo electrónico
                        </small>
                    </p>
                    
                </div>
                
                <div className="my-1 centeredColumn" >
                    <input type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        //minLength="6"
                        onChange={e => handleChange(e)}
                    />

                    <p className="text-center my-1">
                        <small >
                            contraseña <code>con un mínimo de 6 carácteres</code>  
                        </small>
                    </p>
                </div>
                
                <div className="my-1 centeredColumn">
                    <input type="password"
                        placeholder="reingrese el password/confirm password"
                        name="passwordDos"
                        value={passwordDos}
                        //minLength="6"
                        onChange={e => handleChange(e)}
                    />

                    <p className="text-center my-1">
                        <small >
                            reingresa la contraseña   
                        </small>
                    </p>
                </div>
                
                {/* <div className="my-1 centeredColumn"> */}
                    
                    {/* <input type="submit" 
                        //className="btn btn-primary " 
                        className="button3d"
                        value="pulse para registrarse_"
                        //onSubmit={e => handleOnSubmit(e)} 
                    /> */}
                    
                    {/* <button className="button3d btn btn-primary" onClick={handleTest} type="button">Click Me!</button>  */}


               {/*  </div> */}
                    
                <EnviarVolver/>

                    <p className="my-1 centeredColumn">
                        ya tienes una cuenta? <Link to="/login">entrar</Link>
                    </p>
            </form>

            
        </>
    )
}


Register.propTypes = {
    setAlert : PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
