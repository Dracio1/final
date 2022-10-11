
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import userDefault from '../../img/default-user.png'


const ProfileItem = ({
  profile: {
    user: {_id, name, avatar}, 
    status,
    company,
    location,
    skills
  }
}) => {
  
  return (
    <div>
        <div className="card mb-3 " style={{ minWidth:"500px", width:"850px" }} >
            <div className="row" >
                <div className="col-sm-4" /* style={{height:"100%!"}} */>
                <img src={avatar ? avatar : userDefault } style={{minHeight:"100%"}}  
                className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-sm-4">
                  <div className="card-body ">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text">{status} en: </p>
                      <p className="card-text">{company && <code>{company}</code>}</p>
                      <p className="card-text">{location && <span>{location}</span>}</p>
                      <Link to={`/profile/${_id}`} className="btn btn-primary">
                        ver perfil  
                      </Link>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card-body ">
                      <p>conocimientos & habilidades</p>
                      <ul>
                        {skills.slice(0,4).map((item,index)=>{
                          return <li key={index}>
                                <i className="fas fa-check"></i>
                                {item}
                            </li>
                        })}
                      </ul>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}


export default ProfileItem