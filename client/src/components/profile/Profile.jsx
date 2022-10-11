import { useEffect } from 'react'
import { Link, useParams, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'

import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'


const Profile = ({ getProfileById, auth, error , profile : { profile, loading } }) => {
    
    const { id } = useParams()

    const history = useHistory()

    useEffect(() => {        
        getProfileById(id)
    }, [getProfileById, id])
    
  return (
    <section className='container'>

      {
        profile && 
        <>
          <Link to="/profiles" className='btn mx-2 my-2'>
            <i className="fa-regular fa-circle-left"></i>
            {' '} perfiles
          </Link>

          {
          auth.isAuthenticated && 
            auth.loading === false && 
            auth.user._id === profile.user._id && 
            <Link className='mx-2 my-2' to="/edit-profile">
              <i className="fa-solid fa-user-pen"></i>
              editar
            </Link>
          }

          <div className="profile-grid my-1">
            
            <ProfileTop profile={profile}></ProfileTop>
            <ProfileAbout profile={profile}></ProfileAbout>
            
            {/*  */}
            <div className='profile-exp bg-white p-2'>
              <h2 className="text-primary">
                {profile.experience.length > 1 ? 'experiencias laborales':
                  'experiencia laboral'
                }
              </h2>

              {profile.experience.length > 0 ? 
                <>
                  {profile.experience.map(item => 
                    <ProfileExperience key={item._id} experience={item}/>
                  )}
                </> 
              : 
                <h4>Aún no ha agregado experiecia laboral</h4>
              }
            </div>
            {/*  */}

            {/*  */}
            <div className='profile-edu bg-white p-2'>
              <h2 className="text-primary">
                {profile.education.length > 1 ? 'experiencias académicas':
                  'experiencia académica'
                }
              </h2>

              {profile.education.length > 0 ? 
                <>
                  {profile.education.map(item => 
                    <ProfileEducation key={item._id} education={item}/>
                  )}
                </> 
              : 
                <h4>Aún no ha agregado experiencia académica</h4>
              }
            </div>
            {/*  */}

            {/*  */}  
            <div className='profile-github bg-white p-2 mb-5'>
              <h2 className="text-primary">
                {profile.githubusername  ? 'repositorios de gh ':
                  'sin perfil de GH'
                }
              </h2>

              {profile.githubusername &&                 
                <ProfileGithub username={profile.githubusername} /> 
              }
            </div>  
            
          </div>
       
        </>
      }

      {
        profile === null && !error ?  <Spinner/> : null
      }

      {
        profile === null && error  ? 
          <div className="centeredColumn mt-5">
            <p>😥nada por aqui, el perfil no existe❌</p>
              <p>🤷‍♂️hubo un error del tipo {' '} 
                <em>{error?.error?.status} {error?.error?.msg} </em> 🚫
              </p>
            <button 
              className="blue-icon btn btn-light" 
              onClick={()=>{history.goBack()}}
            > 
            volver a la página anterior
            </button>
            {console.log('objError=>',error)}
            {console.log('objError=>',error?.error?.msg)}
            {console.log('objError=>',error?.error?.status)}
          </div>
        : null
      }

    </section>
  )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile,
    error: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)