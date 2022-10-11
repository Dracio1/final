import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {getAllProfiles} from '../../actions/profile'
import ProfileItem from './ProfileItem'
import ProfileCard from '../layout/ProfileCard'




const Profiles = ({ getAllProfiles, profile: { profiles, loading }}) => {

    const [typeView, setTypeView] = useState(true) 
  
    useEffect(() => {
      getAllProfiles()
     
    }, [])
     

  return (
    <>
      {!loading ? 
      <>
        <div className="d-flex flex-row-reverse bd-highlight btn-group btn-group-sm mt-2">
          
          <button type="button" className=''
            style={{height:"25px", fontSize:"15px", paddingTop: "2px", width: "15%" }} 
            onClick={(e)=>{e.preventDefault()
              setTypeView(!typeView)
            }}
            >
            {typeView ? 
              <i className="fa fa-th-large" aria-hidden="true">tarjetas</i> :
              <i className="fa fa-list" aria-hidden="true">lista</i>
            }
          </button> 

          {/* <button type="button"
            style={{height:"25px", fontSize:"15px", paddingTop: "2px", width: "5%" }}  
            onClick={(e)=>{e.preventDefault()
              setTypeView(true)
            }}
            >
            <i className="fa fa-list" aria-hidden="true"></i>
          </button> */}
                     
        </div>

        <div className="centeredColumn my-2">
        
          <h1 className="text-primary">
              Developers
          </h1>
          <p /* className="lead" */>
            <i className="fab fa-connectdevelop"></i>
            navega y conecta con otros devs  
          </p>
        </div>
        {/* {profiles.length > 0 ? console.info(profiles.length) : null } */}
        
        
        {
          typeView ? 
          
            <div className="centeredColumn">
                { 
                  profiles.length > 0 ? 
                      profiles.map(item=>{
                      return <ProfileItem key={item._id} profile={item}/>
                    })
                  : <h4>no hay perfiles disponibles</h4>
                }
            </div>
        
          :  
            
            <div className='container' >
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                
                  { 
                    profiles.length > 0 ? 
                      profiles.map(item=>{              
                        return <ProfileCard className="" key={item._id} profile={item} />
                      })
                    : <h4>no hay perfiles disponibles</h4>
                  }
                </div>         
            </div>    
        }
        
      </> 
      : <Spinner/> }
    </>
  )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getAllProfiles})(Profiles)