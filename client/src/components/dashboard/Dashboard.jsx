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
import { getPersona } from '../../actions/personas'
import { copyStringIntoBuffer } from 'pdf-lib'




const Dashboard = ({ auth: {user}, personas: { persona, loading }}) => {

    
      //console.log('este es en la vista',persona.nombres)
    return loading  || persona === null ? <Spinner/> :
    <>
        <div className='centeredColumn my-2'>

            <h1 className='text-primary'>Panel de control</h1>
            <p className='lead'>
                <i style={{'marginRight':'1rem'}} className='fas fa-user'></i> 
                Bienvenido { persona.nombres +' '+ persona.apellidos
                 }
            </p>
            
        </div>

        { persona !== null 
        
        ? 
            <>
                <DashboardActions/> 
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
    personas: state.personas
})

Dashboard.propTypes = {
   
    auth: PropTypes.object.isRequired,
    personas: PropTypes.object.isRequired,
    
}

export default connect(mapStateToProps)(Dashboard)


 // <Experiences type={'education'} experience={profile.email}/>
               // <Experiences type={'experience'} experience={profile.tipo}/>