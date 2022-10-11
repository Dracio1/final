import { useState, useEffect } from 'react'
import { Link, withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from '../../actions/profile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EnviarVolver from '../../components/layout/EnviarVolver';

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

import download from "downloadjs";
 

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    
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
        createProfile(formData, history, true)
    }

    useEffect(() => {
        getCurrentProfile()

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        })
    }, [loading])

    //
    async function createPdf(e) {
        e.preventDefault()
        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const fontSize = 30
        
        page.drawText('Creating PDFs in JavaScript is awesome!', {
          x: 50,
          y: height - 4 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0.53, 0.71),
        })
      
        const pdfBytes = await pdfDoc.save()

        download(pdfBytes, "info.pdf", "text/pdf")    

      }
      //

    return (
        <>
            <div className='centeredColumn'>
                <h1 className="text-primary">
                    Crea tu perfil
                </h1>
                
                <p className="lead">
                    <i className="fas fa-user"></i> Hagamos que tu perfil se destaque
                </p>
                
                <small>* = campo es obligatorio </small>
            
            </div>
            

            <form className="form w-75" onSubmit={ (e) => onSubmit(e)}>
                <div className="centeredColumn">
                    
                    <select className='w-100 text-center rounded-pill' name="status" value={status} onChange={(e)=>onChange(e)}>
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

                <div className=" centeredColumn">
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

                <div className=" centeredColumn">
                    <input type="text"
                        value={website} 
                        placeholder="Sitio web" 
                        name="website" 
                        onChange={e => onChange(e)} 
                    />
                    
                    <small className="form-text">Puede ser tu propio sitio o el de tu empresa </small>    
                </div>

                <div className=" centeredColumn">
                    <input type="text"
                        value={location} 
                        placeholder="ubicación" 
                        name="location" 
                        onChange={e => onChange(e)} 
                    />
                    
                    <small className="form-text"> Ciudad & Provincia (ej. Formosa, FSA) </small>
                </div>

                <div className=" centeredColumn">
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

                <div className=" centeredColumn">
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

                {/* <div>
                   <button
                    onClick={(e)=>{createPdf(e)}}
                   >
                       ver PDF
                   </button>         
                </div> */}            

                <div className=" centeredColumn">
                    <textarea
                        className='w-100'
                        value={bio}
                        onChange={e => onChange(e)}
                        placeholder="una pequeña descripción de quien eres" 
                        name="bio">
                    </textarea>
                    
                    <small className="form-text">Cuéntanos algo acerca de tí</small>
                </div>

                <div className=" centeredColumn">

                    <button type="button" 
                        onClick={() => viewSocialInputs(!socialInputs)} 
                        className="btn w-50 mx-auto">
                        agregar enlaces a redes sociales *opcional
                    </button>
                    
                </div>

                { 
                    socialInputs && 
                    <>
                                
                        <div className=" social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            
                            <input type="text" 
                            value={twitter}
                            placeholder="Twitter URL" 
                            name="twitter"
                            onChange={e => onChange(e)} 
                            />
                        </div>

                        <div className=" social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            
                            <input type="text"
                                value={facebook} 
                                placeholder="Facebook URL" 
                                name="facebook" 
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className=" social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            
                            <input type="text"
                                value={youtube} 
                                placeholder="YouTube URL" 
                                name="youtube" 
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className=" social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            
                            <input type="text"
                                value={linkedin} 
                                placeholder="Linkedin URL" 
                                name="linkedin" 
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className=" social-input">
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

               <EnviarVolver/>

            </form> 
        </>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps,{ createProfile, getCurrentProfile })(withRouter(EditProfile))
