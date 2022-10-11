import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
/* import Experience from './Experience'
import Education from './Education' */
import Experiences from './Experiences'




const Dashboard = ({ getCurrentProfile, deleteAccount, auth: {user}, profile: { profile, loading }}) => {

    useEffect(() => {
        getCurrentProfile()
    }, [])

    console.log(profile)
    return loading && profile === null ? <Spinner/> :
    <>
        <div className='centeredColumn my-2'>

            <h1 className='text-primary'>Panel de control</h1>
            <p className='lead'>
                <i style={{'marginRight':'1rem'}} className='fas fa-user'></i> 
                Bienvenido { profile.nombres +' '+ profile.apellidos }
            </p>
            
        </div>

        { profile !== null 
        
        ? 
            <>
                <DashboardActions/> 
              
                <div className="my-2">
                    <button 
                        onClick={()=>{deleteAccount()}}
                        className="btn btn-danger">
                            <i className="fas fa-user-minus">Borrar mi cuenta</i>
                    </button>
                </div>
            </>
        : 
            <>
                <div className='centered'>
                    <p>Aún no has creado tu perfil, por favor agrega información.</p>
                    <Link to='/create-profile' className="btn btn-primary my-1 button3d" >crea tu perfil</Link >
                </div>
            </> 

        }
    </>
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)


 // <Experiences type={'education'} experience={profile.email}/>
               // <Experiences type={'experience'} experience={profile.tipo}/>