import { useState } from 'react'
import { Link, withRouter } from "react-router-dom";
import { createProfile } from '../../actions/profile'
import EnviarVolver from '../layout/EnviarVolver'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const CreateProfile = ({ createProfile, history }) => {
    
    const [formData, setFormData ] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    })

    const {
        company, website,
        location, status,
        skills, githubusername,
        bio, twitter,
        facebook, linkedin,
        youtube, instagram
    } = formData

    const [socialInputs, viewSocialInputs ] = useState(false)

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault()
        createProfile(formData, history)
    }

    return (
        <>
            <div className='centered'>
                <h1 className="large text-primary">
                    Crea tu perfil
                </h1>
                
                <p className="lead">
                    <i className="fas fa-user"></i> Hagamos que tu perfil se destaque
                </p>
            </div>
            
            <small>* = el campo es obligatorio </small>

            <form className="form" onSubmit={ (e) => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={(e)=>onChange(e)}>
                        <option value="0">* Seleccione su perfil profesional</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Estudiante/Aprendiz</option>
                        <option value="Instructor">Instructor/Profesor </option>
                        <option value="Intern">Pasante</option>
                        <option value="Other">Otro/a</option>
                    </select>

                    <small className="form-text"
                        >Danos una idea del nivel que has alcanzando profesionalmente  </small
                    >
                </div>

                <div className="form-group">
                    <input type="text" 
                        placeholder="Compañía" 
                        name="company" 
                        onChange={e => onChange(e)}  
                        value={company} 
                    />
                    
                    <small 
                        className="form-text">Compañía. para la cual trabajas o tu propia compañía.
                    </small>
                </div>

                <div className="form-group">
                    <input type="text"
                        value={website} 
                        placeholder="Sitio web" 
                        name="website" 
                        onChange={e => onChange(e)} 
                    />
                    
                    <small className="form-text">Puede ser tu propio sitio o el de tu empresa </small>    
                </div>

                <div className="form-group">
                    <input type="text"
                        value={location} 
                        placeholder="ubicación" 
                        name="location" 
                        onChange={e => onChange(e)} 
                    />
                    
                    <small className="form-text"> Ciudad & Provincia (ej. Formosa, FSA) </small>
                </div>

                <div className="form-group">
                    <input type="text"
                        value={skills} 
                        placeholder="* Habilidades" 
                        name="skills" 
                        onChange={e => onChange(e)} 
                    />
                    
                    <small className="form-text"
                        >Por favor usar valores separados por comas (ej.
                        HTML,CSS,JavaScript,PHP)
                    </small>
                </div>

                <div className="form-group">
                    <input type="text"
                        value={ githubusername }
                        onChange={e => onChange(e)}
                        placeholder="Nombre de usuario de Github"
                        name="githubusername"
                    />
                    
                    <small className="form-text">
                        Incluye tu nombre de usuario de Github para ver tus ultimos repositorios y el enlace a tu perfil de github 
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        value={bio}
                        onChange={e => onChange(e)}
                        placeholder="una pequeña descripción de quien eres" 
                        name="bio">
                    </textarea>
                    
                    <small className="form-text">Cuéntanos algo acerca de tí</small>
                </div>

                <div className="my-2">

                    <button type="button" 
                        onClick={() => viewSocialInputs(!socialInputs)} 
                        className="btn btn-light button3d">
                        agregar enlaces a redes sociales -opcional-
                    </button>

                </div>

                { 
                    socialInputs && 
                    <>
                                
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            
                            <input type="text" 
                            value={twitter}
                            placeholder="Twitter URL" 
                            name="twitter"
                            onChange={e => onChange(e)} 
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            
                            <input type="text"
                                value={facebook} 
                                placeholder="Facebook URL" 
                                name="facebook" 
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            
                            <input type="text"
                                value={youtube} 
                                placeholder="YouTube URL" 
                                name="youtube" 
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            
                            <input type="text"
                                value={linkedin} 
                                placeholder="Linkedin URL" 
                                name="linkedin" 
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            
                            <input type="text"
                                value={instagram} 
                                placeholder="Instagram URL" 
                                name="instagram" 
                                onChange={e => onChange(e)}
                            />
                        </div>
                    </>
                }

               {/* se optimizo por un componente reutilizable */}
               <EnviarVolver/>

            </form> 
        </>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}



export default connect(null,{ createProfile })(withRouter(CreateProfile))
