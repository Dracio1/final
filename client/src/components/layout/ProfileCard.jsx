import React from 'react'
import { Link } from 'react-router-dom'
import userDefault from '../../img/default-user.png'

const ProfileCard = ({
  profile: {
    user: {_id, name, avatar}, 
    status,
    company,
    location
  }
}) => {

  

  return (
    <div>
        <div className="card mt-2" >
                <img src={avatar ? avatar : userDefault } className="card-img-top" alt="..."/>    
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="">{status} en: </p>
                    <p className="card-text"><code>{company}</code> </p>
                    <p className="card-text">{location}</p>
                </div>
                
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                  perfil  
                </Link>
        </div>
    </div>
  )
}

export default ProfileCard